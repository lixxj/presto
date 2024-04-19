import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddVideoModal ({ show, onHide, darkMode, slideNumber, presentation }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoWidth, setVideoWidth] = useState('');
  const [videoHeight, setVideoHeight] = useState('');
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

  const youtubeParser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return ((match && match[7].length === 11) ? match[7] : false);
  }

  const addVideoToSlide = () => {
    if (!videoUrl || !videoWidth || !videoHeight) {
      alert('Please fill out all the fields');
    } else if (videoWidth < 200 || videoHeight < 200) {
      alert('Video dimensions are too small');
    } else {
      const newVideo = {
        type: 'video',
        url: 'https://www.youtube.com/embed/' + youtubeParser(videoUrl),
        width: videoWidth + 'px',
        height: videoHeight + 'px',
        autoPlay
      };
      presentation.slides[slideNumber].content.push(newVideo);
      console.log(newVideo)
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id="contained-modal-title-vcenter" style={modalStyle}>
          Add Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <h6>Video URL</h6>
        <input
          style={inputStyle}
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter the URL of the video"
          type="text"
        />
        <h6>Width of Video (px)</h6>
        <input
          style={inputStyle}
          value={videoWidth}
          onChange={(e) => setVideoWidth(e.target.value)}
          placeholder="Enter width in pixels (Min 200 Px)"
          type="number"
        />
        <h6>Height of Video (px)</h6>
        <input
          style={inputStyle}
          value={videoHeight}
          onChange={(e) => setVideoHeight(e.target.value)}
          placeholder="Enter height in pixels (Min 200 Px)"
          type="number"
        />
        <h6>Auto-play Video</h6>
        <input
          type="checkbox"
          checked={autoPlay}
          onChange={(e) => setAutoPlay(e.target.checked)}
          style={{ margin: '10px 0' }}
        />
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button type="submit" style={buttonStyle} onClick={addVideoToSlide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddVideoModal;
