import React from 'react';

function slideContent ({ slideNumber, content }) {
  const contentAreaStyle = {
    position: 'relative',
    width: '100%',
    height: '45rem',
    backgroundColor: 'white',
    borderRadius: '5px'
  }

  const slideNumberStyle = {
    position: 'absolute',
    color: 'black',
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

  const renderElement = (element, index) => {
    if (element.type === 'text') {
      return (
        <textarea key={index} style = { {
          ...textFieldStyle,
          width: element.textAreaWidth,
          height: element.textAreaHeight,
          fontSize: element.fontSize,
          color: element.color
        } }
          value={element.text}/>
      )
    } else if (element.type === 'image') {
      return (
        <img style={ {
          width: element.width,
          height: element.height
        } }
          alt={element.description}
          src={element.url}></img>
      )
    }
  }

  return (
    <div style={ contentAreaStyle }>
        <p style = { slideNumberStyle }>{slideNumber}</p>
        {content.map((line, index) => (
          renderElement(line, index)
        ))}
    </div>
  );
}

export default slideContent;
