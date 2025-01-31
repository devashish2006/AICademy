import React, { useState } from 'react';
import CodeEditor from './CodeEditor';

const EditorPage = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleExecuteCode = async () => {
    // Call JDoodle API for code execution
    const response = await fetch('/api/executeCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });
    const result = await response.json();
    setOutput(result.output);
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor code={code} onChange={handleCodeChange} />
      <button onClick={handleExecuteCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default EditorPage;
