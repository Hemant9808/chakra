import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <motion.div
        className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner; 