"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"
import { motion } from "framer-motion";
import { SiReact, SiJavascript, SiPython, SiRuby } from "react-icons/si";
import { FaJava } from 'react-icons/fa';

const Header = () => (
    <header className="sticky top-0 bg-transparent z-10 w-full">
    <div className="container w-full mx-auto px-4 py-4 flex justify-center">
      <h1 className="text-4xl font-bold mb-10 relative overflow-hidden border-r-4 border-white whitespace-nowrap text-white animate-typewriter font-robo">
        Welcome to AICademy
      </h1>
    </div>
  
    {/* Custom CSS for Typewriter Animation (Plays Once) */}
    <style>
      {`
        @keyframes typewriter {
          0% { width: 0ch; }
          100% { width: 21ch; } /* Adjust to match text length */
        }
  
        @keyframes blink {
          0%, 100% { border-color: white; }
          50% { border-color: transparent; }
        }
  
        .animate-typewriter {
          display: inline-block;
          animation: typewriter 3s ease-out forwards, blink 0.75s step-end 3s;
        }
      `}
    </style>
  </header>
  );

 const Footer = () => (
    <footer className="bg-#19212f text-white w-full ">
      <div className="container mx-auto px-15 py-8">
          
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm">
          © 2025 AI-Powered Learning Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      if (email.includes("@")) {
        alert("Login successful with email!")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      alert("Login with Google successful!")
      // Implement actual Google login logic here
    } catch (err) {
      setError("Google login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setError("")
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      alert("Login with GitHub successful!")
      // Implement actual GitHub login logic here
    } catch (err) {
      setError("GitHub login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (

    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500 to-green-500 rounded-full blur-2xl opacity-20 animate-pulse "></div>

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

      <Header />
      <Card className="w-full max-w-md z-10 bg-black text-white">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your credentials to create account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Signing in..." : "Signup with Email"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-gray-900 text-white hover:bg-gray-700"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="#4285F4"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="bg-gray-900 text-white hover:bg-gray-700"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Footer />
    </div>
    </>
  )
}