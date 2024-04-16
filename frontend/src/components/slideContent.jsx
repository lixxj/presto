import React from 'react';

function SlideContent ({ slideNumber, content }) {
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

  const renderElement = (element, index) => {
    switch (element.type) {
      case 'text':
        return (
          <textarea key={index} style={{
            ...textFieldStyle,
            width: element.textAreaWidth,
            height: element.textAreaHeight,
            fontSize: element.fontSize,
            color: element.color
          }}
            value={element.text} readOnly/>
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
            autoPlay={element.autoPlay}
            muted={element.autoPlay}>
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
