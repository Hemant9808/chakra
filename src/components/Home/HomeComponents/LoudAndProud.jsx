import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LoudAndProud = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  const articles = [
    { logo: "Outlook MONEY", text: "Takes the first step to normalize this taboo topic in society." },
    { logo: "Live Mint", text: "A brand dedicated to offering effective and stigma-free solutions." },
    { logo: "YOURSTORY", text: "Bold Care has become the go-to solution for men!" },
    { logo: "Inc42", text: "Bold Care is taking Bold Care of Men's Sexual Health and Wellness" },
  ];

  return (
    <section ref={ref} className="bg-gradient-to-b from-white to-gray-100 text-black py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading Animation */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Loud and Proud
        </motion.h2>

        {/* Animated Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {articles.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg text-center border border-gray-700 shadow-lg transform transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="text-xl font-semibold text-[#e5dac3] mb-3">{item.logo}</h3>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoudAndProud;
