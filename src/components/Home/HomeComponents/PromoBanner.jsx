import React from "react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";


const PromoBanner = () => {
  return (
    <div className="flex justify-center bg-white items-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-black flex sm:flex-row flex-col text-white rounded-xl items-center max-w-[90%] w-[80rem] h-full p-6 shadow-lg"
      >
        {/* Left Side Text */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="px-6 sm:w-1/2 w-full"
        >
          <h2 className="sm:text-3xl w-full sm:text-left text-center text-xl font-bold">
            India’s <span className="text-yellow-400">1st</span> All-In-One Nutrition
          </h2>
          <div className="flex-wrap flex gap-6 mt-4 text-lg">
            <div>
              <span className="font-bold">25g</span> <br /> Whey Isolate
            </div>
            <div>
              <span className="font-bold">5 Bn</span> <br /> CFU Probiotics
            </div>
            <div>
              <span className="font-bold">27</span> <br /> Vitamins & Minerals
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 mb-7 px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 " onClick={() => navigate("/shop")}
          >
           <Link to="/shop">
              Shop Now
           </Link>

          </motion.button>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full sm:w-1/2 mt-6 sm:mt-0"
        >
          <img
            src="https://cdn.pixabay.com/photo/2023/11/10/16/36/shilajit-products-8379708_1280.jpg"
            alt="CharakWellness Super Blend"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
