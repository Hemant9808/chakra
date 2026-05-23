import React from "react";
import { motion } from "framer-motion";

// Configuration for a soft, premium slide-fade transition
const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -12,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.25, // Quick and snappy for modern app feel
};

/**
 * Reusable Page Transition wrapper.
 * Integrates directly with Framer Motion AnimatePresence.
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
