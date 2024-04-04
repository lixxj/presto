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
      setToken(null);
      navigate('/login')
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
}

export default Logout;
