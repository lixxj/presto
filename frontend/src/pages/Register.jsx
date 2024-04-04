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
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
      event.preventDefault()
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
        console.log('error')
        alert(err.response.data.error);
      }
    }
  }

  const displayLoginForm = () => {
    navigate('/login');
  }

  const borderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '25%',
    border: '1px solid lightGray',
    borderRadius: '20px'
  }

  const formStyle = {
    margin: '10% 0',
    width: '80%',
  }

  return (
    <div style={borderStyle}>
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
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <Form.Text className="text-muted">
              Please choose a strong password
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="secondary" onClick={displayLoginForm} style={ { marginLeft: '1rem' } }>
            Back to Login
          </Button>
        </Form>
    </div>
  );
}

export default Register;
