import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  const displayRegisterForm = () => {
    navigate('/register');
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
      <Form style={formStyle}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={login}>
          Login
        </Button>
        <Button variant="secondary" onClick={displayRegisterForm} style={ { marginLeft: '1rem' } }>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Login;
