import React from 'react';
import AuthForms from './authPage'; // Assuming AuthForms is your original authentication component
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

          {/* TODO: Route for AuthForms, move this to login/register maybe?  */}
          <Route path="/" element={<div style={authPageStyle}><AuthForms /></div>} />

          <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract} />} />
          <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract} pet="dog" food="pasta" />} />
          <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract} />} />

          {/* More routes... */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
