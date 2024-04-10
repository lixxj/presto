import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid here
import NewPresentationButton from '../components/NewPresentationButton';
import PresentationCard from '../components/PresentationCard';

function Dashboard ({ token, darkMode, setEditMode }) {
  const [presentations, setPresentations] = useState([]);

  // Set edit mode to false everytime when arrving on dashboard
  // Hence removing the save and delete button from the header
  setEditMode(false);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        // accessing the 'presentations' within the 'store' object
        const presentations = response.data.store?.presentations || [];
        console.log('Fetched presentations:', presentations);
        setPresentations(presentations);
      }).catch((error) => {
        console.error('Error fetching presentations: ', error);
      });
    }
  }, [token]);

  const addPresentation = async (newPresentation) => {
    // Generate a unique ID for the new presentation
    const newPresentationWithId = { ...newPresentation, id: uuidv4() };

    // Create a copy of the current presentations state
    const updatedPresentations = [...presentations, newPresentationWithId];

    try {
      // Updating the backend with the new list of presentations
      await axios.put('http://localhost:5005/store', {
        store: {
          presentations: updatedPresentations,
        },
      }, {
        headers: {
          Authorization: token,
        },
      });

      // Update the local state upon successful update
      setPresentations(updatedPresentations);
    } catch (error) {
      console.error('Error adding new presentation: ', error);
      alert(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '10px',
        padding: '20px',
        flexGrow: 1,
      }}>
        {presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} darkMode={darkMode} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', marginRight: '-20px' }}>
        <NewPresentationButton darkMode={darkMode} addPresentation={addPresentation} />
      </div>
    </div>
  );
}

export default Dashboard;
