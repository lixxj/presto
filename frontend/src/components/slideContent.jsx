import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('c', c);

function SlideContent ({ slideNumber, content }) {
  const [fontStyles, setFontStyles] = useState(content.map(() => 'Courier'));
  const [isVisible, setIsVisible] = useState(content.map(() => false));

  const [background, setBackground] = useState('white');
  const [showModal, setShowModal] = useState(false);

  const [slideBackgrounds, setSlideBackgrounds] = useState(Array(content.length).fill(null));

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

  const handleBackgroundChange = (color, forAll = false) => {
    if (forAll) {
      // Apply the new color as the default background
      setBackground(color);
      // Update slide backgrounds only if they are currently set to the old default
      setSlideBackgrounds(slideBackgrounds.map(bg => bg === background ? null : bg));
    } else {
      // Update the specific slide background
      const newBackgrounds = [...slideBackgrounds];
      newBackgrounds[slideNumber - 1] = color;
      setSlideBackgrounds(newBackgrounds);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const BackgroundModal = ({ currentBackground, slideNumber }) => {
    const [currentColor, setCurrentColor] = useState(currentBackground || background);

    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      zIndex: '1000',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #444',
      width: '300px',
      textAlign: 'center'
    };

    const handleColorChange = (e) => {
      setCurrentColor(e.target.value);
      handleBackgroundChange(e.target.value);
    };

    return (
      <div style={modalStyle}>
        <p>Change Background for {slideNumber ? `Slide ${slideNumber}` : 'All Slides'}</p>
        <input type="color" value={currentColor} onChange={handleColorChange} />
        <button onClick={() => handleBackgroundChange(currentColor, true)}>Set as Default</button>
        <button onClick={closeModal}>Close</button>
      </div>
    );
  };

  const renderElement = (element, index) => {
    switch (element.type) {
      case 'text':
        return (
          <Draggable bounds="parent">
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
          </Draggable>
        );
      case 'image':
        return (
          <Draggable bounds="parent">
            <img key={index} style={{
              width: element.width,
              height: element.height
            }}
              alt={element.description}
              src={element.url} />
          </Draggable>
        );
      case 'video':
        return (
          <Draggable bounds="parent">
          <iframe key={index} style={{
            width: element.width,
            height: element.height
          }}
            src= {element.url + '?autoplay=' + element.autoPlay}>
          </iframe>
          </Draggable>
        );
      case 'code':
        return (
          <Draggable bounds="parent">
              <SyntaxHighlighter
                language={element.language}
                style={docco}
                customStyle={{
                  fontSize: `${element.fontSize}em`,
                  width: `${element.textareaWidth}%`,
                  height: `${element.textareaHeight}px`,
                }}>
                {element.code}
              </SyntaxHighlighter>
          </Draggable>
        )
      default:
        return null;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '45rem',
      backgroundColor: slideBackgrounds[slideNumber - 1] || background,
      borderRadius: '5px'
    }}>
      <p style={slideNumberStyle}>{slideNumber}</p>
      {content.map((element, index) => (
        renderElement(element, index)
      ))}

      <button onClick={openModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Background Colour
      </button>

      {showModal && <BackgroundModal currentBackground={slideBackgrounds[slideNumber - 1]} slideNumber={slideNumber} />}

    </div>
  );
}

export default SlideContent;
