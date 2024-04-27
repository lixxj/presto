import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  /**
  * Responsive styling
  */
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

  /**
  * Responsive styling
  */
  const mobileStyle = `@media (max-width: 768px) {
    div {
      width: 90% !important; // Increase width on small screens
    }
  }`;

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  /**
  * Sends an API request to the backend to register a user
  */
  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setPassword('');
      setConfirmPassword('');
    } else {
      try {
        const response = await axios.post('http://localhost:5005/admin/auth/register', {
          email,
          password,
          name
        });
        setTokenFunction(response.data.token);
        navigate('/dashboard');
      } catch (err) {
        console.error('error:', err);
        alert(err.response?.data?.error || 'An unexpected error occurred');
      }
    }
  }

  return (
    <div style={borderStyle}>
      <style>
        {mobileStyle}
      </style>
      <Form style={formStyle} onSubmit={register}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Please choose a strong password" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          </Form.Group>
          <hr />
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
    </div>
  );
}

export default Register;
