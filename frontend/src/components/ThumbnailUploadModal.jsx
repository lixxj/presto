import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fileToDataUrl } from '../hooks/helpers';

/**
 * ThumbnailUploadModal is a React component for uploading and updating thumbnail images.
 * @param {object} props - Contains properties such as show, onHide, onUpdate, and darkMode.
 * @returns A modal component that allows users to upload an image file.
 */
function ThumbnailUploadModal ({ show, onHide, onUpdate, darkMode }) {
  const [file, setFile] = useState(null);

  /** Styles for dark mode appearance */
  const darkModeStyles = {
    color: '#E9ECEF',
    backgroundColor: '#212529',
    borderColor: '#444',
    inputBorder: '2px solid #7f8c8d',
    buttonBackground: '#3498db',
    buttonBorder: '#2980b9'
  };

  /** Styles for light mode appearance */
  const lightModeStyles = {
    color: '#495057',
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
    inputBorder: '2px solid #7f8c8d',
    buttonBackground: '#3498db',
    buttonBorder: '#2980b9'
  };

  /** Conditional styling based on the darkMode prop */
  const modalStyle = darkMode ? darkModeStyles : lightModeStyles;

  /**
   * Handles the file input change event by converting the selected file to a data URL.
   * @param {object} event - The event object containing the file input.
   */
  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const dataUrl = await fileToDataUrl(file);
      setFile(dataUrl);
    } catch (error) {
      alert('Error processing file: ' + error.message);
    }
  };

  /**
   * Updates the thumbnail image with the uploaded file data URL.
   * This function is triggered when the Update Thumbnail button is clicked.
   */
  const handleUpdate = () => {
    if (file) {
      onUpdate(file);
      onHide();
    } else {
      alert('Please select a file first.');
    }
  };

  /** Style for the input element */
  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    outline: 'none',
    border: modalStyle.inputBorder,
    borderRadius: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  /** Style for the button element */
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
