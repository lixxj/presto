import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent ({ show, onHide, addPresentation, darkMode }) {
  const [presentationName, setPresentationName] = useState('');

  const darkModeStyles = {
    background: '#2c3e50',
    color: '#ecf0f1',
  };

  const lightModeStyles = {
    background: '#ecf0f1',
    color: '#2c3e50',
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

  // creation logic for a new presentation.
  const handleCreate = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (presentationName.trim()) {
      // new presentation object
      const newPresentation = {
        name: presentationName,
        thumbnail: '',
        description: '',
        slides: [{ content: '' }],
      };

      addPresentation(newPresentation);
      setPresentationName(''); // Clear the input field after successful addition
      onHide(); // Hide the modal after creating a new presentation
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <form onSubmit={handleCreate}>
        <Modal.Header closeButton style={modalStyle}>
          <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
            New Presentation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle}>
          <h5>Enter a name for your presentation:</h5>
          <input
            style={inputStyle}
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            type="text"
          />
        </Modal.Body>
        <Modal.Footer style={modalStyle}>
          <Button type="submit" style={buttonStyle}>Create</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ModalComponent;
