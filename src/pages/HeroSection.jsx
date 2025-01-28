import React from "react"; // Import React to handle JSX
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaProjectDiagram, FaLightbulb } from "react-icons/fa";
import { SiReact, SiJavascript, SiPython } from "react-icons/si";

function App() {
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

  const Card = ({ icon, title, description, className = "" }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-gray-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden ${className}`}
    >
      <div className="text-indigo-400 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </motion.div>
  );

  return (
    <>
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
            className="absolute bottom-10 right-10 text-purple-400 text-6xl opacity-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <SiJavascript />
          </motion.div>
          <motion.div
            className="absolute top-1/4 right-1/4 text-blue-400 text-6xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <SiPython />
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="z-10 text-center max-w-2xl">
          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold tracking-wide"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Welcome to <span className="text-indigo-400">AiCademy</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg lg:text-xl opacity-80"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Redefining education through technology. Learn, build, and grow with our AI-powered tools.
          </motion.p>

          <motion.div
            className="mt-8 space-x-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </motion.div>
        </div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <Card
            icon={<FaChalkboardTeacher />}
            title="Interactive Courses"
            description="Explore cutting-edge AI courses designed by experts to help you master the future of technology."
          />
          <Card
            icon={<FaProjectDiagram />}
            title="Hands-On Projects"
            description="Apply what you learn with real-world projects that enhance your skills and portfolio."
          />
          <Card
            icon={<FaLightbulb />}
            title="Expert Guidance"
            description="Learn from industry leaders with personalized mentorship and feedback."
          />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} AiCademy. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Designed to empower learners worldwide with the best education technology.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
