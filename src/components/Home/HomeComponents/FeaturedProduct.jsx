import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";
import { motion } from "framer-motion";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { getProductUrl } from "../../../utils/productNavigation";

const FeaturedProduct = () => {
  const navigate = useNavigate();

  const product = {
    name: "Himalayan Shilajit",
    tagline: "Strength, Vitality & Endurance",
    description:
      "Boost stamina, improve recovery, and power your performance with purified Shilajit resin. Trusted by men’s wellness experts.",
    image: "/ResourseImages/4.png",
    price: 999,
    oldPrice: 1349,
    savings: "You save ₹350 (25%)",
    brand: "Ayucan",
    benefits: [
      "Improves stamina and recovery",
      "Balances energy and hormones",
      "Fights fatigue and stress",
    ],
    whyChoose: [
      "Pure Himalayan extract",
      "Lab-tested for heavy metals",
      "Certified FSSAI-compliant",
    ],
    howToUse: ["Take 1 capsule daily after meal with warm water"],
    reviews: [
      "Improved my energy within a week!",
      "Felt the change in stamina and recovery.",
    ],
  };

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [bestSeller, setBestSeller] = useState();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await productService.getAllProducts();
        const best = products && products?.find((product) => product.isBestSelling);
        if (best) {
          setBestSeller(best);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; // Stop the timer when it reaches 0
        }
        return prev - 1; // Decrease the time left by 1 second
      });
    }, 1000); // Update every second
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  if (!bestSeller) return <></>;

  return (
    // Background: Cream
    <section className="bg-[#FDFBF7] py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch border border-[#715036]/10"
        >

          {/* Image Section */}
          <div className="md:w-1/2 w-full relative bg-[#FDFBF7] flex items-center justify-center p-8 overflow-hidden group">
            {/* Decorative Circle behind image */}
            <div className="absolute w-64 h-64 bg-[#C17C3A]/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

            <img
              src={bestSeller?.images[0]?.url || product.image}
              alt={product.name}
              className="relative z-10 w-full max-h-[400px] object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badge */}
            <span className="absolute top-6 left-6 bg-[#C17C3A] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider z-20">
              Bestseller
            </span>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left relative">
            {/* Top Label */}
            <div className="mb-2">
              <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em]">Featured Product</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] mb-3 leading-tight">
              {bestSeller?.name}
            </h2>

            <p className="text-lg text-[#2A3B28]/60 font-medium italic mb-6">
              {product.tagline}
            </p>

            <div className="w-16 h-1 bg-[#C17C3A] rounded-full mb-6 mx-auto md:mx-0"></div>

            <p className="text-[#715036]/80 text-base mb-8 leading-relaxed">
              {bestSeller?.description?.split(" ").slice(0, 30).join(" ") +
                (bestSeller?.description?.split(" ").length > 30 ? "..." : "")}
            </p>

            {/* Timer Box */}
            <div className="inline-flex items-center gap-3 bg-[#FDFBF7] border border-[#715036]/10 px-4 py-3 rounded-xl mb-8 mx-auto md:mx-0 w-fit">
              <div className="p-2 bg-[#Fee2e2] rounded-full text-red-500">
                <FaClock />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#715036] uppercase">Limited Time Offer</p>
                <p className="text-red-500 font-bold font-mono text-lg leading-none">{formatTime(timeLeft)}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(getProductUrl(bestSeller))}
              className="group bg-[#2A3B28] hover:bg-[#C17C3A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-fit"
            >
              Shop Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProduct;