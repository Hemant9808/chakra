import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const offerings = [
  {
    title: "Herbal Supplements",
    description: "Pure and natural herbal products to boost your overall well-being.",
    icon: "🌿",
  },
  {
    title: "Men’s Wellness",
    description: "Scientifically formulated products for men’s health and vitality.",
    icon: "💪",
  },
  {
    title: "Protein & Fitness",
    description: "High-quality protein bars, drinks, and supplements for active lifestyles.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Ayurvedic Solutions",
    description: "Ancient Ayurveda blended with modern science for holistic healing.",
    icon: "🧘‍♂️",
  },
];

const WhatWeOffer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}>
          What We Offer
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          Discover our range of **wellness products**, designed to enhance your **health and lifestyle**.
        </motion.p>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offer, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}>
              <div className="text-5xl mb-4">{offer.icon}</div>
              <h3 className="text-2xl font-semibold">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
