import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../../../Store/useCartStore";

const categories = ["Nutrition", "Hair", "Beard", "Performance", "Hygiene", "Skin"];

const products = {
  Nutrition: [
    {
      id: 1,
      name: "SuperBlend - Rich Cocoa (15 days pack)",
      price: 2100,
      oldPrice: 2499,
      rating: 4.6,
      reviews: 43,
      benefits: "Elite Athletic Performance",
      ingredients: "Protein, Vitamins, Minerals & Probiotics",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
    {
      id: 2,
      name: "Shilajit Gummies (1 Month Pack)",
      price: 899,
      oldPrice: 999,
      rating: 4.5,
      reviews: 536,
      benefits: "Strength and Endurance",
      ingredients: "Pure Shilajit",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
    {
      id: 3,
      name: "Vitamin C Tablets",
      price: 499,
      oldPrice: 599,
      rating: 4.8,
      reviews: 120,
      benefits: "Immunity Boost",
      ingredients: "Vitamin C, Zinc",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
    {
      id: 4,
      name: "Omega 3 Fish Oil",
      price: 1199,
      oldPrice: 1499,
      rating: 4.7,
      reviews: 245,
      benefits: "Heart and Brain Health",
      ingredients: "Fish Oil, Omega 3",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
  ],
  Hair: [
    {
      id: 5,
      name: "Hair Serum",
      price: 799,
      oldPrice: 999,
      rating: 4.4,
      reviews: 213,
      benefits: "Smooth and shiny hair",
      ingredients: "Keratin, Argan Oil",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
    {
      id: 6,
      name: "Hair Gummies",
      price: 699,
      oldPrice: 899,
      rating: 4.3,
      reviews: 134,
      benefits: "Hair growth support",
      ingredients: "Biotin, Vitamin E",
      image:
        "https://www.daburshop.com/cdn/shop/files/1_90e49e8e-41ac-48a9-91a4-8e9df8402948_1024x1024.png?v=1741673066",
    },
    // Add more Hair products as needed...
  ],
  // Add other categories like Beard, Performance, etc.
};

const ProductCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("Nutrition");
  const [currentIndex, setCurrentIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  const currentProducts = products[selectedCategory] || [];
  const visibleProducts = currentProducts.slice(currentIndex, currentIndex + 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentProducts.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < currentProducts.length - 3 ? prev + 1 : 0));
  };

  return (
    <div className="w-full p-6 bg-white">
      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? "bg-green-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentIndex(0);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <motion.div
          key={currentIndex + selectedCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 overflow-x-auto no-scrollbar px-8"
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md p-4 rounded-lg w-60 min-w-[20rem] flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-center">{product.name}</h3>
              <p className="text-gray-500 text-center">{product.benefits}</p>
              <p className="text-gray-700 text-sm">With: {product.ingredients}</p>
              <p className="text-green-600 font-bold text-lg mt-2">
                ₹{product.price}{" "}
                <span className="line-through text-gray-500">₹{product.oldPrice}</span>
              </p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-600 transition"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </motion.div>

        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
