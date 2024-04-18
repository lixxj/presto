import { React, useState } from 'react';

const FooterComponent = ({ darkMode, toggleDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const footerStyle = {
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    position: 'fixed', // Ensures footer stays at the bottom
    bottom: 0,
    left: 0,
    height: '9vh',
    backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
    color: darkMode ? '#f8f9fa' : '#343a40',
    transition: 'transform 0.5s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(90%)',
  };

  const toggleButtonStyle = {
    width: '120px',
    height: '45px',
    borderRadius: '45px',
    borderStyle: 'inset',
    borderColor: 'green',
    borderWidth: '5px',
  };

  const mouseOn = () => {
    setIsVisible(true);
  };

  const mouseOff = () => {
    setIsVisible(false);
  };

  return (
    <div style={footerStyle} onMouseEnter={mouseOn} onMouseLeave={mouseOff}>
      <button
        onClick={toggleDarkMode}
        className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
        style={toggleButtonStyle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <p>&copy; Presto</p>
    </div>
  );
};

export default FooterComponent;
