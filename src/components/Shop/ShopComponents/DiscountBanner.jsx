import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ResponsiveImage from "../../common/ResponsiveImage";

const DiscountBanner = () => {
  return (
    // Background: Cream
    <div className="pt-5 md:pt-10 flex justify-center bg-[#FDFBF7] items-center pb-2 md:py-20 px-3 md:px-4 relative overflow-hidden">

      <motion.div
        className="bg-black text-[#FDFBF7] flex flex-row md:flex-row items-stretch rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-[90rem] overflow-hidden border border-[#715036]/10 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Background Blur */}
        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-[#C17C3A]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side Text */}
        <div className="px-5 py-7 md:px-8 md:py-12 w-3/5 md:w-1/2 text-left relative z-10 flex flex-col justify-center">

          {/* Eyebrow label on mobile */}
          <span className="text-[#C17C3A] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 block">
            Ayucan Healthcare
          </span>

          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold leading-snug mb-2 md:mb-4">
            <span className="text-[#C17C3A]">Wellness That Lasts<br className="hidden sm:block" /> Beyond Seasons.</span>{" "}
            <span className="text-white text-base sm:text-xl md:text-4xl lg:text-5xl">With AYUCAN!</span>
          </h2>

          <p className="hidden md:block mt-2 text-base text-[#FDFBF7]/80 font-medium italic">
            "Choose Ayucan and make wellness your everyday habit."
          </p>

          {/* Trust badges — compact on mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mt-4 md:mt-6 text-xs md:text-sm font-medium">
            {["Boost Energy", "Improve Stamina", "Enhance Wellness"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#C17C3A] text-white flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span className="text-[11px] md:text-sm whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              window.scrollBy({ top: 500, left: 0, behavior: 'smooth' });
            }}
            className="mt-5 md:mt-8 self-start px-4 py-2.5 md:px-8 md:py-4 bg-[#C17C3A] text-white font-bold text-[11px] md:text-sm uppercase tracking-widest rounded-full hover:bg-[#a6662e] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>

        {/* Right Side Image */}
        <div className="w-2/5 md:w-1/2 relative flex justify-center items-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[#ffffff]/5 to-transparent pointer-events-none"></div>

          {/* Mobile Image — swap src to a portrait/square crop later */}
          <ResponsiveImage
            src="/ResourseImages/shop.jpg"
            alt="Wellness Product"
            className="block md:hidden w-full h-full object-cover object-bottom drop-shadow-2xl"
            sizes="40vw"
          />

          {/* Desktop Image — swap src to a wider landscape version later */}
          <ResponsiveImage
            src="/ResourseImages/shop.jpg"
            alt="Wellness Product"
            className="hidden md:block w-full object-contain object-center drop-shadow-2xl hover:scale-105 transition-transform duration-500 max-w-lg lg:max-w-xl p-8"
            sizes="50vw"
          />
        </div>

      </motion.div>
    </div>
  );
};

export default DiscountBanner;