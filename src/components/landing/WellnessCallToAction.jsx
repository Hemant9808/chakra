import React from "react";
import { motion } from "framer-motion";

export default function WellnessCallToAction() {
  return (
    <section className="bg-[#141b29] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <img
            src="/ResourseImages/page3.jpg"
            alt="Meditation at Sunset"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-blue-300 mb-4">
            Ready to Rediscover Wellness?
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Transform your health today with Ayucan Ayurvedic supplements. Act
            now and enjoy a limited-time 15% discount using code{" "}
            <span className="font-semibold text-white">AYUCAN15</span>. For
            deeper insights, explore our blog filled with Ayurvedic wisdom and
            tips.
          </p>
          <button onClick={() => window.location.href = '/shop/all'} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-md">
            Shop Now and Transform Your Health
          </button>
        </motion.div>
      </div>
    </section>
  );
}
