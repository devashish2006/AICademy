import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [user, setUser] = useState({ email: "Loading..." });
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming the backend provides the email in params via API
    axios.get(`/api/v1/currentuser/${user.email}`)
      .then((response) => {
        setUser({ email: response.data.email });
      })
      .catch(() => {
        setUser({ email: "guest@example.com" });
      });
  }, [user.email]);

  const handleLearn = () => {
    if (selectedLanguage) navigate("/course");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute w-full h-full opacity-20 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900"></div>
        <motion.div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-spin-slow"></motion.div>
      </motion.div>

      {/* Floating Icons */}
      <motion.div className="absolute top-10 left-10 text-indigo-400 text-7xl opacity-30" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
        {/* Add your icons */}
      </motion.div>

      {/* Profile Box */}
      <motion.div className="relative z-10 bg-gray-800 p-10 rounded-2xl shadow-2xl w-[500px] h-[600px] flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        
        <h2 className="text-3xl font-bold">Hi {user.email} - Welcome to AI Academy</h2>

        {/* Language Selection */}
        <div className="mt-6 w-4/5">
          <label className="block text-gray-300 text-lg mb-2">Select a Language to Learn</label>
          <select className="w-full p-3 bg-gray-700 rounded-md text-white text-lg"
            value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="">-- Choose a Language --</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="swift">Swift</option>
            <option value="typescript">TypeScript</option>
            <option value="kotlin">Kotlin</option>
            <option value="php">PHP</option>
          </select>
        </div>

        <button className="mt-6 w-4/5 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition-all text-lg"
          onClick={handleLearn} disabled={!selectedLanguage}>
          Learn Now
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
