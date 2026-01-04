import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    // Background: Cream
    <section ref={sectionRef} className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Our Purpose
          </span>
          <motion.h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
            Mission & <span className="italic text-[#C17C3A]">Vision</span>
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-[#715036]/80 mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Empowering lives with <span className="text-[#2A3B28] font-bold">natural wellness</span> solutions for a <span className="text-[#2A3B28] font-bold">healthier future</span>.
        </motion.p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Mission Card */}
          <motion.div
            className="bg-white border border-[#715036]/10 shadow-sm p-10 rounded-3xl text-center hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-2 group"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300 shadow-inner">
              <Target size={32} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-4 group-hover:text-[#C17C3A] transition-colors">Our Mission</h3>
            <p className="text-[#715036]/80 leading-relaxed font-medium">
              To provide <span className="text-[#2A3B28] font-bold">premium wellness products</span> that enhance everyday life with <span className="text-[#2A3B28] font-bold">natural healing and Ayurvedic wisdom</span>.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="bg-white border border-[#715036]/10 shadow-sm p-10 rounded-3xl text-center hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-2 group"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300 shadow-inner">
              <Eye size={32} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-4 group-hover:text-[#C17C3A] transition-colors">Our Vision</h3>
            <p className="text-[#715036]/80 leading-relaxed font-medium">
              To be a <span className="text-[#2A3B28] font-bold">global leader in holistic wellness</span>, promoting <span className="text-[#2A3B28] font-bold">sustainable health solutions</span> through innovation.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;