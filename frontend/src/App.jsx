import React from 'react';
import AuthForms from './authPage';
import './styles.css';

function App () {
  const authPageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }

  return (
    <div style = {authPageStyle}>
      <AuthForms />
    </div>
  );
}

export default App;
