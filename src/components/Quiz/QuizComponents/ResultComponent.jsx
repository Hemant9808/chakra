// src/components/ResultComponent.js

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertTriangle, FiAlertCircle } from "react-icons/fi";

// --- Data for each wellness zone ---
const zoneDetails = {
  optimal: {
    name: "Optimal Zone",
    color: "#22c55e", // green-500
    Icon: FiCheckCircle,
    description: "Your wellness is in great shape. Your lifestyle choices are positively impacting your overall well-being and vitality.",
    recommendations: [
      "Maintain your balanced nutrition and hydration.",
      "Continue with your regular physical activity.",
      "Keep prioritizing consistent, quality sleep.",
    ],
  },
  gamma: {
    name: "Gamma Zone",
    color: "#f59e0b", // amber-500 (more visible than yellow on white)
    Icon: FiAlertTriangle,
    description: "Your health needs some attention. Lifestyle and environmental factors might be causing mild stress on your system.",
    recommendations: [
      "Focus on stress management techniques like mindfulness.",
      "Review your diet to reduce processed foods and sugar.",
      "Aim for 7-9 hours of uninterrupted sleep per night.",
    ],
  },
  beta: {
    name: "Beta Zone",
    color: "#ef4444", // red-500
    Icon: FiAlertCircle,
    description: "Your wellness is below optimal and requires proactive attention. It's important to understand and address the underlying causes.",
    recommendations: [
      "Consider consulting a healthcare professional for guidance.",
      "Critically evaluate your daily stress, diet, and sleep patterns.",
      "Incorporate gentle, daily movement like walking or stretching.",
    ],
  },
};

const getZone = (score) => {
  if (score >= 8) return zoneDetails.optimal;
  if (score >= 5) return zoneDetails.gamma;
  return zoneDetails.beta;
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};


const ResultComponent = ({ score, onRetake }) => {
  const zone = getZone(score);
  const { Icon } = zone;

  return (
    // Main full-screen container with white background
    <motion.div 
      className="w-full min-h-screen bg-white flex flex-col justify-center items-center p-6 md:p-12 text-gray-800" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-10 md:mb-16 text-center text-gray-900"
        >
          Your Wellness Score
        </motion.h2>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
            {/* Left Column: Score + CTA Button */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-10">
                <div className="w-64 h-64 lg:w-80 lg:h-80 relative">
                    <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-gray-200" cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="22" fill="none" />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="120"
                        stroke={zone.color}
                        strokeWidth="22"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={754} // 2 * PI * 120
                        initial={{ strokeDashoffset: 754 }}
                        animate={{ strokeDashoffset: 754 - (754 * score) / 10 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-7xl font-bold text-gray-900">{score}<span className="text-4xl text-gray-500">/10</span></span>
                        <span className="text-lg text-gray-600 mt-1 font-medium">Total Score</span>
                    </div>
                </div>
                 <motion.button
                    onClick={onRetake}
                    className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Retake Quiz
                </motion.button>
            </motion.div>

            {/* Right Column: Details */}
            <motion.div variants={itemVariants} className="text-center lg:text-left max-w-xl flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Icon style={{ color: zone.color }} size={40} />
                <h3 className="text-4xl font-bold" style={{ color: zone.color }}>
                    {zone.name}
                </h3>
                </div>
                <p className="text-lg text-gray-700 mb-8">{zone.description}</p>
                
                <h4 className="font-semibold text-gray-900 text-xl mb-4">Our Recommendations:</h4>
                <ul className="space-y-3 text-left">
                {zone.recommendations.map((rec, index) => (
                    <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                        <FiCheckCircle style={{ color: zone.color }} className="mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700 text-lg">{rec}</span>
                    </motion.li>
                ))}
                </ul>
            </motion.div>
        </div>
    </motion.div>
  );
};

export default ResultComponent;