import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NewPresentationButton from '../components/NewPresentationButton';
import PresentationCard from '../components/PresentationCard';

function Dashboard ({ token, setTokenFunction, darkMode }) {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        // Directly accessing the 'presentations' within the 'store' object
        const presentations = response.data.store.store?.presentations || [];
        console.log('Fetched presentations:', presentations);
        setPresentations(presentations);
      }).catch((error) => {
        console.error('Error fetching presentations: ', error);
      });
    }
  }, [token]);

  const addPresentation = async (newPresentation) => {
    // Create a copy of the current presentations state to modify
    const updatedPresentations = [...presentations, newPresentation];

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

      // If the update is successful, update the local state to reflect the new list of presentations
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '10px', // Adjust spacing between cards
        padding: '20px', // Add some padding around the grid
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
