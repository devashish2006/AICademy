import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ children }) => (
  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
    {children}
  </div>
);

const CustomButton = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 
      ${disabled 
        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
        : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'}`}
  >
    {children}
  </button>
);

const OptionButton = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
      selected 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
    }`}
  >
    {children}
  </button>
);

const Questionnaire = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    experience: '',
    tech: '',
    timeCommitment: ''
  });

  const questions = [
    {
      title: "What's your programming experience level?",
      options: ['Beginner', 'Intermediate', 'Advanced'],
      key: 'experience'
    },
    {
      title: "In which Tech are you most interested in?",
      options: ['Python', 'JavaScript', 'Java', 'C++', 'React'],
      key: 'tech'
    },
    {
      title: "How much time can you dedicate to learning each day?",
      options: ['1-2 hours', '2-4 hours', '4+ hours'],
      key: 'timeCommitment'
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentStep].key]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
    navigate('/course');
  };

  const isStepComplete = answers[questions[currentStep].key] !== '';
  const isAllComplete = Object.values(answers).every(answer => answer !== '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <CustomCard>
        <div className="w-full max-w-3xl"> {/* Changed from max-w-md to max-w-3xl */}
          <h2 className="text-2xl font-bold text-white mb-6">Course Personalization</h2>
          
          <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-white mb-4">{questions[currentStep].title}</h3>
            <div className="grid grid-cols-2 gap-3"> {/* Changed from space-y-3 to grid */}
              {questions[currentStep].options.map((option) => (
                <OptionButton
                  key={option}
                  selected={answers[questions[currentStep].key] === option}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </OptionButton>
              ))}
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            {currentStep > 0 && (
              <CustomButton onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
              </CustomButton>
            )}
            {currentStep === questions.length - 1 ? (
              <CustomButton onClick={handleSubmit} disabled={!isAllComplete}>
                Start Learning
              </CustomButton>
            ) : (
              <CustomButton 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepComplete}
              >
                Next
              </CustomButton>
            )}
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default Questionnaire;
