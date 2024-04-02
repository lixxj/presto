import React, { useState } from 'react';

function authForms () {
  const [loginState, toggleState] = useState(true);

  const switchForms = (event) => {
    event.preventDefault()
    toggleState(!loginState);
    console.log(loginState)
  }

  return (
    <form>
      {loginState
        ? (
        <div>
          <h1>Presto</h1>
          <h2>Login</h2>
          <button onClick={switchForms}>Register</button>
        </div>
          )
        : (
        <div>
          <h1>Presto</h1>
          <h2>Register</h2>
          <button onClick={switchForms}>Back to Login</button>
        </div>
          )}
    </form>
  );
}

export default authForms;
