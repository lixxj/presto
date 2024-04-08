import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import FooterComponent from './components/FooterComponent';
import NavigationBar from './components/navigationBar';
import useDarkMode from './hooks/useDarkMode';

function App () {
  const lsToken = localStorage.getItem('token') || null;
  const [token, setToken] = useState(lsToken);

  const [darkMode, toggleDarkMode] = useDarkMode();

  const setTokenAbstract = (newToken) => {
    if (newToken === null) {
      localStorage.removeItem('token');
      setToken(null);
    } else {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }
  };

  return (
    <div className={'App d-flex flex-column min-vh-100'}>
      <BrowserRouter>
        <NavigationBar token={token} darkMode={darkMode} toggleDarkMode={toggleDarkMode} setTokenAbstract={setTokenAbstract} />
        <Container className="mt-3 flex-grow-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract} darkMode={darkMode} />} />
            <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract} />} />
            <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract} />} />
            {/* Additional routes */}
          </Routes>
        </Container>
        <FooterComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </div>
  );
}

export default App;
