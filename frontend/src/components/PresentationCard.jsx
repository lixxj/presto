import React from 'react';
import { useNavigate } from 'react-router-dom';

const PresentationCard = ({ presentation, darkMode, onClick }) => {
  const { id, name, description, slides, thumbnail } = presentation;
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: darkMode ? '#333' : '#FFF',
    color: darkMode ? '#FFF' : '#333',
    border: '1px solid #ddd',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    minWidth: '100px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    overflow: 'hidden',
    aspectRatio: '2 / 1',
  };

  /* Hover effect */
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };
  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '60%', // Allocate most space for text
    height: '100%',
  };

  const thumbnailPlaceholder = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '100px',
    backgroundColor: '#ccc',
    borderRadius: '10px',
    color: 'white',
    fontSize: '14px',
  };

  const handleClick = () => {
    navigate(`/presentation/${id}`);
  };

  return (
    <div style={cardStyle} onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div style={contentStyle}>
        <h3>{name}</h3>
        <p>{description || 'No Description'}</p>
        <div>{slides.length} slides</div>
      </div>

      {thumbnail
        ? (
        <img src={thumbnail} alt={`${name} thumbnail`} style={{ maxWidth: '50%', maxHeight: '200px', borderRadius: '10px' }} />
          )
        : (
        <div style={thumbnailPlaceholder}>No Thumbnail</div>
          )}

    </div>
  );
};

export default PresentationCard;
