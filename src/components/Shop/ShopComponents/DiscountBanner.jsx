import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const DiscountBanner = () => {
  return (
    // Background: Cream
    <div className="pt-32 flex justify-center bg-[#FDFBF7] items-center py-20 px-4 relative overflow-hidden">

      <motion.div
        // Card Background: Deep Forest Green (Changed from black to match comment)
        className="bg-black text-[#FDFBF7] flex flex-col md:flex-row items-center rounded-3xl shadow-2xl max-w-[90rem] w-full sm:w-[80rem] overflow-hidden border border-[#715036]/10 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Background Blur */}
        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-[#C17C3A]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side Text */}
        <div className="px-8 py-12 md:w-1/2 w-full text-center md:text-left relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
            <span className="text-[#C17C3A]">Wellness That Lasts Beyond Seasons.</span> <br />
            With <span className="text-white">AYUCAN HEALTHCARE!</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#FDFBF7]/80 font-medium italic">
            "Choose Ayucan and make wellness your everyday habit."
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 text-base font-medium">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C17C3A] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              Boost Energy
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C17C3A] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              Improve Stamina
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C17C3A] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              Enhance Wellness
            </div>
          </div>

          <button
            onClick={() => {
              window.scrollBy({
                top: 500,
                left: 0,
                behavior: 'smooth'
              });
            }}
            className="mt-10 px-8 py-4 bg-[#C17C3A] text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-[#a6662e] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Wellness Journey
          </button>
        </div>

        {/* Right Side Image - Increased Size */}
        <div className="md:w-3/5 w-full p-8 flex justify-center items-center relative z-10">
          {/* Optional: Radial gradient behind image to make it pop */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#ffffff]/5 to-transparent pointer-events-none"></div>
          <img
            src="/ResourseImages/shopImage.png"
            alt="Wellness Product"
            // Changed max-w-md to max-w-lg and added lg:max-w-xl for even larger screens
            className="w-full max-w-lg lg:max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DiscountBanner;