import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NewPresentationButton from '../components/NewPresentationButton';

function Dashboard ({ token, setTokenFunction, darkMode, addPresentation }) {
  const [store, setStore] = React.useState({});
  console.log(store);

  React.useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setStore(response.data.store);
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
    }
  }, [token]);

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        {/* Reserve this area for presentation content */}

      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', marginRight: '-20px', }}>
        {/* NewPresentationButton always aligned to the right */}
        {token && <NewPresentationButton darkMode={darkMode} addPresentation={addPresentation} />}
      </div>
    </div>
  );
}

export default Dashboard;
