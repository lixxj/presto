import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const borderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '60%',
    border: '1px solid lightGray',
    borderRadius: '20px',
    padding: '20px',
    margin: 'auto',
    minWidth: '350px',
  }

  const formStyle = {
    width: '100%',
  }

  const mobileStyle = `@media (max-width: 768px) {
    div {
      width: 90% !important; // Adjust width for small screens
    }
  }`;

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  /**
  * Sends an API request to the backend to login a user
  */
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      alert(err.response?.data?.error || 'An unexpected error occurred');
    }
  }

  return (
    <div style={borderStyle}>
      <style>
        {mobileStyle}
      </style>
      <Form style={formStyle} onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <hr />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
