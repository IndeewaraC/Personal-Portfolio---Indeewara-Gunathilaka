const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const UPLOADS_DIR = path.join(__dirname, '../src/data/uploads');
const JSON_FILE_PATH = path.join(__dirname, '../src/data/linkedin.json');

// Look for a specific CSV file recursively in the uploads directory
const findCsvFile = (filename, dir = UPLOADS_DIR) => {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const found = findCsvFile(filename, fullPath);
      if (found) return found;
    } else if (file.toLowerCase() === filename.toLowerCase()) {
      return fullPath;
    }
  }
  return null;
};

const parseCsv = (filePath, parserMap) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let idCounter = 1;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const item = parserMap(data, idCounter);
        if (item) {
          results.push(item);
          idCounter++;
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

const runSync = async () => {
  console.log('--- LinkedIn Data Sync Job Started ---');
  
  let currentJson = {};
  if (fs.existsSync(JSON_FILE_PATH)) {
    currentJson = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  }
  
  let updatedJson = { ...currentJson };
  let changesMade = false;

  // 1. Parse Positions
  const posPath = findCsvFile('Positions.csv');
  if (posPath) {
    console.log(`📄 Found: Positions.csv`);
    
    // Build map of existing manually-formatted descriptions (arrays)
    const existingExperienceMap = new Map();
    if (currentJson.experience && Array.isArray(currentJson.experience)) {
      currentJson.experience.forEach(exp => {
        if (Array.isArray(exp.description)) {
          existingExperienceMap.set(`${exp.company}-${exp.role}`, exp.description);
        }
      });
    }

    const data = await parseCsv(posPath, (data, id) => {
      const company = data['Company Name'] || data['Company'] || '';
      if (!company) return null;
      
      const role = (data['Title'] || data['Position'] || '').trim();
      const rawText = (data['Description'] || '').trim();
      
      const existingDesc = existingExperienceMap.get(`${company.trim()}-${role}`);
      const finalDescription = existingDesc || rawText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

      return {
        id: id,
        company: company.trim(),
        role: role,
        duration: `${data['Started On'] || ''} - ${data['Finished On'] || 'Present'}`.trim(),
        description: finalDescription
      };
    });
    
    let expArray = [...data];

    // Add back any manual entries (like the Career Break)
    if (currentJson.experience && Array.isArray(currentJson.experience)) {
      currentJson.experience.forEach(exp => {
        if (exp.manual) {
          expArray.push(exp);
        }
      });
      // Sort by duration descending to keep things roughly ordered
      expArray.sort((a, b) => {
        const dateA = new Date(a.duration.split(' - ')[0]);
        const dateB = new Date(b.duration.split(' - ')[0]);
        return dateB - dateA;
      });
    }

    if (JSON.stringify(expArray) !== JSON.stringify(updatedJson.experience)) {
      updatedJson.experience = expArray;
      changesMade = true;
    }
  }

  // 2. Parse Projects
  const projPath = findCsvFile('Projects.csv');
  if (projPath) {
    console.log(`📄 Found: Projects.csv`);
    
    // Build map of existing manually-formatted descriptions and organizations
    const existingProjectsMap = new Map();
    if (currentJson.projects && Array.isArray(currentJson.projects)) {
      currentJson.projects.forEach(proj => {
        existingProjectsMap.set(proj.title, {
          description: proj.description,
          organization: proj.organization
        });
      });
    }

    const data = await parseCsv(projPath, (data, id) => {
      const title = data['Title'] || '';
      if (!title) return null;
      
      const rawText = (data['Description'] || '').trim();
      
      const existing = existingProjectsMap.get(title.trim()) || {};
      const finalDescription = Array.isArray(existing.description) ? existing.description : rawText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

      return {
        id,
        title: title.trim(),
        organization: existing.organization || '',
        description: finalDescription,
        duration: `${data['Started On'] || ''} - ${data['Finished On'] || ''}`.trim()
      };
    });

    if (JSON.stringify(data) !== JSON.stringify(updatedJson.projects)) {
      updatedJson.projects = data;
      changesMade = true;
    }
  }

  // 3. Parse Skills
  const skillsPath = findCsvFile('Skills.csv');
  if (skillsPath) {
    console.log(`📄 Found: Skills.csv`);
    const data = await parseCsv(skillsPath, (data, id) => {
      const name = data['Name'] || '';
      if (!name) return null;
      return {
        id,
        name: name.trim()
      };
    });
    if (JSON.stringify(data) !== JSON.stringify(updatedJson.skills)) {
      updatedJson.skills = data;
      changesMade = true;
    }
  }

  // 4. Parse Education
  const eduPath = findCsvFile('Education.csv');
  if (eduPath) {
    console.log(`📄 Found: Education.csv`);
    const data = await parseCsv(eduPath, (data, id) => {
      const school = data['School Name'] || '';
      if (!school) return null;
      return {
        id,
        institution: school.trim(),
        degree: (data['Degree Name'] || '').trim(),
        year: `${data['Start Date'] || ''} - ${data['End Date'] || ''}`.trim()
      };
    });
    if (JSON.stringify(data) !== JSON.stringify(updatedJson.education)) {
      updatedJson.education = data;
      changesMade = true;
    }
  }

  // 5. Parse Recommendations
  const recPath = findCsvFile('Recommendations_Received.csv');
  if (recPath) {
    console.log(`📄 Found: Recommendations_Received.csv`);
    const data = await parseCsv(recPath, (data, id) => {
      const text = data['Text'] || '';
      if (!text) return null;
      return {
        id,
        name: `${data['First Name'] || ''} ${data['Last Name'] || ''}`.trim(),
        role: (data['Job Title'] || '').trim(),
        text: text.trim()
      };
    });
    if (JSON.stringify(data) !== JSON.stringify(updatedJson.testimonials)) {
      updatedJson.testimonials = data;
      changesMade = true;
    }
  }

  // 6. Parse Certifications
  const certPath = findCsvFile('Certifications.csv');
  if (certPath) {
    console.log(`📄 Found: Certifications.csv`);
    const data = await parseCsv(certPath, (data, id) => {
      const name = data['Name'] || '';
      if (!name) return null;
      return {
        id,
        name: name.trim(),
        authority: (data['Authority'] || '').trim(),
        url: (data['Url'] || '').trim()
      };
    });
    if (JSON.stringify(data) !== JSON.stringify(updatedJson.certifications)) {
      updatedJson.certifications = data;
      changesMade = true;
    }
  }

  // 7. Parse Profile Summary
  const summaryPath = findCsvFile('Profile Summary.csv');
  if (summaryPath) {
    console.log(`📄 Found: Profile Summary.csv`);
    const data = await parseCsv(summaryPath, (data) => {
      // Just taking the first valid summary
      return data['Profile Summary'] || null;
    });
    if (data.length > 0 && updatedJson.profileSummary !== data[0]) {
      updatedJson.profileSummary = data[0].trim();
      changesMade = true;
    }
  }

  // 8. Parse Profile Info
  const profilePath = findCsvFile('Profile.csv');
  if (profilePath) {
    console.log(`📄 Found: Profile.csv`);
    const data = await parseCsv(profilePath, (data) => {
      const fn = data['First Name'] || '';
      if (!fn) return null;
      return {
        firstName: fn.trim(),
        lastName: (data['Last Name'] || '').trim(),
        headline: (data['Headline'] || '').trim(),
        location: (data['Geo Location'] || '').trim()
      };
    });
    if (data.length > 0 && JSON.stringify(data[0]) !== JSON.stringify(updatedJson.profileInfo)) {
      updatedJson.profileInfo = data[0];
      changesMade = true;
    }
  }

  if (changesMade) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(updatedJson, null, 2), 'utf8');
    console.log('🎉 Successfully updated src/data/linkedin.json!');
  } else {
    console.log('✅ Data is identical. No update required.');
  }
};

runSync();
