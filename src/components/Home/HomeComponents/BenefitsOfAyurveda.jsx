import { motion } from "framer-motion";
import { Shield, Flame, Leaf, RefreshCw } from "lucide-react";

export default function BenefitsOfAyurveda() {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Natural Healing",
      desc: "Harness the power of herbs and plants for holistic wellness.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-green-600" />,
      title: "Detox & Balance",
      desc: "Cleanse your body and restore natural balance.",
    },
    {
      icon: <Flame className="w-6 h-6 text-green-600" />,
      title: "Energy & Vitality",
      desc: "Boost stamina and feel rejuvenated every day.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Immunity Support",
      desc: "Strengthen your body’s defense system naturally.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-green-50 to-green-100 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Video */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <video
            src="../../ResourseImages/Benefitsvideo.mp4" // replace with your video path
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md aspect-square object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 text-left">
            Benefits of Ayurveda
          </h2>
          <ul className="space-y-6">
            {benefits.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
