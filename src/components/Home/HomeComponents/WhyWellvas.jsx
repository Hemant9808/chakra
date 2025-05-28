import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FlaskConical, Leaf } from "lucide-react";

const pillars = [
  {
    icon: <CheckCircle size={36} className="text-green-600" />,
    title: "Trusted Quality",
    description: "Only premium-grade ingredients with guaranteed purity and potency.",
  },
  {
    icon: <Leaf size={36} className="text-green-600" />,
    title: "Rooted in Ayurveda",
    description: "Traditional Ayurvedic science blended with modern wellness needs.",
  },
  {
    icon: <FlaskConical size={36} className="text-green-600" />,
    title: "Clinically Tested",
    description: "Lab-tested, FSSAI-certified formulas for safe and effective results.",
  },
];

export default function WhyWellvas() {
  return (
    <section className="py-14 px-6 md:px-12 bg-[#f6fdf5]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Why <span className="text-green-700">Wellvas</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
