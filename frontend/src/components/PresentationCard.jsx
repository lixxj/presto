// PresentationCard.js
import React from 'react';

const PresentationCard = ({ presentation, darkMode }) => {
  const { name, description, slides, thumbnail } = presentation;
  const cardStyle = {
    backgroundColor: darkMode ? '#333' : '#FFF',
    color: darkMode ? '#FFF' : '#333',
    border: '1px solid #ddd',
    padding: '20px',
    margin: '10px',
    borderRadius: '5px',
  };

  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p>{description || 'No description available.'}</p>
      <div>Slides: {slides.length}</div>
      {thumbnail && <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
      {/* Display a default grey box as a placeholder if there's no thumbnail */}
      {!thumbnail && <div style={{ width: '100%', height: '100px', backgroundColor: '#ccc' }}></div>}
    </div>
  );
};

export default PresentationCard;
