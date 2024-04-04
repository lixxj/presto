import React from 'react';
import './styles.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App () {
  const lsToken = localStorage.getItem('token') || null; // Simplified token retrieval
  const [token, setToken] = React.useState(lsToken);

  const setTokenAbstract = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  const authPageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard style={authPageStyle} token={token} setTokenFunction={setTokenAbstract} />} />
          <Route path="/register" element={<div style={authPageStyle}><Register token={token} setTokenFunction={setTokenAbstract} pet="dog" food="pasta" /></div>} />
          <Route path="/login" element={<div style={authPageStyle}><Login token={token} setTokenFunction={setTokenAbstract} /></div>} />

          {/* More routes... */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
