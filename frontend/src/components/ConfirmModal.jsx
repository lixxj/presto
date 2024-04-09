import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmModal ({ show, onHide, onConfirm, darkMode }) {
  const darkModeStyles = {
    color: '#E9ECEF',
    backgroundColor: '#212529',
  };

  const lightModeStyles = {
    color: '#495057',
    backgroundColor: '#FFFFFF',
  };

  const yesButtonVariant = darkMode ? 'danger' : 'outline-danger';
  const noButtonVariant = darkMode ? 'success' : 'outline-success';

  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false} centered>
      <Modal.Header closeButton style={darkMode ? darkModeStyles : lightModeStyles}>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body style={darkMode ? darkModeStyles : lightModeStyles}>
        Are you sure?
      </Modal.Body>
      <Modal.Footer style={darkMode ? darkModeStyles : lightModeStyles}>
        <Button variant={yesButtonVariant} onClick={() => {
          onConfirm();
          onHide(); // Close the modal after confirmation
        }}>
          Yes
        </Button>
        <Button variant={noButtonVariant} onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
