import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoutButton from './components/LogoutButton';
import FooterComponent from './components/FooterComponent';

function App () {
  const lsToken = localStorage.getItem('token') || null;
  const [token, setToken] = useState(lsToken);

  // Retrieve dark mode preference from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const lsDarkMode = localStorage.getItem('darkMode');
    return lsDarkMode === 'true'; // Convert string to boolean
  });

  const setTokenAbstract = (newToken) => {
    if (newToken === null) {
      localStorage.removeItem('token'); // Ensure the token is removed from localStorage when logging out
      setToken(null); // Update state with null when logging out
    } else {
      localStorage.setItem('token', newToken);
      setToken(newToken); // Update state with the new token
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString()); // Ensure to save it as a string
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <div className={'App d-flex flex-column min-vh-100'}>
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
          <Container>
            <Navbar.Brand as={NavLink} to="/dashboard">🪄Presto</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {token && <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>}
                {!token && <Nav.Link as={NavLink} to="/register">Register</Nav.Link>}
                {!token && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
              </Nav>

              {token && (
                <Nav>
                  <LogoutButton token={token} setToken={setTokenAbstract} />
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-3 flex-grow-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract} />} />
            <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract} />} />
            <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract} />} />
            {/* Additional routes as needed */}
          </Routes>
        </Container>

        <FooterComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </div>
  );
}

export default App;
