import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}> 
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}>
          Elevate Your Wellness Naturally 🌿
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}>
          Discover 100% natural Ayurvedic wellness products for a healthier lifestyle.
        </motion.p>

        <motion.a 
          href="/shop/all"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}>
          Explore Products
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
