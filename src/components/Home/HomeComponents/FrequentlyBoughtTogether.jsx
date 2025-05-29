import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { motion } from "framer-motion";

// Static list of bundled products (you can replace with actual logic or props)
const products = [
  {
    id: 1,
    name: "Evas Neo",
    price: 699,
    oldPrice: 899,
    benefits: "Stamina & Energy",
    ingredients: "Ashwagandha, Safed Musli",
    image: "/images/evas-neo.png",
    tagline: "Boost vitality and energy",
    description: "Evas Neo helps support male stamina and energy levels naturally.",
    brand: "Wellvas",
    savings: "Save ₹200",
    whyChoose: ["Herbal formulation", "Trusted by experts"],
    howToUse: ["Take 1 capsule daily"],
    reviews: ["Very effective!", "Loved the results"],
  },
  {
    id: 2,
    name: "Wellcore 360",
    price: 499,
    oldPrice: 699,
    benefits: "Complete Immune Support",
    ingredients: "Vitamins, Minerals, Zinc",
    image: "/images/wellcore-360.png",
    tagline: "All-in-one immunity booster",
    description: "Wellcore 360 is a complete blend for daily immunity maintenance.",
    brand: "Wellvas",
    savings: "Save ₹200",
    whyChoose: ["Daily essential", "Backed by research"],
    howToUse: ["Take with breakfast"],
    reviews: ["Great for immunity", "Very effective"],
  },
  {
    id: 3,
    name: "Evas Max",
    price: 1199,
    oldPrice: 1499,
    benefits: "Performance Booster",
    ingredients: "Safed Musli, Shilajit, Kaunch Beej",
    image: "/images/evas-max.png",
    tagline: "Power-packed support for men",
    description: "Evas Max delivers intense energy and recovery for active lifestyles.",
    brand: "Wellvas",
    savings: "Save ₹300",
    whyChoose: ["Premium herbs", "Trusted by athletes"],
    howToUse: ["Use daily after meals"],
    reviews: ["Amazing product!", "Highly recommended."],
  },
];

const FrequentlyBoughtTogether = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
          Frequently Bought Together
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          These products are often purchased together for better results and complete wellness support.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md p-4 rounded-xl w-full max-w-sm flex flex-col items-center transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-center">{product.name}</h3>
            <p className="text-gray-500 text-sm text-center">{product.benefits}</p>
            <p className="text-gray-700 text-xs mb-2">With: {product.ingredients}</p>
            <p className="text-green-600 font-bold text-lg mt-2">
              ₹{product.price}{" "}
              <span className="line-through text-gray-500 text-sm">₹{product.oldPrice}</span>
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-green-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default FrequentlyBoughtTogether;
