import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from '../components/ConfirmModal';

function EditPresentation ({ token, darkMode }) {
  const { id } = useParams(); // Get the presentation ID from the URL
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const handleDelete = async () => {
    try {
      // console.log('Deleting presentation', id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete presentation', error);
    }
  };

  return (
    <div>
      <h2>TODO Edit Presentation</h2>
      {
        presentation
          ? (
          <div>
            <p><strong>Name:</strong> {presentation.name}</p>
            <p><strong>Description:</strong> {presentation.description || 'No Description'}</p>
            <p><strong>Slides:</strong> {presentation.slides.length}</p>

            <button onClick={() => console.log('Saving changes...')}>TODO Save Changes</button>
            <button onClick={() => setShowConfirmModal(true)}>TODO Delete Presentation</button>
            <ConfirmModal
              show={showConfirmModal}
              onHide={() => setShowConfirmModal(false)}
              onConfirm={handleDelete}
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
