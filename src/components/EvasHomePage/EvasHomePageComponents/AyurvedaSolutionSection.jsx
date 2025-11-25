import { motion } from "framer-motion";
import { useEffect } from "react";

const floating = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const hover3D = {
  initial: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: 6,
    rotateY: -6,
    scale: 1.04,
    transition: { duration: 0.4 },
  },
};

export default function AyurvedaSolutionSection() {
  // ⛰️ Parallax Logic (React-safe)
  useEffect(() => {
    const handleScroll = () => {
      const layers = document.querySelectorAll(".parallax-layer");
      layers.forEach((el, i) => {
        const speed = (i + 1) * 10;
        el.style.transform = `translateY(${window.scrollY / speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Aura Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-4"
        >
          The Ancient Science of Peak Male Vitality
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          Wellvas integrates Ayurvedic science with Kamasutra-based pleasure
          optimization.
        </motion.p>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLUMN 1 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl transform-gpu"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/problem.png"
              alt="Shukra Dhatu depletion"
              className="rounded-lg shadow-md mb-5 mx-auto"
            />

            <h3 className="text-2xl font-bold text-red-600 mb-3">
              The Problem: Shukra Dhatu Depletion
            </h3>

            <p className="text-gray-700 mb-4">
              Stress, poor diet and excess *Vata* weaken tissue transformation,
              reducing stamina, libido and performance.
            </p>

            <p className="font-semibold text-sm text-red-500">
              The imbalance begins long before symptoms appear.
            </p>
          </motion.div>

          {/* COLUMN 2 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl transform-gpu"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/solution.png"
              alt="Vajikarana Therapy"
              className="rounded-lg shadow-md mb-5 mx-auto"
            />

            <h3 className="text-2xl font-bold text-green-700 mb-3">
              The Solution: 90-Day Vajikarana
            </h3>

            <p className="text-gray-700 mb-4">
              The Ayurvedic science of rejuvenation that rebuilds *Shukra Dhatu*
              for long-term vitality.
            </p>

            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Purifies absorption channels</li>
              <li>Nourishes core Dhatus</li>
              <li>Rebuilds reproductive tissue</li>
            </ul>
          </motion.div>

          {/* COLUMN 3 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl transform-gpu"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/evas.jpg"
              alt="Evas Supplements"
              className="rounded-lg shadow-md mb-5 mx-auto"
            />

            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              The Wellvas Method: Evas Trio + Kama
            </h3>

            <p className="text-gray-700 mb-4">
              Purification → Nourishment → Rebuilding — completed with immediate
              sensory enhancement via Potency Oil.
            </p>
          </motion.div>
        </div>
      </div>

      {/* GLOBAL STYLING (safe for React) */}
      <style>{`
        .gradient-border {
          border: 2px solid transparent;
          background: linear-gradient(#ffffff, #ffffff) padding-box,
                      linear-gradient(135deg, #ff4d4d, #4d79ff, #00e6ac) border-box;
        }
      `}</style>
    </section>
  );
}
