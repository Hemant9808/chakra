import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FlaskConical, Leaf } from "lucide-react";

const pillars = [
  {
    icon: <CheckCircle size={40} strokeWidth={1.5} />,
    title: "Trusted Quality",
    description: "Only premium-grade ingredients with guaranteed purity and potency.",
  },
  {
    icon: <Leaf size={40} strokeWidth={1.5} />,
    title: "Rooted in Ayurveda",
    description: "Traditional Ayurvedic science blended with modern wellness needs.",
  },
  {
    icon: <FlaskConical size={40} strokeWidth={1.5} />,
    title: "Clinically Tested",
    description: "Lab-tested, FSSAI-certified formulas for safe and effective results.",
  },
];

export default function WhyAyucan() {
  return (
    // Background: Cream
    <section className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C17C3A]/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] mb-4">
          The <span className="text-[#C17C3A]">Ayucan</span> Promise
        </h2>
        <div className="h-1 w-24 bg-[#C17C3A] mx-auto rounded-full mb-12"></div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              // Card Style: White with subtle border and shadow
              className="bg-white rounded-3xl shadow-sm border border-[#715036]/10 p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-[#C17C3A]/30 group"
            >
              <div className="mb-6 p-4 bg-[#FDFBF7] rounded-full text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-500 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-3 group-hover:text-[#C17C3A] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#715036]/80 text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}