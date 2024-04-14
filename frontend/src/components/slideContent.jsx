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

  return (
    <div style={ contentAreaStyle }>
        <p style = { slideNumberStyle }>{slideNumber}</p>
        {content.map((line, index) => (
            <p key={index} style = { { fontSize: line.fontSize, color: line.color }}>{line.text}</p>
        ))}
    </div>
  );
}

export default slideContent;
