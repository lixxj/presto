import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

function App () {
  const lsToken = localStorage.getItem('token') || null;
  const [token, setToken] = React.useState(lsToken);

  // Retrieve dark mode preference from localStorage or default to false
  const [darkMode, setDarkMode] = React.useState(() => {
    const lsDarkMode = localStorage.getItem('darkMode');
    return lsDarkMode === 'true'; // Convert string to boolean
  });

  const setTokenAbstract = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Save preference
  };

  useEffect(() => {
    // Apply or remove dark mode class on body
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [darkMode]); // Effect runs when darkMode state changes

  return (
    <div className={'App min-vh-100'}>
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
          <Container>
            <Navbar.Brand as={NavLink} to="/dashboard">🪄Presto</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </Nav>
              <Nav>
                <button onClick={toggleDarkMode} className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <Routes>
            <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract} />} />
            <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract} />} />
            <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract} />} />
            {/* More routes as needed... */}
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
