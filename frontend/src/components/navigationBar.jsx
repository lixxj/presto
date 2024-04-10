import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoutButton from './LogoutButton';

function NavigationBar ({ token, setTokenAbstract, darkMode, editMode, presentationName }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard">🪄Presto</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token && <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>}
            {editMode && <Nav.Link as={NavLink} to="/dashboard">Save</Nav.Link>}
            {editMode && <Nav.Link as={NavLink} to="/dashboard">Delete</Nav.Link>}
            {editMode && <Navbar.Brand>{presentationName}</Navbar.Brand>}
            {!token && <Nav.Link as={NavLink} to="/register">Register</Nav.Link>}
            {!token && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
          </Nav>
          <Nav>
            {token && <LogoutButton token={token} setToken={setTokenAbstract} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
