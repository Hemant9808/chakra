import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MensWellnessImage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-25 rounded-4xl overflow-hidden" onClick={() => navigate("/evas")}>
        
      {/* ⭐ Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        
        <motion.img
          src="/ResourseImages/promo3Mob.jpg"
          alt="Men's Wellness"
          whileHover={{ scale: 1.05, opacity: 1 }}
          initial={{ scale: 1.2, opacity: 0.4 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* 🔥 Foreground Content */}
      <div className="relative z-10 text-center bottom-5 flex justify-center py-24"></div>

    </section>
  );
};

export default MensWellnessImage;
