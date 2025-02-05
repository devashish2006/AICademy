import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", { 
        email, 
        password 
      });

      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
      window.location.href = "/profile";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-800 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className="z-10 text-center max-w-md bg-gray-800 p-8 rounded-lg shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-extrabold tracking-wide text-indigo-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Login to AiCademy
        </motion.h1>
        
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          
          <motion.button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white shadow-lg"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        
        <p className="mt-4 text-sm text-gray-400">
          Don't have an account? {" "}
          <a href="/signup" className="text-indigo-400 underline hover:text-indigo-300">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;