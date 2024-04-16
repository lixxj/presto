import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from '../components/ConfirmModal';
import AddTextModal from '../components/AddTextModal';
import SlideContent from '../components/slideContent';
import CodeBlockModal from '../components/CodeBlockModal';
import AddImageModal from '../components/AddImageModal';
import AddVideoModal from '../components/AddVideoModal';
import ThumbnailUploadModal from '../components/ThumbnailUploadModal';

function EditPresentation ({ token, darkMode }) {
  const { id } = useParams(); // Get the presentation ID from the URL
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [allPresentations, setAllPresentations] = useState(null);
  const [presentationName, setPresentationName] = useState(''); // Set presentation name separately so it can be edited later
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddTextModal, setAddTextModal] = useState(false);
  const [presentationLength, setPresentationLength] = useState();
  const [slideNumber, setSlideNumber] = useState(1);

  const [showCodeBlockModal, setShowCodeBlockModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);

  const nameStyle = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1.5rem'
  }

  const darkModeStyles = {
    input: {
      background: '#333',
      color: '#fff',
      border: '1px solid #444',
    },
    button: {
      background: 'linear-gradient(145deg, #556, #334)',
      color: '#fff',
      border: '1px solid red',
      padding: '10px 15px',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '2px 2px 5px #222',
      transition: 'all 0.3s ease',
      '@media (max-width: 600px)': {
        padding: '8px 10px',
        fontSize: '0.8rem',
      },
    },
  };

  const lightModeStyles = {
    input: {
      background: '#fff',
      color: '#000',
      border: '1px solid #ccc',
    },
    button: {
      background: 'linear-gradient(145deg, #eee, #ccc)',
      color: '#000',
      border: '1px solid red',
      padding: '10px 15px',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '2px 2px 5px #ddd',
      transition: 'all 0.3s ease',
      '@media (max-width: 600px)': {
        padding: '8px 10px',
        fontSize: '0.8rem',
      },
    },
  };

  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  };

  const navBarStyle2 = {
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
  };

  const inputStyle = darkMode ? { ...darkModeStyles.input } : { ...lightModeStyles.input };
  const buttonStyle = darkMode ? { ...darkModeStyles.button } : { ...lightModeStyles.button };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };
  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  useEffect(() => {
    // fetch all presentations and find the specific one by ID
    const fetchPresentations = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allPresentations = response.data.store.presentations || [];
        const specificPresentation = allPresentations.find(pres => pres.id === id);
        if (specificPresentation) {
          setAllPresentations(allPresentations);
          setPresentation(specificPresentation);
          setPresentationName(specificPresentation.name);
          setPresentationLength(specificPresentation.slides.length)
        } else {
          // console.log('Presentation not found');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Failed to fetch presentations', error);
        navigate('/dashboard');
      }
    };

    fetchPresentations();
  }, [id, navigate, token]);

  // Helper function to update database given an array
  // of presentations
  const updateDatabase = async (updatedPresentations) => {
    try {
      await axios.put('http://localhost:5005/store', {
        store: {
          presentations: updatedPresentations,
        },
      }, {
        headers: {
          Authorization: token,
        },
      });
      setAllPresentations(updatedPresentations);
      return true;
    } catch (error) {
      console.error('Error adding new presentation: ', error);
      alert(error.response?.data?.error || 'An unexpected error occurred');
      return false;
    }
  }

  const deletePresentation = async () => {
    const updatedPresentations = allPresentations.filter(pres => pres.id !== id);

    if (await updateDatabase(updatedPresentations)) {
      navigate('/dashboard');
    }
  };

  const savePresentation = () => {
    updateDatabase(allPresentations);
  }

  // Update later
  const updateName = async () => {
    if (presentationName.length < 1) {
      alert('Please enter a name');
    } else {
      await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        const allPresentations = response.data.store?.presentations || [];
        const specificPresentation = allPresentations.find(pres => pres.id === id);
        specificPresentation.name = presentationName;
        updateDatabase(allPresentations);
      }).catch((error) => {
        console.error('Error fetching presentations: ', error);
      });
    }
  }

  const updateThumbnail = async (newThumbnail) => {
    if (!newThumbnail) {
      alert('Please upload a thumbnail');
      return;
    }

    // Fetch all presentations to ensure we have the latest data
    await axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      const allPresentations = response.data.store?.presentations || [];
      const specificPresentation = allPresentations.find(pres => pres.id === id);
      if (specificPresentation) {
        specificPresentation.thumbnail = newThumbnail; // Update the thumbnail in the found presentation
        updateDatabase(allPresentations); // Save all presentations with the updated thumbnail
      } else {
        alert('Presentation not found');
      }
    }).catch((error) => {
      console.error('Error fetching presentations:', error);
    });
  }

  const createNewSlide = () => {
    const specificPresentation = allPresentations.find(pres => pres.id === id);
    specificPresentation.slides.push({ content: [] });
    setPresentationLength(presentationLength + 1); // Use to determine if prev and next slides button should show
  }

  const deleteSlide = () => {
    if (presentationLength > 1) {
      const specificPresentation = allPresentations.find(pres => pres.id === id);
      specificPresentation.slides.pop();
      prevSlide();
      setPresentationLength(presentationLength - 1); // Use to determine if prev and next slides button should show
    } else {
      alert('This presentation only has one slide. Please use the delete presentation button to delete this presentation instead');
    }
  }

  const nextSlide = () => {
    if (slideNumber < presentationLength) {
      setSlideNumber(slideNumber + 1);
    }
  }

  const prevSlide = () => {
    if (slideNumber > 1) {
      setSlideNumber(slideNumber - 1);
    }
  }

  return (
    <div>
      {
        presentation
          ? (
          <div>
            <nav style={ navBarStyle }>
            <input
              style={{ ...nameStyle, ...inputStyle }}
              type="text"
              value={presentationName}
              onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
              onChange={(e) => setPresentationName(e.target.value)}
              onBlur={() => updateName()}
            />
            <div>
            <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowConfirmModal(true)}>Delete Presentation</button>
            <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={savePresentation}>Save Changes</button>
            <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowThumbnailModal(true)}>Update Thumbnail</button>
            </div>
            </nav>

            <nav style={ navBarStyle2 }>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setAddTextModal(true)}>Add Text 🔤</button>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowAddImageModal(true)}>Add Image 🖼️</button>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowAddVideoModal(true)}>Add Video 🎥</button>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowCodeBlockModal(true)}>Add Code ⚙️</button>
            </nav>

            <ThumbnailUploadModal
              show={showThumbnailModal}
              onHide={() => setShowThumbnailModal(false)}
              onUpdate={updateThumbnail}
              darkMode={darkMode}
            />

            <SlideContent slideNumber={slideNumber} content={presentation.slides[slideNumber - 1].content} />

            <nav style={ navBarStyle }>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={createNewSlide}>Create New Slide</button>
              <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={deleteSlide}>Delete Slide</button>
              <div>
                {presentationLength > 1 && <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={prevSlide}>Prev Slide</button>}
                {presentationLength > 1 && <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={nextSlide}>Next Slide</button>}
              </div>
            </nav>

            <ConfirmModal
              show={showConfirmModal}
              onHide={() => setShowConfirmModal(false)}
              onConfirm={deletePresentation}
              darkMode={darkMode}
            />
             <AddTextModal
              show={showAddTextModal}
              onHide={() => setAddTextModal(false)}
              darkMode={darkMode}
              slideNumber={slideNumber - 1}
              presentation={presentation}
              updateDatabase={updateDatabase}
            />

            <CodeBlockModal
              show={showCodeBlockModal}
              onHide={() => setShowCodeBlockModal(false)}
              slideNumber={slideNumber - 1}
              presentation={presentation}
              darkMode={darkMode}
            />

            <AddImageModal
              show={showAddImageModal}
              onHide={() => setShowAddImageModal(false)}
              darkMode={darkMode}
              slideNumber={slideNumber - 1}
              presentation={presentation}
              updateDatabase={updateDatabase}
            />

            <AddVideoModal
              show={showAddVideoModal}
              onHide={() => setShowAddVideoModal(false)}
              darkMode={darkMode}
              slideNumber={slideNumber - 1}
              presentation={presentation}
              updateDatabase={updateDatabase}
            />

          </div>
            )
          : (
          <p>Could not load presentation</p>
            )
      }
    </div>
  );
}

export default EditPresentation;
