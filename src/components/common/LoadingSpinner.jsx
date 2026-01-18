import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] ${className}`}>

      {/* 1. Logo Animation: Zooms in ONCE */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
        className="relative mb-8"
      >
        <img
          src="/ResourseImages/logo.png"
          alt="Loading..."
          className="w-40 h-40 object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* 2. Horizontal Loading Bar: Appears after logo zoom */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "200px" }} // Fixed width for the bar container
        transition={{ delay: 0.6, duration: 0.5 }}
        className="h-1.5 bg-[#715036]/10 rounded-full overflow-hidden relative"
      >
        {/* The moving fill animation */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#C17C3A] rounded-full"
          initial={{ x: "-100%", width: "50%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Tagline (Fade in) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-2xl md:text-3xl font-serif font-bold text-[#2A3B28] tracking-tight">
          Ayurveda <span className="italic text-[#F7941D]">Can.</span>
        </p>
      </motion.div>

    </div>
  );
};

export default LoadingSpinner;