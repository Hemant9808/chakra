import React from "react";
import { FaUserMd, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductBanner = () => {
  const navigate = useNavigate();

  return (
    // Background: Deep Forest Green
    <section className="pt-30 bg-[#2A3B28] py-20 px-6 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FDFBF7]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#C17C3A]/20 text-[#C17C3A] border border-[#C17C3A]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <FaUserMd /> Expert Care
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#FDFBF7] mb-6 leading-tight">
            Wellness questions? <br />
            <span className="text-[#C17C3A]">Ask the experts.</span>
          </h2>

          <p className="text-[#FDFBF7]/80 text-lg mb-8 leading-relaxed max-w-md">
            Our network of Ayurvedic practitioners is here to guide you on your journey to holistic health. Personalized advice, rooted in tradition.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="group bg-[#FDFBF7] text-[#2A3B28] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-[#C17C3A] hover:text-white transition-all duration-300 flex items-center gap-3 w-fit"
          >
            Consult Now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-1/2 flex justify-center md:justify-end relative"
        >
          {/* Image Frame/Backdrop */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#C17C3A] rounded-3xl rotate-3 opacity-20 scale-105 blur-sm"></div>
            <img
              src="/ResourseImages/doctor.png"
              alt="Ayurvedic Expert"
              className="relative z-10 max-w-sm w-full rounded-3xl shadow-2xl border border-[#FDFBF7]/10"
            />

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-[#FDFBF7] p-4 rounded-2xl shadow-xl border border-[#715036]/10 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-[#2A3B28] p-3 rounded-full text-white">
                <FaUserMd size={20} />
              </div>
              <div>
                <p className="text-[#2A3B28] font-bold text-sm">Verified Experts</p>
                <p className="text-[#715036] text-xs">Ayurveda Certified</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductBanner;