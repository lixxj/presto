import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';

function App () {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize darkMode from localStorage or default to false
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    // Apply the theme to the body element and save the preference
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <ThemeToggle onToggle={toggleDarkMode} isDarkMode={darkMode} />
      <div>Test</div>
    </>
  );
}

export default App;
