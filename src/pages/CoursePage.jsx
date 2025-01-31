import React, { useState } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MicIcon, BookOpenIcon } from 'lucide-react';
import Questionnaire from '../Questionnaire';
import LearningInterface from '../LearningInterface';

const Header = ({ toggleTheme, theme }) => (
  <header className="border-b sticky top-0 bg-background z-10">
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <BookOpenIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">AI-Powered Learning</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <MicIcon className="h-5 w-5" />
          </Button>
          <Input className="max-w-sm" placeholder="Search courses..." />
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <nav className="mt-4">
        <ul className="flex space-x-4">
          <li><Button variant="ghost">Dashboard</Button></li>
          <li><Button variant="ghost">My Courses</Button></li>
          <li><Button variant="ghost">AI Tutor</Button></li>
          <li><Button variant="ghost">Voice Lab</Button></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">Empowering learners with AI-driven Edtech Platform.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="#" className="hover:underline">AI Tutor</a></li>
            <li><a href="#" className="hover:underline">Voice Lab</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: ashishashish7440@gmail.com</p>
          <p className="text-sm">Phone: </p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm">
        © 2024 AI-Powered Learning Platform. All rights reserved.
      </div>
    </div>
  </footer>
);

const CoursePage = () => {
  const [stage, setStage] = useState('questions');
  const [userPreferences, setUserPreferences] = useState({});
  const [theme, setTheme] = useState('light');
  
  // For code execution
  const [language, setLanguage] = useState('python'); // Default language is Python
  const [code, setCode] = useState(`# Write your code here`);
  const [output, setOutput] = useState('');
  const [userInput, setUserInput] = useState(''); // Add this line here
  const clientId = '74798e2ee056ea928b05749fc628c946'; // JDoodle clientId
  const clientSecret = '7bcfff9a78bd246a996f57701e8ccdd9a4db6d734a0c02eb6f4e56c4638eedb'; // JDoodle clientSecret
const [isExecuting, setIsExecuting] = useState(false);
  const languageOptions = ['python', 'c', 'cpp', 'javascript'];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

const executeCode = async () => {
  setIsExecuting(true);
  setOutput('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  try {
    const response = await axios.post(`${API_URL}/api/execute`, {
      language,
      code,
      input: userInput  // Add the input to the request
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    setOutput(response.data.output || 'Program executed successfully with no output');
  } catch (error) {
    console.error('Code execution error:', error);
    const errorDetails = error.response?.data?.details || error.message;
    setOutput(`Error: ${errorDetails}`);
  } finally {
    setIsExecuting(false);
  }
};


  const handleQuestionnaireComplete = (preferences) => {
    setUserPreferences(preferences);
    setStage('learning');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {stage === 'questions' ? (
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          ) : (
            <LearningInterface userPreferences={userPreferences} />
          )}

          {/* Language Dropdown and Code Editor */}
          <div className="mt-8">
            <div className="language-selector mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select Language</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
                      {lang.toUpperCase()}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="code-editor">
              <textarea
                value={code}
                onChange={handleCodeChange}
                rows="10"
                className="border rounded p-2 w-full"
                placeholder={`Write your ${language} code here`}
              />
	      <div className="mt-4">
      <label className="block text-sm font-medium mb-2">
        Program Input (one value per line)
      </label>
    </div>
	  <div className="mt-4 space-y-4">
  <div>
    <label htmlFor="code-input" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      Program Input
    </label>
    <div className="mt-1">
      <textarea
        id="code-input"
        rows={4}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
        placeholder="Enter your program's input here (one value per line)"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
    </div>
    <p className="mt-1 text-sm text-gray-500">
      {language === 'cpp' && "For C++: Enter each input value on a new line"}
      {language === 'python' && "For Python: Enter each input value on a new line"}
      {language === 'c' && "For C: Enter each input value on a new line"}
      {language === 'javascript' && "For JavaScript: Enter each input value on a new line"}
    </p>
  </div>
</div>

    <Button
      onClick={executeCode}
      className="mt-4"
      disabled={isExecuting}
    >
      {isExecuting ? 'Running...' : 'Run Code'}
    </Button>

    <div className="output-box mt-4">
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CoursePage;
