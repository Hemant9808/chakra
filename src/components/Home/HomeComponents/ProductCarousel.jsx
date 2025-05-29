import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../../../Store/useCartStore";
import { useNavigate } from "react-router-dom";

const categories = [
  "Men's Wellness",
  "Immunity Boosters",
  "Liver Health",
  "Daily Essentials",
  "Anti Addiction",
];

const products = {
  "Men's Wellness": [
    {
      id: 1,
      name: "Evas Neo",
      price: 699,
      oldPrice: 899,
      rating: 4.6,
      reviews: 130,
      benefits: "Stamina & Energy",
      ingredients: "Ashwagandha, Safed Musli",
      image: "/ResourseImages/EvasNeo.png",
      tagline: "Boost vitality and energy",
      description: "Evas Neo helps support male stamina and energy levels naturally.",
      brand: "Wellvas",
      savings: "Save ₹200",
      whyChoose: ["Herbal formulation", "Trusted by experts"],
      howToUse: ["Take 1 capsule daily"],
      reviews: ["Very effective!", "Loved the results"]
    },
    {
      id: 2,
      name: "Evas Pro",
      price: 999,
      oldPrice: 1299,
      rating: 4.7,
      reviews: 160,
      benefits: "Strength & Vitality",
      ingredients: "Ashwagandha, Shilajit, Gokshura",
      image: "/ResourseImages/EvasPro.png",
      tagline: "Ultimate daily strength booster",
      description: "Evas Pro supports strength and endurance with Ayurvedic ingredients.",
      brand: "Wellvas",
      savings: "Save ₹300",
      whyChoose: ["High-quality herbs", "100% natural"],
      howToUse: ["Take 1-2 capsules per day"],
      reviews: ["Boosted my performance!", "Will repurchase."]
    },
    {
      id: 3,
      name: "Evas Max",
      price: 1199,
      oldPrice: 1499,
      rating: 4.8,
      reviews: 190,
      benefits: "Performance Booster",
      ingredients: "Safed Musli, Shilajit, Kaunch Beej",
      image: "/ResourseImages/EvasMax.png",
      tagline: "Power-packed support for men",
      description: "Evas Max delivers intense energy and recovery for active lifestyles.",
      brand: "Wellvas",
      savings: "Save ₹300",
      whyChoose: ["Premium herbs", "Trusted by athletes"],
      howToUse: ["Use daily after meals"],
      reviews: ["Amazing product!", "Highly recommended."]
    },
  ],
  "Immunity Boosters": [
    {
      id: 4,
      name: "Wellcore 360",
      price: 499,
      oldPrice: 699,
      rating: 4.5,
      reviews: 100,
      benefits: "Complete Immune Support",
      ingredients: "Vitamins, Minerals, Zinc",
      image: "/ResourseImages/Wellcore360.png",
      tagline: "All-in-one immunity booster",
      description: "Wellcore 360 is a complete blend for daily immunity maintenance.",
      brand: "Wellvas",
      savings: "Save ₹200",
      whyChoose: ["Daily essential", "Backed by research"],
      howToUse: ["Take with breakfast"],
      reviews: ["Great for immunity", "Very effective"]
    },
  ],
  "Liver Health": [
    {
      id: 5,
      name: "Evas Bolts",
      price: 699,
      oldPrice: 899,
      rating: 4.6,
      reviews: 85,
      benefits: "Liver Detox & Rejuvenation",
      ingredients: "Kalmegh, Bhui Amla, Kutki",
      image: "/ResourseImages/EvasBolts.png",
      tagline: "Cleanse your liver effectively",
      description: "Evas Bolts support liver health and detox with herbal formulation.",
      brand: "Wellvas",
      savings: "Save ₹200",
      whyChoose: ["FSSAI approved", "Chemical-free"],
      howToUse: ["Take one tablet after meals"],
      reviews: ["Worked for me", "Very happy"]
    },
  ],
  "Daily Essentials": [
  {
    id: 6,
    name: "Shilajit 10g",
    price: 399,
    oldPrice: 499,
    rating: 4.7,
    reviews: 70,
    benefits: "Vitality Support",
    ingredients: "Pure Himalayan Shilajit",
    image: "/ResourseImages/Shilajit.png",
    tagline: "Natural Vitality Boost",
    description: "Supports energy, stamina, and immunity with authentic Shilajit.",
    brand: "Wellvas",
    savings: "Save ₹100",
    whyChoose: ["Lab-tested purity", "Sourced from Himalayas"],
    howToUse: ["Take a pea-sized amount with warm water"],
    reviews: ["Felt more energetic", "Great quality product"]
  },
  {
    id: 7,
    name: "Shilajit 20g",
    price: 699,
    oldPrice: 899,
    rating: 4.8,
    reviews: 90,
    benefits: "Enhanced Vitality & Stamina",
    ingredients: "Pure Himalayan Shilajit",
    image: "/ResourseImages/Shilajit.png",
    tagline: "Double strength daily vitality",
    description: "Premium Himalayan Shilajit in larger quantity for sustained wellness.",
    brand: "Wellvas",
    savings: "Save ₹200",
    whyChoose: ["Authentic source", "Powerful adaptogen"],
    howToUse: ["Take a pea-sized amount twice daily"],
    reviews: ["Value for money", "Excellent quality"]
  },
  {
    id: 8,
    name: "Ashwazen Pro",
    price: 849,
    oldPrice: 1049,
    rating: 4.5,
    reviews: 85,
    benefits: "Calm Energy & Stress Relief",
    ingredients: "Ashwagandha, Ginseng",
    image: "/ResourseImages/AshwaPro.png",
    tagline: "Adaptogenic support for busy lives",
    description: "Ashwazen Pro promotes balance, energy, and mental clarity.",
    brand: "Wellvas",
    savings: "Save ₹200",
    whyChoose: ["Clinically backed", "Stress and energy support"],
    howToUse: ["Take 1 capsule after meals"],
    reviews: ["Noticeable calmness", "Improved focus"]
  },
  {
    id: 9,
    name: "Ashwazen Max",
    price: 999,
    oldPrice: 1299,
    rating: 4.6,
    reviews: 110,
    benefits: "Strength, Stamina & Vitality",
    ingredients: "Ashwagandha, Safed Musli, Shilajit",
    image: "/ResourseImages/AshwaMax.png",
    tagline: "Daily Energy and Stress Support",
    description: "Combines adaptogens and herbal powerhouses to reduce fatigue and boost performance.",
    brand: "Wellvas",
    savings: "Save ₹300",
    whyChoose: ["High strength formulation", "Ayurvedic blend"],
    howToUse: ["Take 1 capsule twice daily after meals"],
    reviews: ["Effective and natural", "Really helped with fatigue"]
  }
],

"Anti Addiction": [
  {
    id: 10,
    name: "Anti Addiction Drops 30ml",
    price: 599,
    oldPrice: 699,
    rating: 4.4,
    reviews: 32,
    benefits: "Helps reduce cravings & dependency",
    ingredients: "Triphala, Brahmi, Guduchi",
    image: "/ResourseImages/AntiAddiction.png",
    tagline: "Naturally Fight Addictions",
    description: "Formulated to help reduce dependency on harmful substances with Ayurvedic herbs.",
    brand: "Wellvas",
    savings: "Save ₹100",
    whyChoose: ["Non-habit forming", "Herbal detox support"],
    howToUse: ["Take 10 drops twice daily in water"],
    reviews: ["Subtle but effective", "Definitely helped me cut back"]
  }
]
};

const ProductCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men's Wellness");
  const [currentIndex, setCurrentIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const currentProducts = products[selectedCategory] || [];
  const visibleProducts = currentProducts.slice(currentIndex, currentIndex + 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(currentProducts.length - 3, 0)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < currentProducts.length - 3 ? prev + 1 : 0));
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
          Explore Our Wellness Essentials
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Curated blends designed to support your lifestyle goals — be it stamina, immunity,
          liver health, or daily vitality.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
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
  transition={{ duration: 0.5 }}
  className={`w-full px-10 flex justify-center gap-6`}
>
  {visibleProducts.map((product) => (
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



        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#355425] text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-[#c71e65] transition"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
