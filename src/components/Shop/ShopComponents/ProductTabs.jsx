import React, { useState } from "react";
import { productsData } from "./productsData"; // your product data array
import { useCartStore } from "../../../Store/useCartStore";


const categories = [
  "ALL PRODUCTS",
  "PERFORM BETTER",
  "BETTER ERECTIONS",
  "LAST LONGER",
  "BEST SELLER",
  "COMBOS FOR ALPHA MEN",
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("ALL PRODUCTS");
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts =
    activeTab === "ALL PRODUCTS"
      ? productsData
      : productsData.filter((p) => p.category === activeTab);

  return (
    <div className="w-full px-4 py-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === cat
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            } hover:text-black transition-all`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-4 flex flex-col items-center"
          >
            <div className="relative w-full h-48 flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-brown-600 text-white text-xs px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
              {/* {product.sharkTank && (
                <img
                  src="/shark-tank-badge.png"
                  alt="Shark Tank"
                  className="absolute top-2 right-2 w-12"
                />
              )} */}
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <div className="text-yellow-500 text-sm mt-1">
                {"⭐".repeat(Math.round(product.rating))}
              </div>
              <div className="text-sm mt-2">
                <span className="text-red-500 line-through mr-2">
                  ₹{product.originalPrice}
                </span>
                <span className="font-bold">₹{product.price}</span>
              </div>
              <button className="bg-black text-white text-sm mt-3 px-4 py-2 rounded hover:bg-gray-800" onClick={() => addToCart(product)}>
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
