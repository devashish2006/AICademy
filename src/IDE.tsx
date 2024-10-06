import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IDE = ({ initialCode, expectedOutput, onCorrectSubmission }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{ content: code }],
        }),
      });
      const result = await response.json();
      const executionOutput = result.run.output.trim();
      setOutput(executionOutput);
      if (executionOutput === expectedOutput.trim()) {
        onCorrectSubmission();
      }
    } catch (error) {
      setOutput('Error: Unable to run code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Python IDE</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-2 font-mono text-sm mb-4 border rounded"
        />
        <Button onClick={runCode} disabled={isRunning} className="mb-4">
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        <div className="bg-gray-100 p-2 rounded">
          <h3 className="font-bold mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default IDE;