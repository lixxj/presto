import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('c', c);

function CodeBlockModal ({ show, onHide, darkMode, slideNumber, presentation }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(1);
  const [textareaWidth, setTextareaWidth] = useState(50);
  const [textareaHeight, setTextareaHeight] = useState(100);

  const modalStyle = darkMode
    ? { color: '#E9ECEF', backgroundColor: '#212529' }
    : { color: '#495057', backgroundColor: '#FFFFFF' };

  const inputStyle = {
    ...modalStyle,
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    outline: 'none',
    border: '2px solid #7f8c8d',
    borderRadius: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    ...modalStyle,
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    borderRadius: '20px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  };

  const addCodeToSlide = () => {
    if (!code.trim()) {
      alert('Please enter the code.');
      return;
    }
    if (fontSize <= 0) {
      alert('Font size must be greater than zero.');
      return;
    }
    if (textareaWidth <= 0 || textareaHeight <= 0) {
      alert('Textarea dimensions must be positive.');
      return;
    }

    presentation.slides[slideNumber].content.push({ code, language, fontSize, textareaWidth, textareaHeight });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title style={modalStyle}>Add Code Block</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <Form>
          <Form.Group>
            <Form.Label>Code</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={code}
              onChange={e => setCode(e.target.value)}
              style={inputStyle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Programming Language</Form.Label>
            <Form.Control
              as="select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={inputStyle}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Font Size (em)</Form.Label>
            <Form.Control
              type="number"
              value={fontSize}
              onChange={e => setFontSize(parseFloat(e.target.value))}
              style={inputStyle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Textarea Width (%)</Form.Label>
            <Form.Control
              type="number"
              value={textareaWidth}
              onChange={e => setTextareaWidth(parseInt(e.target.value, 10))}
              style={inputStyle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Textarea Height (px)</Form.Label>
            <Form.Control
              type="number"
              value={textareaHeight}
              onChange={e => setTextareaHeight(parseInt(e.target.value, 10))}
              style={inputStyle}
            />
          </Form.Group>
          <SyntaxHighlighter language={language} style={docco} customStyle={{ fontSize: `${fontSize}em`, width: `${textareaWidth}%`, height: `${textareaHeight}px` }}>
            {code}
          </SyntaxHighlighter>
        </Form>
      </Modal.Body>
      <Modal.Footer style={modalStyle}>
        <Button style={buttonStyle} onClick={onHide}>Close</Button>
        <Button style={buttonStyle} onClick={addCodeToSlide}>Add to Slide</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CodeBlockModal;
