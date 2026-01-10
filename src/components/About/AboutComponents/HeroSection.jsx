import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      // Replace with your high-quality hero image
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >

      {/* Brand Overlay: Deep Forest Green Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A3B28]/70 via-[#2A3B28]/50 to-[#2A3B28]/80"></div>

      {/* Decorative Blur Element */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C17C3A]/30 rounded-full blur-[100px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">

        {/* Bold Tagline Statement */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-4xl md:text-5xl font-serif font-bold text-[#FDFBF7] tracking-tight">
            Ayurveda <span className="italic text-[#F7941D]">Can.</span>
          </p>
        </motion.div>

        {/* Subheading / Tagline */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-[#C17C3A] font-bold text-sm md:text-base uppercase tracking-[0.3em] inline-block bg-[#2A3B28]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#FDFBF7]/10 shadow-xl">
            Ancient Wisdom, Modern Living
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-bold mb-6 text-[#FDFBF7] leading-tight drop-shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Elevate Your Wellness <br />
          <span className="italic text-[#C17C3A]">Naturally.</span>
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          className="text-lg md:text-xl mb-10 text-[#FDFBF7]/90 max-w-2xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover 100% natural Ayurvedic formulations designed to restore balance, boost vitality, and nurture your lifestyle.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="/shop/all"
            className="group inline-flex items-center gap-3 bg-[#C17C3A] hover:bg-[#a6662e] text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest text-sm"
          >
            Explore Products
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

      </div>

      {/* Scroll Indicator (Optional) */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#FDFBF7]/50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FDFBF7] to-transparent"></div>
      </motion.div>

    </section>
  );
};

export default HeroSection;