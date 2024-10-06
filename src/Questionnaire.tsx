import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import ShadCN UI components

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
            {index === 1 ? ( // Check if the question is the second one
              <Select
                onValueChange={(value) => handleAnswerChange(question, value)}
                value={answers[question] || ""}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="text"
                value={answers[question] || ''}
                onChange={(e) => handleAnswerChange(question, e.target.value)}
                className="w-full"
              />
            )}
          </div>
        ))}
        <Button onClick={handleSubmit} className="w-full">Start Learning</Button>
      </CardContent>
    </Card>
  );
};

export default Questionnaire;
