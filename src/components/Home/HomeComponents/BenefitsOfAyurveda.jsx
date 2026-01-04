import { motion } from "framer-motion";
import { Shield, Flame, Leaf, RefreshCw } from "lucide-react";

export default function BenefitsOfAyurveda() {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6 text-[#C17C3A]" />,
      title: "Natural Healing",
      desc: "Harness the power of herbs and plants for holistic wellness.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#C17C3A]" />,
      title: "Detox & Balance",
      desc: "Cleanse your body and restore natural balance.",
    },
    {
      icon: <Flame className="w-6 h-6 text-[#C17C3A]" />,
      title: "Energy & Vitality",
      desc: "Boost stamina and feel rejuvenated every day.",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#C17C3A]" />,
      title: "Immunity Support",
      desc: "Strengthen your body’s defense system naturally.",
    },
  ];

  return (
    // Background: Cream
    <section className="w-full bg-[#FDFBF7] py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Video */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative p-2 rounded-3xl border border-[#715036]/10 bg-white shadow-xl">
            <video
              src="/ResourseImages/Benefitsvideo.mp4" // Ensure path is correct in public folder
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-md aspect-[8/8] object-cover rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Right Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-10 text-left">
            <span className="text-[#C17C3A] font-bold text-sm uppercase tracking-widest block mb-2">Why Ayucan?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28]">
              Benefits of Ayurveda
            </h2>
          </div>

          <ul className="space-y-8">
            {benefits.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-5 group"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm border border-[#715036]/10 group-hover:border-[#C17C3A]/50 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-1 group-hover:text-[#C17C3A] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#715036]/80 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}