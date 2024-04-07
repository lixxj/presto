import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      setStore(response.data.store);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      // Handle error appropriately in your UI
    });
  }, [token]);

  console.log(store);

  if (token === null) {
    return <Navigate to="/login" />
  }
  return <>
    dashboard goes here...
  </>;
}

export default Dashboard;
