import React from 'react';

const PresentationCard = ({ presentation, darkMode }) => {
  const { name, description, slides, thumbnail } = presentation;

  const cardStyle = {
    backgroundColor: darkMode ? '#333' : '#FFF',
    color: darkMode ? '#FFF' : '#333',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
    minWidth: '100px',
    height: 'auto',
    aspectRatio: '2 / 1',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  };

  // Hover effect
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={cardStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <h3>{name}</h3>
      {thumbnail
        ? (
        <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
          )
        : (
        <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc', borderRadius: '10px' }}></div>
          )}
      <p>{description || ''}</p>
      <div>Slides: {slides.length}</div>
    </div>
  );
};

export default PresentationCard;
