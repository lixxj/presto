import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import NewPresentation from '../components/NewPresentationButton';

function NavigationBar ({ token, setTokenAbstract, darkMode, toggleDarkMode }) {
  const location = useLocation();

  // Check if the current route is the Dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
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
          <Nav>
            {isDashboard && <NewPresentation darkMode={darkMode} />}
            {token && <LogoutButton token={token} setToken={setTokenAbstract} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
