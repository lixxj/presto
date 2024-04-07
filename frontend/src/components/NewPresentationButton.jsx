import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';

function Newpresentation ({ darkMode }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [presentationName, setPresentationName] = React.useState('');

  const createPresentation = () => {
    setModalShow(false);
    console.log(presentationName);
  }

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
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="btn btn-outline-danger nav-link"
        style={customButtonStyle}
      >
        New presentation
      </Button>

      <Modal
        show={modalShow}
        onHide={createPresentation}
        setPresentationName={setPresentationName}
        darkMode={darkMode} // Pass darkMode as a prop to ModalComponent
      />
    </>
  );
}

export default Newpresentation;
