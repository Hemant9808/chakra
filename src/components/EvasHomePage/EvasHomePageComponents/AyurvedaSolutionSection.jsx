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
    // Background: Cream
    <section className="relative py-24 bg-[#FDFBF7] overflow-hidden">

      {/* Aura Glow Blobs - Updated to Brand Colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C17C3A] opacity-10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2A3B28] opacity-10 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Ancient Wisdom
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
            The Ancient Science of <br /> <span className="italic text-[#C17C3A]">Peak Male Vitality</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl text-[#715036]/80 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Ayucan integrates Ayurvedic science with Kamasutra-based pleasure
            optimization.
          </motion.p>
        </motion.div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* COLUMN 1 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white rounded-3xl shadow-xl transform-gpu flex flex-col"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/problem.png"
              alt="Shukra Dhatu depletion"
              className="rounded-xl shadow-sm mb-6 mx-auto w-full object-cover max-h-48"
            />

            <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-3">
              The Problem: <br /> <span className="text-[#C17C3A]">Shukra Dhatu Depletion</span>
            </h3>

            <p className="text-[#715036]/80 mb-4 leading-relaxed text-sm">
              Stress, poor diet and excess <i>Vata</i> weaken tissue transformation,
              reducing stamina, libido and performance.
            </p>

            <p className="font-bold text-xs text-[#2A3B28] uppercase tracking-wider mt-auto border-t border-[#715036]/10 pt-4">
              Imbalance begins before symptoms appear.
            </p>
          </motion.div>

          {/* COLUMN 2 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white rounded-3xl shadow-xl transform-gpu flex flex-col"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/solution.png"
              alt="Vajikarana Therapy"
              className="rounded-xl shadow-sm mb-6 mx-auto w-full object-cover max-h-48"
            />

            <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-3">
              The Solution: <br /> <span className="text-[#C17C3A]">90-Day Vajikarana</span>
            </h3>

            <p className="text-[#715036]/80 mb-4 leading-relaxed text-sm">
              The Ayurvedic science of rejuvenation that rebuilds <i>Shukra Dhatu</i>
              for long-term vitality.
            </p>

            <ul className="space-y-2 mt-auto border-t border-[#715036]/10 pt-4">
              {['Purifies absorption channels', 'Nourishes core Dhatus', 'Rebuilds reproductive tissue'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#2A3B28] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C17C3A]"></span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3 */}
          <motion.div
            variants={hover3D}
            initial="initial"
            whileHover="hover"
            className="p-8 gradient-border backdrop-blur-xl bg-white rounded-3xl shadow-xl transform-gpu flex flex-col"
          >
            <motion.img
              variants={floating}
              animate="animate"
              src="./ResourseImages/evas.jpg"
              alt="Evas Supplements"
              className="rounded-xl shadow-sm mb-6 mx-auto w-full object-cover max-h-48"
            />

            <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-3">
              The Ayucan Method: <br /> <span className="text-[#C17C3A]">Evas Trio + Kama</span>
            </h3>

            <p className="text-[#715036]/80 mb-4 leading-relaxed text-sm">
              Purification → Nourishment → Rebuilding — completed with immediate
              sensory enhancement via Potency Oil.
            </p>

            {/* Tagline Statement */}
            <p className="font-bold text-sm text-[#2A3B28] mt-auto border-t border-[#715036]/10 pt-4 italic">
              Ayurveda <span className="text-[#F7941D] not-italic">Can.</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* GLOBAL STYLING (Updated to Brand Colors) */}
      <style>{`
        .gradient-border {
          border: 1px solid transparent;
          background: linear-gradient(#ffffff, #ffffff) padding-box,
                      linear-gradient(135deg, #2A3B28, #C17C3A) border-box;
        }
      `}</style>
    </section>
  );
}