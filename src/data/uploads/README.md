# Drop Zone for LinkedIn Exports

Place your downloaded `Positions.csv` file from LinkedIn in this folder.

When the GitHub Action runs at midnight, it will:
1. Scan this folder for any `.csv` file.
2. Read the data.
3. Automatically update `../linkedin.json` if there are any new jobs or changes.
