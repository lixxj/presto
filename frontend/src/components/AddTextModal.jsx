import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddTextModal ({ show, onHide, darkMode }) {
  const [text, setText] = useState('');

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

  // TODO: Add content to database
  const addTextToSlide = () => {
    console.log(text);
  }

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          Add Text
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <h5>Enter a line of text to add to the slide</h5>
        <input
          style={inputStyle}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button type="submit" style={buttonStyle} onClick={() => {
          addTextToSlide(text);
          onHide(); // Close the modal after confirmation
        }}>Add</Button>
      </Modal.Footer>
  </Modal>
  );
}

export default AddTextModal;
