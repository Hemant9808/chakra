import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ankit Sharma",
    text: "I've tried multiple wellness brands, but Wellvas stands out. Their products feel authentic and effective!",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    text: "As someone who follows Ayurveda, I love the balance of tradition and modern science in their formulas.",
    rating: 4,
  },
  {
    name: "Rahul Verma",
    text: "The liver detox drops actually made a difference. Subtle yet powerful!",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  // Autoplay every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="py-14 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          What <span className="text-green-700">Our Customers Say</span>
        </h2>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-[#f6fdf5] rounded-2xl shadow-md p-6"
            >
              <div className="flex justify-center mb-2 text-green-600">
                {Array(testimonials[current].rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                      stroke="none"
                    />
                  ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">
                "{testimonials[current].text}"
              </p>
              <h4 className="text-sm font-semibold text-gray-900">
                – {testimonials[current].name}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current
                  ? "bg-green-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
