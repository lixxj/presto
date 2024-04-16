import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddVideoModal ({ show, onHide, darkMode, slideNumber, presentation, updateDatabase }) {
  const [videoWidth, setVideoWidth] = useState('');
  const [videoHeight, setVideoHeight] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [autoPlay, setAutoPlay] = useState(false);

  const darkModeStyles = {
    color: '#E9ECEF',
    backgroundColor: '#212529',
  };

  const lightModeStyles = {
    color: '#495057',
    backgroundColor: '#FFFFFF',
  };

  const modalStyle = darkMode ? darkModeStyles : lightModeStyles;

  const handleAddVideo = () => {
    if (!videoWidth || !videoHeight || !videoUrl) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const newVideo = {
      type: 'video',
      url: videoUrl,
      width: videoWidth + 'px',
      height: videoHeight + 'px',
      autoPlay
    };

    presentation.slides[slideNumber].content.push(newVideo);
    updateDatabase(presentation); // Update your presentation data
    onHide(); // Close modal after adding
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          Add Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Video Width (px)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter video width"
              onChange={(e) => setVideoWidth(e.target.value)}
              value={videoWidth}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video Height (px)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter video height"
              onChange={(e) => setVideoHeight(e.target.value)}
              value={videoHeight}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>YouTube Video URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter YouTube URL"
              onChange={(e) => setVideoUrl(e.target.value)}
              value={videoUrl}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Auto-play Video"
              onChange={(e) => setAutoPlay(e.target.checked)}
              checked={autoPlay}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button onClick={handleAddVideo}>Add Video</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddVideoModal;
