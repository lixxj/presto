import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Assuming fileToDataUrl is imported or defined elsewhere in your project
import { fileToDataUrl } from '../hooks/helpers';

function AddImageModal ({ show, onHide, darkMode, slideNumber, presentation, updateDatabase }) {
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileToDataUrl(file).then(dataUrl => {
        setPreviewUrl(dataUrl);
        setImageUrl(dataUrl); // Store the data URL for further processing or addition to slides
      }).catch(error => {
        alert('Error processing file: ' + error.message);
      });
    }
  };

  const addImageToSlide = () => {
    if (!imageUrl || !imageWidth || !imageHeight) {
      alert('Please fill out all the fields');
    } else {
      presentation.slides[slideNumber].content.push({
        type: 'image',
        url: imageUrl,
        width: imageWidth + 'px',
        height: imageHeight + 'px',
        description: imageDescription
      });
      // updateDatabase && updateDatabase(presentation); // Optionally update the database if function provided
      onHide(); // Close the modal after adding
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          Add Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <h6>Image File</h6>
        <input
          type="file"
          accept="image/jpeg,image/png"
          style={inputStyle}
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div style={{ margin: '10px 0' }}>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        )}
        <h6>Width of Image (px)</h6>
        <input
          style={inputStyle}
          value={imageWidth}
          onChange={(e) => setImageWidth(e.target.value)}
          placeholder="Enter width in pixels"
          type="number"
        />

        <h6>Height of Image (px)</h6>
        <input
          style={inputStyle}
          value={imageHeight}
          onChange={(e) => setImageHeight(e.target.value)}
          placeholder="Enter height in pixels"
          type="number"
        />

        <h6>Image Description</h6>
        <input
          style={inputStyle}
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Enter a description for the image"
          type="text"
        />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button type="submit" style={buttonStyle} onClick={addImageToSlide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddImageModal;
