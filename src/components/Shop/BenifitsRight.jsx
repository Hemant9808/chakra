import { motion } from "framer-motion";
import { CheckCircle, Leaf, Brain, Heart, Shield } from "lucide-react"; // Changed icons for variety

export default function BenefitsRight() {
  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#A0D468]" />, // Green color inspired by image
      title: "Harmonize Body, Mind & Spirit",
      desc: "Achieve inner balance and holistic well-being.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#A0D468]" />,
      title: "Enhance Digestive Fire (Agni)",
      desc: "Improve nutrient absorption and gut health.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#A0D468]" />,
      title: "Reduce Stress & Promote Calm",
      desc: "Naturally soothe the nervous system for peace.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#A0D468]" />,
      title: "Boost Natural Immunity",
      desc: "Strengthen your body's defense against illness.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-[#203D37] to-[#5C452C] py-16 px-6 md:px-12"> {/* Dark gradient from image */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#A0D468] text-sm font-semibold uppercase mb-2">Wellvas.com</p> {/* Small wellvas.com text */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ancient Wisdom for Modern Health
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Key Ayurvedic Benefits:
          </p>
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
                <div className="flex-shrink-0 mt-1">{item.icon}</div> {/* Adjusted margin for alignment */}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Image Placeholder (assuming you'll use a relevant image here) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {/* Replace this img tag with your actual image component or the specific image that looks like the right side of your reference image */}
          <img
            src="/ResourseImages/Details2.png" // Placeholder image for demonstration
            alt="Ayurveda Wellness Concepts"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}