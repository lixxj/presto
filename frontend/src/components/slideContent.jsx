import React, { useState } from 'react';

function SlideContent ({ slideNumber, content }) {
  const [fontStyles, setFontStyles] = useState(content.map(() => 'Courier'));
  const [isVisible, setIsVisible] = useState(content.map(() => false));

  const contentAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '45rem',
    backgroundColor: 'white',
    borderRadius: '5px'
  };

  const slideNumberStyle = {
    position: 'absolute',
    color: 'black',
    margin: '0',
    bottom: '0'
  };

  const textFieldStyle = {
    position: 'absolute',
    backgroundColor: 'transparent',
    border: '1px solid grey',
    borderRadius: '5px',
    overflow: 'hidden'
  };

  const handleFontChange = (font, index) => {
    const newFontStyles = [...fontStyles];
    newFontStyles[index] = font;
    setFontStyles(newFontStyles);
  };

  const toggleDropdown = (index) => {
    const newVisibility = [...isVisible];
    newVisibility[index] = !newVisibility[index];
    setIsVisible(newVisibility);
  };

  const renderElement = (element, index) => {
    switch (element.type) {
      case 'text':
        return (
          <div key={index} style={{ position: 'relative', width: element.textAreaWidth }}>
            <textarea
              style={{
                ...textFieldStyle,
                width: element.textAreaWidth,
                height: element.textAreaHeight,
                fontSize: element.fontSize,
                color: element.color,
                fontFamily: fontStyles[index]
              }}
              value={element.text} readOnly
              onClick={() => toggleDropdown(index)}
            />
            {isVisible[index] && (
              <select style={{
                position: 'absolute',
                width: '80%',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, 0%)'
              }}
                onChange={(e) => handleFontChange(e.target.value, index)}
                onBlur={() => toggleDropdown(index)}
                value={fontStyles[index]}>
                <option value="Courier">Courier</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
              </select>
            )}
          </div>
        );
      case 'image':
        return (
          <img key={index} style={{
            width: element.width,
            height: element.height
          }}
            alt={element.description}
            src={element.url} />
        );
      case 'video':
        return (
          <video key={index} style={{
            width: element.width,
            height: element.height
          }}
            controls
            autoPlay={true}
            muted={true}>
            <source src={element.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div style={contentAreaStyle}>
      <p style={slideNumberStyle}>{slideNumber}</p>
      {content.map((element, index) => (
        renderElement(element, index)
      ))}
    </div>
  );
}

export default SlideContent;
