import React from 'react';

function slideContent ({ slideNumber, content }) {
  const contentAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '45rem',
    backgroundColor: 'black',
  }

  const slideNumberStyle = {
    position: 'absolute',
    margin: '0',
    bottom: '0'
  }

  const test = () => {
    content.map(line => (
      console.log(line)
    ))
  }

  return (
    <div style={ contentAreaStyle }>
        <p style = { slideNumberStyle } onClick={test}>{slideNumber}</p>
        {content.map((line, index) => (
            <p key={index}>{line}</p>
        ))}
    </div>
  );
}

export default slideContent;
