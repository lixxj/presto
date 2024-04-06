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

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const register = async (event) => {
    event.preventDefault(); // It's a good practice to have this at the beginning
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
        console.error('error:', err); // It's better to use console.error for errors
        alert(err.response?.data?.error || 'An unexpected error occurred');
      }
    }
  }

  // Responsive styling
  const borderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Changed from 'space-between' for better centering
    flexDirection: 'column',
    width: '60%',
    border: '1px solid lightGray',
    borderRadius: '20px',
    padding: '20px', // Added padding for better spacing
    margin: 'auto', // Center the form on the page
    minWidth: '350px',
  }

  const formStyle = {
    width: '100%', // Use 100% width within the container
  }

  // Media query for mobile responsiveness
  const mobileStyle = `@media (max-width: 768px) {
    div {
      width: 80% !important; // Increase width on small screens
    }
  }`;

  return (
    <div style={borderStyle}>
      <style>
        {mobileStyle}
      </style>
      <Form style={formStyle} onSubmit={register}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
