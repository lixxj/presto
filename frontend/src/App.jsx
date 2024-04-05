import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Button } from '@mui/material';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// ! we can not use .css files !
import './styles.css';

function App () {
  const lsToken = localStorage.getItem('token') || null;
  const [token, setToken] = React.useState(lsToken);

  const setTokenAbstract = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  const [darkMode, setDarkMode] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const authPageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
            <Button onClick={toggleDarkMode} color="inherit">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <nav>
              <Link to="/dashboard">Dashboard</Link> |{''}
              <Link to="/register">Register</Link> |{''}
              <Link to="/login">Login</Link>
            </nav>
            <Routes>
              <Route path="/dashboard" element={<Dashboard style={authPageStyle} token={token} setTokenFunction={setTokenAbstract} />} />
              <Route path="/register" element={<div style={authPageStyle}><Register token={token} setTokenFunction={setTokenAbstract} /></div>} />
              <Route path="/login" element={<div style={authPageStyle}><Login token={token} setTokenFunction={setTokenAbstract} /></div>} />
              {/* More routes... */}
          </Routes>
          </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
