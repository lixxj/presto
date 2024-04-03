import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function authForms () {
  const [loginState, toggleState] = useState(true);

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const borderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '25%',
    border: '1px solid lightGray',
    borderRadius: '15px'
  }

  const formStyle = {
    margin: '10% 0',
    width: '80%',
  }

  const test = () => {
    if (loginState) {
      console.log(email)
      console.log(password)
    } else {
      console.log(name)
      console.log(email)
      console.log(password)
      console.log(confirmPassword)
    }
  }

  const switchForms = (event) => {
    event.preventDefault()
    toggleState(!loginState);
  }

  return (
    <div style={borderStyle}>
      {loginState
        ? (
          <Form style={formStyle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={test}>
            Submit
          </Button>
          <Button variant="primary" onClick={switchForms} style={ { marginLeft: '1rem' } }>
            Register
          </Button>
        </Form>
          )
        : (
          <Form style={formStyle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <Form.Text className="text-muted">
              Please choose a strong password
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter password" onChange={e => setConfirmPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="submit" style={ { marginLeft: '1rem' } }>
            Back to Login
          </Button>
        </Form>
          )}
    </div>
  );
}

export default authForms;
