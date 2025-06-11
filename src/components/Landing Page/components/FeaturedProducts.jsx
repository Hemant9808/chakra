import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const products = [
  {
    name: "Wellvas Ashwagandha",
    description: "Supports stress relief and boosts energy for daily vitality.",
    rating: 4.8,
    price: "$29.99",
    image: "/ResourseImages/1.png",
  },
  {
    name: "Wellvas Turmeric",
    description: "Powerful anti-inflammatory formula enhancing immunity and joint health.",
    rating: 4.7,
    price: "$32.99",
    image: "/ResourseImages/1.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#141b29] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-blue-300 mb-12 flex items-center gap-2"
        >
          ⭐ Featured Products
        </motion.h2>

        <div className="space-y-12">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:w-1/3 rounded-xl shadow-lg"
              />
              <div className="md:w-2/3 space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-300">{product.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                  </div>
                  <span className="text-sm text-white">
                    {product.rating}/5 • {product.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
