import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    text: "Improved sleep quality and reduced anxiety thanks to Wellvas Ashwagandha.",
    align: "left",
  },
  {
    id: 2,
    name: "John B.",
    text: "Noticeable positive difference in my digestion using Triphala supplements.",
    align: "right",
  },
  {
    id: 3,
    name: "Priya K.",
    text: "Turmeric formula helped ease my joint inflammation and boost immunity.",
    align: "left",
  },
];

export default function TestimonialsTimeline() {
  return (
    <section className="bg-[#141b29] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-blue-300 mb-16 flex items-center justify-center gap-3"
        >
          🙌 Real People, Real Results
        </motion.h2>

        <div className="relative flex flex-col items-center">
          {/* Vertical Line */}
          <div className="absolute w-[2px] bg-gray-600 h-full left-1/2 transform -translate-x-1/2" />

          <div className="space-y-20 w-full">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative flex justify-center items-center gap-6"
              >
                {/* Left-aligned testimonial */}
                {t.align === "left" ? (
                  <>
                    <div className="w-[40%] text-right">
                      <p className="font-semibold mb-1">{t.name}</p>
                      <p className="text-sm text-gray-100 max-w-md ml-auto">
                        “{t.text}”
                      </p>
                    </div>
                    <div className="z-10 w-8 h-8 bg-[#2f3642] text-white rounded flex items-center justify-center font-bold shadow-md">
                      {t.id}
                    </div>
                    <div className="w-[40%]"></div>
                  </>
                ) : (
                  <>
                    <div className="w-[40%]"></div>
                    <div className="z-10 w-8 h-8 bg-[#2f3642] text-white rounded flex items-center justify-center font-bold shadow-md">
                      {t.id}
                    </div>
                    <div className="w-[40%] text-left">
                      <p className="font-semibold mb-1">{t.name}</p>
                      <p className="text-sm text-gray-100 max-w-md">
                        “{t.text}”
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
