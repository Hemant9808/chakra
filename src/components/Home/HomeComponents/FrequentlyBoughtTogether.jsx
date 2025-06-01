import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";
import axiosInstance from "../../../axios";

const FrequentlyBoughtTogether = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('product/getAllProducts');
        // Filter products from nutrition category
        const nutritionProducts = response.data.filter(product => 
          product.category === 'Combo' || 
          product.category?.toLowerCase().includes('nutrition')
        );
        setProducts(nutritionProducts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10">
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
        className="flex flex-wrap justify-center gap-6"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md p-4 rounded-xl w-full max-w-sm flex flex-col items-center transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
          >
            <img
              src={product.images?.[0]?.url || '/placeholder.png'}
              alt={product.name}
              className="w-40 h-40 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-center">{product.name}</h3>
            <p className="text-gray-500 text-sm text-center">{product.description}</p>
            <p className="text-gray-700 text-xs mb-2">Category: {product.category}</p>
            <p className="text-green-600 font-bold text-lg mt-2">
              ₹{product.price}{" "}
              {product.oldPrice && (
                <span className="line-through text-gray-500 text-sm">₹{product.oldPrice}</span>
              )}
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
