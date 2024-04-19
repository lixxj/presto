import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalComponent from './modal';

function NewPresentationButton ({ darkMode, addPresentation }) {
  const [modalShow, setModalShow] = useState(false);

  /* Directly pass the addPresentation to the ModalComponent */
  const handleHide = () => setModalShow(false);

  /* The ModalComponent should then call this method with the new presentation's details */
  const customButtonStyle = {
    borderColor: 'red',
    borderWidth: '3px',
    borderStyle: 'inset',
    width: '160px',
    height: '35px',
    borderRadius: '18px',
    fontSize: '16px',
    lineHeight: '0.3',
    marginRight: '10px',
    marginBottom: '10px',
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        style={customButtonStyle}
        className="btn btn-outline-danger nav-link"
      >
        New Presentation
      </Button>

      <ModalComponent
        show={modalShow}
        onHide={handleHide}
        addPresentation={addPresentation} // Passed directly to ModalComponent
        darkMode={darkMode}
      />
    </>
  );
}

export default NewPresentationButton;
