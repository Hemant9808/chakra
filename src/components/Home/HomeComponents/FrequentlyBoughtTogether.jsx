import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { motion } from "framer-motion";
import axiosInstance from "../../../axios";
import { productService, formatPriceDisplay } from "../../../services/productService";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";
import LoadingSpinner from "../../common/LoadingSpinner";
import { toast } from "react-hot-toast";

const FrequentlyBoughtTogether = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const categoryProducts = await productService.getProductsByCategory("Combo");
        setProducts(categoryProducts);
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByCategory();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
            Frequently Bought Together
          </h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
            Frequently Bought Together
          </h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
            Frequently Bought Together
          </h2>
          <p className="text-gray-600">No Combo products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
          Frequently Bought Together
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          These nutrition products are often purchased together for better results and complete wellness support.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-nowrap overflow-x-auto gap-6 justify-start sm:justify-center px-1 sm:px-4"
      >
        {products.map((product) => {
          const priceInfo = formatPriceDisplay(product);
          return (
            <div
              key={product._id}
              className="min-w-[250px] bg-white shadow-md p-4 rounded-xl flex flex-col items-center flex-shrink-0"
            >
              <div
                className="cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => navigate(`/ProductDetailsById/${product._id}`)}
              >
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  className="w-40 h-40 object-contain rounded-md"
                />
                <h3 className="text-sm font-semibold mt-3 text-center text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm text-center">{product.description}</p>
                {/* <p className="text-gray-700 text-xs mt-2 text-center">Category: {product.category}</p> */}
                <p className="text-gray-700 text-xs mt-2 text-center">Brand: {product.brand}</p>
                <div className="text-center mt-2">
                  {priceInfo.hasDiscount ? (
                    <div className="flex flex-col items-center">
                      <span className="text-green-600 font-bold text-lg">₹{priceInfo.displayPrice}</span>
                      <span className="text-gray-500 line-through text-sm">₹{priceInfo.originalPrice}</span>
                      <span className="text-red-600 text-xs font-medium mt-1">
                        {priceInfo.discountPercentage}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-600 font-bold text-lg">₹{priceInfo.displayPrice}</span>
                  )}
                </div>
              </div>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition"
                onClick={() => {
                  if (!checkIfUserIsLoggedIn()) {
                    navigate("/login");
                    return;
                  }
                  addToCart(product);
                }}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FrequentlyBoughtTogether;
