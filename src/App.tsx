import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import HeroSection from './pages/HeroSection';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/course" element={<CoursePage />} />
        <Route path="/" element={<HeroSection />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
