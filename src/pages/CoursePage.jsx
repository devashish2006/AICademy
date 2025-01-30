// src/pages/CoursePage.jsx
import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MicIcon, BookOpenIcon } from 'lucide-react';
import Questionnaire from '../Questionnaire';
import LearningInterface from '../LearningInterface';
import { motion } from "framer-motion";
import { SiReact, SiJavascript, SiPython, SiRuby } from "react-icons/si";
import { FaJava } from 'react-icons/fa';

const Header = ({ toggleTheme, theme }) => (
    <header className="sticky top-0 bg-#19212f z-10 w-full">
      <div className="container w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 transition-transform duration-500 hover:scale-110 hover:drop-shadow-[0_4px_20px_rgba(56,189,248,0.5)]">
            <BookOpenIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">AICademy</h1>
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
          <ul className="flex space-x-4 justify-end text-500">
            <li className='hover:scale-110 transition-transform duration-300'><Button className="bg-transparent text-foreground hover:bg-black/10 dark:hover:bg-white/10">Dashboard</Button></li>
            <li className='hover:scale-110 transition-transform duration-500'><Button className="bg-transparent text-foreground hover:bg-black/10 dark:hover:bg-white/10">My Courses</Button></li>
            <li className='hover:scale-110 transition-transform duration-500'><Button className="bg-transparent text-foreground hover:bg-black/10 dark:hover:bg-white/10">AI Tutor</Button></li>
            <li className='hover:scale-110 transition-transform duration-500'><Button className="bg-transparent text-foreground hover:bg-black/10 dark:hover:bg-white/10">Voice Lab</Button></li>
          </ul>
        </nav>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-#19212f text-white w-full ">
      <div className="container mx-auto px-15 py-8">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">Empowering learners with AI-driven Edtech Platform.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className=''><a href="#" className="hover:underline ">Home</a></li>
              <li><a href="/courses" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">AI Tutor</a></li>
              <li><a href="#" className="hover:underline">Voice Lab</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-4">Email: ashishashish7440@gmail.com</p>
            <p className="text-sm">Phone: 1234567890</p>
            <div className="flex space-x-4 mt-4">
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Button>
            </div>
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
  const [theme, setTheme] = useState('dark');

  const handleQuestionnaireComplete = (preferences) => {
    setUserPreferences(preferences);
    setStage('learning');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false}>
      {/* <div className="min-h-screen flex flex-col bg-background text-foreground"> */}
        {/* Main Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-full h-full opacity-10 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900"></div>
          <div className="absolute w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl opacity-30 animate-spin-slow"></div>
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500 to-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>

          {/* Floating logos */}
          <motion.div
            className="absolute top-10 left-10 text-indigo-400 text-6xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <SiReact />
          </motion.div>
          <motion.div
            className="absolute bottom-80 right-10 text-purple-400 text-6xl opacity-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <SiJavascript />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 text-blue-400 text-6xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <SiPython />
          </motion.div>
          <motion.div
            className="absolute top-1/4 left-1/4 text-blue-400 text-6xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <SiRuby />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-55 text-blue-400 text-8xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <FaJava />
          </motion.div>
        </motion.div>

        <Header toggleTheme={toggleTheme} theme={theme} />
        <main className="flex-grow container mx-auto px-4 py-8 z-10">
          {stage === 'questions' ? (
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          ) : (
            <LearningInterface userPreferences={userPreferences} />
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CoursePage;
