import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MicIcon, BookOpenIcon, CodeIcon } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { materialDark } from '@uiw/codemirror-theme-material';
import Questionnaire from '../Questionnaire';
import LearningInterface from '../LearningInterface';

// Background Animation Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `rgba(75, 85, 99, ${Math.random() * 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] opacity-30" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Floating Logo Component
const FloatingLogo = () => (
  <div className="fixed top-4 right-4 z-50 transform transition-transform hover:scale-110">
    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-xl">
      <BookOpenIcon className="h-10 w-10 text-indigo-400" />
    </div>
  </div>
);

// Header Component
const Header = ({ toggleTheme, theme }) => (
  <header className="border-b sticky top-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-10">
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <BookOpenIcon className="h-8 w-8 text-indigo-400" />
          <h1 className="text-2xl font-bold">AI-Powered Learning</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <MicIcon className="h-5 w-5 text-indigo-400" />
          </Button>
          <Input 
            className="max-w-sm text-white bg-transparent border border-gray-600" 
            placeholder="Search courses..." 
          />
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? 
              <SunIcon className="h-5 w-5 text-indigo-400" /> : 
              <MoonIcon className="h-5 w-5 text-indigo-400" />
            }
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
          <li><Button variant="ghost" className="text-indigo-400">Dashboard</Button></li>
          <li><Button variant="ghost" className="text-indigo-400">My Courses</Button></li>
          <li><Button variant="ghost" className="text-indigo-400">AI Tutor</Button></li>
          <li><Button variant="ghost" className="text-indigo-400">Voice Lab</Button></li>
        </ul>
      </nav>
    </div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="border-t bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400 py-8">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        © 2024 AI-Powered Learning Platform. All rights reserved.
      </p>
      <p className="mt-2 text-xs">
        Empowering learners with AI-driven Edtech Platform.
      </p>
    </div>
  </footer>
);

// Main CoursePage Component
const CoursePage = () => {
  const [stage, setStage] = useState('questions');
  const [userPreferences, setUserPreferences] = useState({});
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const languageOptions = ['python', 'c', 'cpp', 'javascript'];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode('');
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      case 'c':
      case 'cpp':
        return cpp();
      default:
        return python();
    }
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput('');
  
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    // Create and log the payload object
    const payload = { language, code, input: userInput };
    console.log("Payload:", payload);
  
    try {
      const response = await axios.post(`${API_URL}/api/execute`, payload, {
        headers: { "Content-Type": "application/json" },
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

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
        <AnimatedBackground />
        <FloatingLogo />
        
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          {stage === 'questions' ? (
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          ) : (
            <LearningInterface userPreferences={userPreferences} />
          )}

          <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300">
            <div className="language-selector mb-4 flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-indigo-400 hover:bg-indigo-500/20">
                    <CodeIcon className="mr-2 h-4 w-4" /> {language.toUpperCase()}
                  </Button>
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

            <div className="code-editor rounded-lg overflow-hidden bg-gray-900">
              <CodeMirror
                value={code}
                height="400px"
                theme={materialDark}
                extensions={[getLanguageExtension(language)]}
                onChange={(value) => setCode(value)}
                className="border-2 border-gray-700 rounded-lg"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Program Input</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={4}
                className="w-full rounded-md border bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your program's input here"
              />
            </div>

            <Button
              onClick={executeCode}
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 group"
              disabled={isExecuting}
            >
              <span className="group-hover:scale-105 transition-transform">
                {isExecuting ? 'Running...' : 'Run Code'}
              </span>
            </Button>

            <div className="output-box mt-4 bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Output:</h3>
              <pre className="text-gray-300 overflow-x-auto">{output}</pre>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CoursePage;