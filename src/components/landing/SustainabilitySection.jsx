import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Eco-friendly Packaging",
    description:
      "Our containers are fully recyclable and biodegradable to reduce waste.",
  },
  {
    title: "Ethical Sourcing",
    description:
      "We partner with fair trade farms focused on responsible practices and community uplift.",
  },
  {
    title: "Giving Back",
    description:
      "A portion of proceeds supports health initiatives in rural communities grown through Ayurveda.",
  },
];

export default function SustainabilitySection() {
  return (
    <section className="bg-blue-400 text-black py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 flex items-center justify-center gap-3"
        >
          ❤️ Our Commitment to Sustainability
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-900 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
