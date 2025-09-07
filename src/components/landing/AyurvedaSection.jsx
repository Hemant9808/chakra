import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AyurvedaSection() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-[#141b29] text-white py-16 px-6">
        {/* Hero Row */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-300">
              ✨ Empowering Wellness Through Ayurveda ✨
            </h1>
            <p className="text-lg text-blue-100">
              Premium, science-backed Ayurvedic supplements crafted to restore
              your balance and boost vitality.
            </p>

            {/* Animated Shop Now Button */}
            <motion.button
              onClick={() => navigate("/shop/all")}
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Shop Now
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/ResourseImages/page1.png"
              alt="Ayurvedic Ingredients"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
        </div>

        {/* What is Ayurveda Section */}
        <div className="mt-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-blue-200 flex items-center gap-2">
              🌿 What is Ayurveda?
            </h2>

            <div className="bg-[#2a2f38] p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-1">Ancient Wisdom</h3>
              <p className="text-gray-300 text-sm">
                A 5,000-year-old holistic healing system from India focused on
                natural balance.
              </p>
            </div>

            <div className="bg-[#2a2f38] p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-1">Mind, Body & Spirit</h3>
              <p className="text-gray-300 text-sm">
                Ayurveda nurtures harmony among your physical, mental, and
                spiritual health.
              </p>
            </div>

            <div className="bg-[#2a2f38] p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-1">Three Doshas</h3>
              <ul className="text-sm text-gray-300 list-disc list-inside">
                <li>Vata: Energy of movement</li>
                <li>Pitta: Energy of transformation</li>
                <li>Kapha: Energy of stability</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/ResourseImages/page2.jpg"
              alt="Ayurvedic Background"
              className="rounded-xl shadow-xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Science Section */}
      <section className="bg-blue-400 text-black py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-10 flex justify-center items-center gap-2"
          >
            🔬 The Science Behind Our Supplements
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-left"
          >
            <div>
              <h3 className="font-semibold text-xl mb-2">Ashwagandha Research</h3>
              <p className="text-sm">
                Clinical studies reveal it reduces stress by up to 69%, enhancing
                calm and focus.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Turmeric Benefits</h3>
              <p className="text-sm">
                Curcumin, the active compound, offers potent anti-inflammatory and
                antioxidant effects supported by numerous trials.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Trusted Science</h3>
              <p className="text-sm">
                Our formulas combine traditional knowledge with modern clinical
                evidence for effective wellness support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
