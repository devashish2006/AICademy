import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white flex items-center justify-center overflow-hidden">
            {/* Background animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute w-full h-full opacity-20 bg-gradient-to-t from-indigo-700 via-purple-600 to-blue-700 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-gradient-to-br from-pink-400 to-yellow-500 rounded-full blur-3xl opacity-40 animate-spin-slow"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-green-300 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            </motion.div>

            {/* Hero content */}
            <div className="z-10 text-center">
                <motion.h1
                    className="text-5xl lg:text-6xl font-extrabold tracking-wide"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Welcome to <span className="text-yellow-400">AICademy</span>
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg lg:text-xl opacity-80"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Empowering the next generation with AI-driven learning.
                </motion.p>

                <motion.div
                    className="mt-8 space-x-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black">
                        Get Started
                    </Button>
                    <Button variant="outline" size="lg" className="text-white border-yellow-500 hover:bg-yellow-500 hover:text-black">
                        Learn More
                    </Button>
                </motion.div>

                {/* Cards with hover effects and animation */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto"
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
                    {["AI Courses", "Interactive Projects", "Expert Guidance"].map((title, index) => (
                        <motion.div
                            key={index}
                            className="h-40 flex items-center justify-center"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="bg-white text-black p-4 rounded-xl shadow-lg relative overflow-hidden">
                                <CardContent className="flex items-center justify-center h-full text-center">
                                    <motion.h3
                                        className="text-xl font-semibold"
                                        whileHover={{ color: "#FFA500" }}
                                    >
                                        {title}
                                    </motion.h3>
                                </CardContent>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 opacity-0"
                                    whileHover={{ opacity: 0.2 }}
                                    transition={{ duration: 0.3 }}
                                ></motion.div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
