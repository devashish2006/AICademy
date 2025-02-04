import React, { useState } from 'react';
import CourseContent from './CourseContent';
import { modules } from './modules';

const LearningInterface = ({ userPreferences }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const nextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1); // Update to the next module
      setIsCorrect(false); // Reset correctness for the next module
    }
  };

  return (
    <div className="flex space-x-4">
      <CourseContent
        module={modules[currentModule]} // Triggers speech when this changes
        onNext={nextModule}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default LearningInterface;

