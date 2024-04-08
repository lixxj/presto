import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NewPresentationButton from '../components/NewPresentationButton';
import PresentationCard from '../components/PresentationCard';

function Dashboard ({ token, setTokenFunction, darkMode }) {
  const [presentations, setPresentations] = useState([]); // State to hold presentations

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/presentations', {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setPresentations(response.data.presentations); // Assuming the response contains an array of presentations
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
    }
  }, [token]);

  // Sends all the presentations to the backend
  // Maybe there is better way to do this?
  const setBackend = async (presentation) => {
    console.log('sending presentation to backend')
    try {
      await axios.put('http://localhost:5005/store', {
        store: {
          presentation,
        }
      }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      console.error('Error:', err);
      alert(err.response?.data?.error || 'An unexpected error occurred');
    }
  }

  const addPresentation = (newPresentation) => {
    // This could be enhanced to post the new presentation to the backend
    setPresentations([...presentations, newPresentation]);
    setBackend([...presentations, newPresentation]);
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        {/* Loop through presentations and render a card for each */}
        {presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} darkMode={darkMode} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', marginRight: '-20px' }}>
        {/* Pass addPresentation to allow NewPresentationButton to add a new presentation */}
        <NewPresentationButton darkMode={darkMode} addPresentation={addPresentation} />
      </div>
    </div>
  );
}

export default Dashboard;
