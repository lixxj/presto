import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddTextModal ({ show, onHide, darkMode, slideNumber, presentation }) {
  const [textAreaWidth, setTextAreaWidth] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('');
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [color, setColor] = useState('');

  const darkModeStyles = {
    color: '#E9ECEF',
    backgroundColor: '#212529',
  };

  const lightModeStyles = {
    color: '#495057',
    backgroundColor: '#FFFFFF',
  };

  const modalStyle = darkMode ? darkModeStyles : lightModeStyles;

  const inputStyle = {
    ...modalStyle,
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    outline: 'none',
    border: '2px solid #7f8c8d',
    borderRadius: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    ...modalStyle,
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    borderRadius: '20px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  };

  // TODO: check if entered values are valid
  // What is textAreaSize?
  const addTextToSlide = () => {
    if (!textAreaWidth || !textAreaHeight || !text || !fontSize || !color) {
      alert('Please fill out all the required fields');
    } else {
      presentation.slides[slideNumber].content.push({ type: 'text', textAreaWidth, textAreaHeight, text, fontSize, color });
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          Add Text
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <h6>Width of Text Area</h6>
        <input
          style={inputStyle}
          onChange={(e) => setTextAreaWidth(e.target.value + 'px')}
          placeholder="Enter a Number"
          type="number"
        />
        <h6>Height of Text Area</h6>
        <input
          style={inputStyle}
          onChange={(e) => setTextAreaHeight(e.target.value + 'px')}
          placeholder="Enter a Number"
          type="number"
        />
        <h6>Enter a line of text to add to the slide</h6>
        <input
          style={inputStyle}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <h6>Font Size</h6>
        <input
          style={inputStyle}
          onChange={(e) => setFontSize(e.target.value + 'em')}
          placeholder="EM"
          type="number"
        />
        <h6>Color</h6>
        <input
          style={inputStyle}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Hex code. Eg) #0000ff"
          type="text"
        />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button type="submit" style={buttonStyle} onClick={() => {
          addTextToSlide();
          onHide();
        }}>Add</Button>
      </Modal.Footer>
  </Modal>
  );
}

export default AddTextModal;
