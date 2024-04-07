import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent (props) {
  const darkModeStyles = {
    background: '#2c3e50',
    color: '#ecf0f1',
  };

  const lightModeStyles = {
    background: '#ecf0f1',
    color: '#2c3e50',
  };

  const modalStyle = props.darkMode ? darkModeStyles : lightModeStyles;

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

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          New Presentation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <h5>Enter a name for your presentation:</h5>
        <input style={inputStyle} onChange={e => props.setPresentationName(e.target.value)} />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button onClick={props.onHide} style={buttonStyle}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
