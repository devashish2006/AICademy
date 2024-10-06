import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoonIcon, SunIcon, MicIcon, BookOpenIcon, GraduationCapIcon, Menu } from 'lucide-react'
import Questionnaire from './Questionnaire';
import LearningInterface from './LearningInterface';

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
            <li><a href="#" className="hover:underline">Courses</a></li>
            <li><a href="#" className="hover:underline">AI Tutor</a></li>
            <li><a href="#" className="hover:underline">Voice Lab</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: ashishashish7440@gmail.com</p>
          <p className="text-sm">Phone: </p>
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

const App = () => {
  const [stage, setStage] = useState('questions');
  const [userPreferences, setUserPreferences] = useState({});
  const [theme, setTheme] = useState('light');

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
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;