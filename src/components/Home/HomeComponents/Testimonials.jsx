import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ankit Sharma",
    text: "I've tried multiple wellness brands, but Ayucan stands out. Their products feel authentic and effective!",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    text: "As someone who follows Ayurveda, I love the balance of tradition and modern science in their formulas.",
    rating: 4,
  },
  {
    name: "Rahul Verma",
    text: "The liver detox Tablets actually made a difference. Subtle yet powerful!",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);

  // Autoplay every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    // Background: Cream
    <section className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C17C3A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] mb-12">
          Stories of <span className="text-[#C17C3A] italic">Wellness</span>
        </h2>

        <div className="relative min-h-[280px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg border border-[#715036]/10 p-8 md:p-10 relative"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 left-6 text-[#C17C3A]/20">
                <Quote size={48} fill="currentColor" stroke="none" />
              </div>

              <div className="flex flex-col items-center">
                {/* Stars */}
                <div className="flex justify-center mb-6 space-x-1 text-[#C17C3A]">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonials[current].rating ? "currentColor" : "none"}
                      stroke={i < testimonials[current].rating ? "none" : "currentColor"}
                      className={i < testimonials[current].rating ? "" : "text-gray-300"}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#2A3B28]/80 text-lg md:text-xl mb-6 italic font-medium leading-relaxed max-w-2xl">
                  "{testimonials[current].text}"
                </p>

                {/* Name */}
                <h4 className="text-base font-bold text-[#715036] uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#C17C3A]"></span>
                  {testimonials[current].name}
                  <span className="w-8 h-[1px] bg-[#C17C3A]"></span>
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === current
                  ? "w-8 bg-[#2A3B28]"
                  : "w-2 bg-[#715036]/30 hover:bg-[#C17C3A]"
                }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}