import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Signup successful! Redirecting...");
      setError(null);

      // Store token (optional)
      localStorage.setItem("token", response.data.token);

      // Redirect user after signup (optional)
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 text-center max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <motion.h1
            className="text-3xl font-extrabold tracking-wide text-indigo-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Sign Up for AiCademy
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-400"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Create an account to access exclusive features.
          </motion.p>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p className="text-sm">© {new Date().getFullYear()} AiCademy. All rights reserved.</p>
      </footer>
    </>
  );
}

export default SignUpPage;
