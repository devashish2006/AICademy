import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const questions = [
  "What's your programming experience level?",
  "What areas of Python are you most interested in?",
  "How much time can you dedicate to learning each day?",
];

const Questionnaire = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Course Personalization</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">{question}</label>
            <Input
              type="text"
              value={answers[question] || ''}
              onChange={(e) => handleAnswerChange(question, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
        <Button onClick={handleSubmit} className="w-full">Start Learning</Button>
      </CardContent>
    </Card>
  );
};

export default Questionnaire;