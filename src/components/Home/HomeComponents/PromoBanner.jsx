import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row bg-black text-white rounded-2xl max-w-7xl w-full overflow-hidden shadow-xl"
      >
        {/* Image Section */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="sm:w-1/2 w-full order-2 sm:order-1"
        >
          {/* <img
            src="https://cdn.pixabay.com/photo/2023/11/10/16/36/shilajit-products-8379708_1280.jpg"
            alt="Wellvas Nutrition"
            className="w-full p-7 h-full object-cover"
          /> */}
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="sm:w-1/2 w-full p-8 order-1 sm:order-2 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-extrabold leading-tight text-[#fbe14b]">
            Fuel Your Day with Ayurveda-Powered Wellness
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Packed with clinically-backed ingredients, Wellvas brings you India’s smartest blend of ancient adaptogens and modern nutrition. Engineered for energy, gut health, and performance.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-300">
            <li><strong>24g</strong> Ayurvedic Protein Complex</li>
            <li><strong>6B CFU</strong> Gut-friendly Probiotics</li>
            <li><strong>28</strong> Essential Vitamins & Minerals</li>
          </ul>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300"
            >
              Explore Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
