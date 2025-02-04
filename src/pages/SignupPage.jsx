import React from "react"; // Import React to handle JSX
import { motion } from "framer-motion";

function SignUpPage() {
  const Button = ({ children, variant = "filled", className = "", ...props }) => {
    const baseStyles =
      "px-6 py-3 rounded-lg font-medium focus:outline-none transition-all duration-200";
    const filledStyles =
      "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg";
    const outlineStyles =
      "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white";

    return (
      <button
        className={`${baseStyles} ${
          variant === "filled" ? filledStyles : outlineStyles
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      {/* Signup Section */}
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
        </motion.div>

        {/* Signup Form */}
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

          <form className="mt-6 space-y-4">
            {/* Name Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </motion.div>

            {/* Signup Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Button>Sign Up</Button>
            </motion.div>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} AiCademy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default SignUpPage;
