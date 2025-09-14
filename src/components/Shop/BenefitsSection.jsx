import { motion } from "framer-motion";
import { Shield, Flame, Leaf, RefreshCw } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Embrace natural health",
      desc: "All-natural ingredients for a balanced life.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-green-500" />,
      title: "Detoxify and rejuvenate",
      desc: "Support your body’s cleansing and liver health.",
    },
    {
      icon: <Flame className="w-6 h-6 text-green-500" />,
      title: "Boost vitality & stamina",
      desc: "Increase your daily energy and endurance.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Strengthen mind & body",
      desc: "Improve memory, immunity, and overall wellbeing.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-[#5C452C] to-[#203D37] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Top Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-14"
        >
          Benefits
        </motion.h2>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="/ResourseImages/Details1.png"
              alt="Wellvas Wellness"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-50 mb-6">
              Your Natural Path to Wellness
            </h3>
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
                    <h4 className="text-lg font-semibold text-gray-50">
                      {item.title}
                    </h4>
                    <p className="text-gray-200">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
