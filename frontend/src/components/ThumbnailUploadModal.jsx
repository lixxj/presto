import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fileToDataUrl } from '../hooks/helpers';

function ThumbnailUploadModal ({ show, onHide, onUpdate, darkMode }) {
  const [file, setFile] = useState(null);

  const darkModeStyles = {
    color: '#E9ECEF',
    backgroundColor: '#212529',
    borderColor: '#444',
    inputBorder: '2px solid #7f8c8d',
    buttonBackground: '#3498db',
    buttonBorder: '#2980b9'
  };

  const lightModeStyles = {
    color: '#495057',
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
    inputBorder: '2px solid #7f8c8d',
    buttonBackground: '#3498db',
    buttonBorder: '#2980b9'
  };

  const modalStyle = darkMode ? darkModeStyles : lightModeStyles;

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const dataUrl = await fileToDataUrl(file);
      setFile(dataUrl);
    } catch (error) {
      alert('Error processing file: ' + error.message);
    }
  };

  const handleUpdate = () => {
    if (file) {
      onUpdate(file);
      onHide();
    } else {
      alert('Please select a file first.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    outline: 'none',
    border: modalStyle.inputBorder,
    borderRadius: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    backgroundColor: modalStyle.buttonBackground,
    borderColor: modalStyle.buttonBorder,
    borderRadius: '20px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    padding: '10px 15px'
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ color: modalStyle.color, backgroundColor: modalStyle.backgroundColor }}>
        <Modal.Title>Upload Thumbnail</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: modalStyle.backgroundColor }}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          style={inputStyle}
          onChange={handleFileChange}
        />
        {file && (
          <img src={file} alt="Thumbnail Preview" style={{ width: '100%', marginTop: '10px' }} />
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: modalStyle.backgroundColor }}>
        <Button variant="primary" style={buttonStyle} onClick={handleUpdate}>Update Thumbnail</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ThumbnailUploadModal;
