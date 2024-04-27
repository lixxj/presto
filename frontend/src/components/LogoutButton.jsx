import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout ({ token, setToken }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      console.error('Logout error:', err.response?.data?.error || err.message);
    }
    setToken(null);
    navigate('/login');
  };

  const customButtonStyle = {
    borderColor: 'red',
    borderWidth: '3px',
    borderStyle: 'inset',
    width: '75px',
    height: '35px',
    borderRadius: '18px',
    fontSize: '16px',
    lineHeight: '0.3'
  };

  return (
    <button onClick={logout} className="btn btn-outline-danger nav-link" style={customButtonStyle}>
      Logout
    </button>
  );
}

export default Logout;
