import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from '../components/ConfirmModal';

function EditPresentation ({ token, darkMode }) {
  const { id } = useParams(); // Get the presentation ID from the URL
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [presentationName, setPresentationName] = useState(''); // Set presentation name separately so it can be edited later
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const nameStyle = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '3rem'
  }

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
          setPresentation(specificPresentation);
          setPresentationName(specificPresentation.name);
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

  const updateDatabase = (allPresentations) => {
    try {
      axios.put('http://localhost:5005/store', {
        store: {
          presentations: allPresentations,
        },
      }, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error('Error adding new presentation: ', error);
      alert(error.response?.data?.error || 'An unexpected error occurred');
    }
  }

  const deletePresentation = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: { Authorization: `Bearer ${token}` },
      });
      let allPresentations = response.data.store.presentations || [];
      allPresentations = allPresentations.filter(pres => pres.id !== id);
      updateDatabase(allPresentations);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete presentation', error);
    }
  };

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

  return (
    <div>
      {
        presentation
          ? (
          <div>
            <input
              style={nameStyle}
              type="text"
              value={presentationName}
              onChange={(e) => setPresentationName(e.target.value)}
              onBlur={() => updateName()}
            />
            <p><strong>Description:</strong> {presentation.description || 'No Description'}</p>
            <p><strong>Slides:</strong> {presentation.slides.length}</p>

            <button onClick={() => console.log('Saving changes...')}>TODO Save Changes</button>
            <button onClick={() => setShowConfirmModal(true)}>Delete Presentation</button>
            <ConfirmModal
              show={showConfirmModal}
              onHide={() => setShowConfirmModal(false)}
              onConfirm={deletePresentation}
              darkMode={darkMode}
            />
          </div>
            )
          : (
          <p>Could not load presentation</p>
            )
      }
      <button onClick={() => navigate('/dashboard')}>Back</button>
    </div>
  );
}

export default EditPresentation;
