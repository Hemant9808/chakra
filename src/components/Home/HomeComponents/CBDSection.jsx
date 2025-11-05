import { motion } from "framer-motion";
import { Brain, Target, Sun, Shield, Heart, CloudDrizzle, Zap, Leaf, Droplet, UserCheck, Activity, Sunrise } from "lucide-react";

const wellcoreBenefits = [
  {
    title: "Optimal Athletic Performance",
    desc: "Perfect for athletes and active individuals, supporting the strength and stamina needed for sustained endurance.",
    icon: <Activity className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Ayurvedic Adaptogens",
    desc: "Packed with powerful Ayurvedic adaptogens and superfoods to energize the body and support optimal daily performance.",
    icon: <Leaf className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Stress and Mind Support",
    desc: "Contains herbs traditionally used to calm the mind and support a healthy and balanced response to daily stress.",
    icon: <Brain className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Antioxidant Rich Blend",
    desc: "Formulated with antioxidant Vitamins C, E, and Beta-Carotene to protect tissues and promote cellular health.",
    icon: <Shield className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Essential Minerals & Herbs",
    desc: "A potent formulation featuring a blend of essential minerals, key herbs, and rejuvenating botanical extracts.",
    icon: <Droplet className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Daily Rejuvenation",
    desc: "With ingredients traditionally used to nourish and rejuvenate tissues, promoting vitality throughout the day.",
    icon: <Sunrise className="w-8 h-8 text-yellow-600" />,
  },
];

// Component to render a single benefit card (for reuse)
const BenefitCard = ({ item, idx }) => (
  <motion.div
    key={idx}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-green-100 p-6 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center text-center w-full"
  >
    <div className="bg-yellow-200 rounded-full p-4 mb-4 flex items-center justify-center">
      {item.icon}
    </div>
    <h3 className="font-semibold text-lg text-green-900 mb-2">
      {item.title}
    </h3>
    <p className="text-sm text-green-800">{item.desc}</p>
  </motion.div>
);


export default function WellcoreBenefits() {
  // Split the benefits array into two halves
  const leftBenefits = wellcoreBenefits.slice(0, 3);
  const rightBenefits = wellcoreBenefits.slice(3, 6);

  return (
    <section className="bg-green-50 py-12 px-4 sm:px-8 md:px-16 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-900">
        Wellcore 360 Multivitamin Benefits
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Everyday Endurance packs a powerful punch of Ayurvedic adaptogens, vitamins, and superfoods to support peak performance.
      </p>

      {/* KEY FIX: Changed lg:grid to md:grid and lg:gap-12 to md:gap-12. 
        This activates the 3-column layout on medium screens (768px+)
      */}
      <div className="max-w-7xl w-full flex flex-col md:grid md:grid-cols-3 md:gap-12 items-start">

        {/* 1. Left Benefits (3 items) */}
        <div className="w-full order-2 md:order-1 mb-8 md:mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {leftBenefits.map((item, idx) => (
              <BenefitCard key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* 2. Center Image */}
        <motion.div
          className="relative w-full flex justify-center order-1 md:order-2 mb-12 md:mb-0 md:mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/ResourseImages/Wellcore.png" 
            alt="Wellcore 360 Multivitamin Capsules Bottle"
            className="w-48 sm:w-56 md:w-full mx-auto drop-shadow-lg" 
          />
        </motion.div>

        {/* 3. Right Benefits (3 items) */}
        <div className="w-full order-3 md:order-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {rightBenefits.map((item, idx) => (
              <BenefitCard key={idx + leftBenefits.length} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}