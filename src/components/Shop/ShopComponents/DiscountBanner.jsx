import React from "react";
import { motion } from "framer-motion";

const DiscountBanner = () => {
  return (
    <div className="flex justify-center bg-white items-center py-10 px-4">
      <motion.div
        className="bg-black text-white flex flex-col sm:flex-row items-center rounded-xl shadow-xl max-w-[90rem] w-full sm:w-[80rem] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side Text */}
        <div className="px-6 py-8 sm:w-1/2 w-full text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
            <span className="text-yellow-400">Wellness That Lasts Beyond Seasons.</span> With <span className="text-yellow-400">WELLVAS HEALTHCARE !</span>
          </h2>

          {/* <p className="mt-2 text-sm sm:text-base text-gray-300">
            Use code <span className="font-semibold text-white bg-yellow-400 text-black px-2 py-1 rounded-md">WELL15</span> at checkout. <br />
            Applicable on orders above ₹1500.
          </p> */}
           <p className="mt-2 text-sm sm:text-base text-gray-300">
            "Choose Wellvas and make wellness your everyday habit."<br />
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-6 text-base sm:text-lg">
            <div>
              <span className="font-bold text-yellow-400">✔</span> Boost Energy
            </div>
            <div>
              <span className="font-bold text-yellow-400">✔</span> Improve Stamina
            </div>
            <div>
              <span className="font-bold text-yellow-400">✔</span> Enhance Wellness
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
            className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-all duration-200"
          >
            Start Your Wellness Journey
          </button>
        </div>

        {/* Right Side Image */}
        <div className="sm:w-1/2 w-full overflow-visible flex justify-center p-4">
          <img
            src="/ResourseImages/shopImage.png"
            alt="Discount Product"
            className="w-full sm:w-full md:w-full object-contain rounded-lg shadow-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DiscountBanner;
