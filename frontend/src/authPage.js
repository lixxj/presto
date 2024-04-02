import React, { useState } from 'react';
import styles from './authPage.module.css';

function authForms () {
  const [loginState, toggleState] = useState(true);

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const switchForms = (event) => {
    event.preventDefault()
    toggleState(!loginState);
  }

  return (
    <div>
      {loginState
        ? (
        <form>
          <h1>Presto</h1>
          <h2>Login</h2>
          <input placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
          <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)}></input>
          <button onClick={test}>Login</button>
          <button onClick={switchForms}>Register</button>
        </form>
          )
        : (
        <form>
          <h1>Presto</h1>
          <h2>Register</h2>
          <input placeholder='Name' onChange={e => setName(e.target.value)}></input>
          <input placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
          <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)}></input>
          <input placeholder='Confirm Password' type='password' onChange={e => setConfirmPassword(e.target.value)}></input>
          <button onClick={test}>Register</button>
          <button onClick={switchForms}>Back to Login</button>
        </form>
          )}
    </div>
  );
}

export default authForms;
