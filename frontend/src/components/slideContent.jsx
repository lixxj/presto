import React from 'react';

function slideContent ({ slideNumber, content }) {
  const contentAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '45rem',
    backgroundColor: 'white',
  }

  const slideNumberStyle = {
    position: 'absolute',
    margin: '0',
    bottom: '0'
  }

  const textFieldStyle = {
    position: 'absolute',
    backgroundColor: 'transparent',
    border: '1px solid grey',
    borderRadius: '5px',
    overflow: 'hidden'
  }

  return (
    <div style={ contentAreaStyle }>
        <p style = { slideNumberStyle }>{slideNumber}</p>
        {content.map((line, index) => (
            <textarea key={index} style = { {
              ...textFieldStyle,
              width: line.textAreaWidth,
              height: line.textAreaHeight,
              fontSize: line.fontSize,
              color: line.color
            } }
              value={line.text}/>
        ))}
    </div>
  );
}

export default slideContent;
