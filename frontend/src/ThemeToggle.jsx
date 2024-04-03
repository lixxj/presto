import React from 'react';

function ThemeToggle ({ onToggle, isDarkMode }) {
  return (
    <button onClick={onToggle}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
