import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const lsDarkMode = localStorage.getItem('darkMode');
    return lsDarkMode === 'true';
  });

  useEffect(() => {
    const className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    document.body.className = className;
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
