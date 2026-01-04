import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Activity, Dumbbell, Flower2 } from "lucide-react";

const offerings = [
  {
    title: "Herbal Supplements",
    description: "Pure and natural herbal products to boost your overall well-being.",
    icon: <Leaf size={36} strokeWidth={1.5} />,
  },
  {
    title: "Men’s Wellness",
    description: "Scientifically formulated products for men’s health and vitality.",
    icon: <Activity size={36} strokeWidth={1.5} />,
  },
  {
    title: "Protein & Fitness",
    description: "High-quality supplements designed for active, energetic lifestyles.",
    icon: <Dumbbell size={36} strokeWidth={1.5} />,
  },
  {
    title: "Ayurvedic Solutions",
    description: "Ancient Ayurveda blended with modern science for holistic healing.",
    icon: <Flower2 size={36} strokeWidth={1.5} />,
  },
];

const WhatWeOffer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    // Background: Cream
    <section ref={sectionRef} className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C17C3A]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
            What We <span className="italic text-[#C17C3A]">Offer</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-[#715036]/80 mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover our range of <span className="text-[#2A3B28] font-bold">wellness products</span>, meticulously crafted to enhance your <span className="text-[#2A3B28] font-bold">health and lifestyle</span>.
        </motion.p>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offer, index) => (
            <motion.div
              key={index}
              className="bg-white border border-[#715036]/10 shadow-sm p-8 rounded-3xl hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center text-center h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-6 text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300 shadow-inner">
                {offer.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-3 group-hover:text-[#C17C3A] transition-colors">
                {offer.title}
              </h3>
              <p className="text-[#715036]/80 text-sm leading-relaxed font-medium">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;