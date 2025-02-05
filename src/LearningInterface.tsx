import React, { useState } from 'react';
import CourseContent from './CourseContent';
import { modules } from './modules';

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
    <div 
      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
      style={{ width: `${(current / (total - 1)) * 100}%` }}
    />
  </div>
);

const ModulesList = ({ modules, currentModule, onModuleSelect }) => (
  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 w-80 h-fit">
    <h3 className="text-xl font-semibold mb-4 text-white">Course Modules</h3>
    <div className="space-y-2">
      {modules.map((module, index) => (
        <button
          key={index}
          onClick={() => onModuleSelect(index)}
          className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
            currentModule === index 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              currentModule === index ? 'bg-indigo-500' : 'bg-gray-600'
            }`}>
              {index + 1}
            </div>
            <div>
              <p className="font-medium">{module.title}</p>
              <p className="text-sm opacity-75">
                {currentModule > index ? 'Completed' : currentModule === index ? 'Current' : 'Locked'}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const LearningInterface = ({ userPreferences }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const nextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setIsCorrect(false);
    }
  };

  const handleModuleSelect = (index) => {
    if (index <= currentModule) {
      setCurrentModule(index);
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar current={currentModule} total={modules.length} />
      <div className="flex space-x-6">
        <ModulesList 
          modules={modules}
          currentModule={currentModule}
          onModuleSelect={handleModuleSelect}
        />
        <div className="flex-1">
          <CourseContent
            module={modules[currentModule]}
            onNext={nextModule}
            isCorrect={isCorrect}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningInterface;

