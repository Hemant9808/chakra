import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MissionVision = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}>
          Our Mission & Vision
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          Empowering lives with **natural wellness** solutions for a **healthier future**.
        </motion.p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            className="bg-gray-100 shadow-md p-6 rounded-xl text-center hover:shadow-xl transition transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold mb-3">🌟 Our Mission</h3>
            <p className="text-gray-600">
              To provide **premium wellness products** that enhance everyday life with **natural healing and Ayurvedic wisdom**.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="bg-gray-100 shadow-md p-6 rounded-xl text-center hover:shadow-xl transition transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <h3 className="text-2xl font-semibold mb-3">🚀 Our Vision</h3>
            <p className="text-gray-600">
              To be a **global leader in holistic wellness**, promoting **sustainable health solutions** through innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
