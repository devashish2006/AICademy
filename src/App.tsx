import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import HeroSection from './pages/HeroSection';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/course" element={<CoursePage />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
