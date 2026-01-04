import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Newspaper } from "lucide-react";

const LoudAndProud = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  const articles = [
    {
      logo: "Outlook MONEY",
      text: "Ayucan is taking the lead in wellness by addressing health with honesty and innovation."
    },
    {
      logo: "Live Mint",
      text: "A refreshing Ayurvedic brand with a modern touch — empowering holistic wellness."
    },
    {
      logo: "YOURSTORY",
      text: "A fast-growing brand redefining preventive care for the new generation."
    },
    {
      logo: "Inc42",
      text: "Blending traditional roots with scientific thinking — the future of health."
    },
  ];

  return (
    // Background: Cream
    <section ref={ref} className="bg-[#FDFBF7] py-20 px-4 relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#715036]/20 to-transparent"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading Animation */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-[#FDFBF7] rounded-full border border-[#715036]/20 flex items-center justify-center mx-auto mb-4 text-[#C17C3A]"
          >
            <Newspaper size={20} />
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            In The <span className="text-[#C17C3A] italic">Headlines</span>
          </motion.h2>
          <p className="text-[#715036]/70 max-w-2xl mx-auto font-medium">
            See what the industry is saying about our journey to redefine wellness.
          </p>
        </div>

        {/* Animated Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {articles.map((item, index) => (
            <motion.div
              key={index}
              // Card Style: White with Earthy Border & Shadow
              className="bg-white p-8 rounded-2xl text-center border border-[#715036]/10 shadow-sm hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 group flex flex-col justify-between h-full"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                {/* Logo Simulation - Using Typography since we don't have SVGs */}
                <h3 className="text-xl font-bold text-[#2A3B28] uppercase tracking-wider border-b-2 border-[#C17C3A]/20 pb-2 inline-block font-serif group-hover:text-[#C17C3A] group-hover:border-[#C17C3A] transition-colors">
                  {item.logo}
                </h3>
              </div>
              <p className="text-[#715036]/80 text-sm leading-relaxed italic">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoudAndProud;