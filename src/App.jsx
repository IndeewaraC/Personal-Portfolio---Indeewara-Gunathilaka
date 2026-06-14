import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/App.css';

import Home from './pages/Home';
import CommandPalette from './components/CommandPalette';
import Sidebar from './components/layout/Sidebar';

function App() {
  const [isTechnical, setIsTechnical] = useState(false);

  // Apply technical-mode class to body
  useEffect(() => {
    if (isTechnical) {
      document.body.classList.add('technical-mode');
    } else {
      document.body.classList.remove('technical-mode');
    }
  }, [isTechnical]);

  return (
    <Router>
      <CommandPalette isTechnical={isTechnical} setIsTechnical={setIsTechnical} />
      
      <div className="flex flex-col md:flex-row min-h-screen bg-[#0f172a]">
        <Sidebar />
        
        <main className="flex-1 w-full mt-16 md:mt-0 p-6 md:p-12 lg:p-20 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;