import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Chevron icons
import { productService } from "../../../services/productService";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";
import { PriceDisplay } from "../../../utils/priceUtils"; // Assuming this utility is available

// Reusing the ProductSkeleton from the carousel for a consistent loading state
const ProductSkeleton = () => (
  <div className="bg-white shadow-md p-4 rounded-xl w-52 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 rounded-md animate-pulse" />
    <div className="w-32 h-6 bg-gray-200 rounded mt-3 animate-pulse" />
    <div className="w-24 h-4 bg-gray-200 rounded mt-2 animate-pulse" />
    <div className="w-20 h-6 bg-gray-200 rounded mt-2 animate-pulse" />
    <div className="w-full h-10 bg-gray-200 rounded-md mt-3 animate-pulse" />
  </div>
);

const FrequentlyBoughtTogether = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // For optional manual carousel
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComboProducts = async () => {
      try {
        setLoading(true);
        // Keep the original logic: fetch by "Combo" category
        const comboProducts = await productService.getProductsByCategory("Combo");
        setProducts(comboProducts);
      } catch (error) {
        setError("Failed to fetch recommended products.");
      } finally {
        setLoading(false);
      }
    };
    fetchComboProducts();
  }, []);

  // Function to handle navigation to next item (optional for manual scrolling)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
    // NOTE: For the 'overflow-x-auto' approach, this is often unnecessary.
    // CSS scrolling (snap-x) handles smooth movement better.
  };

  // --- Conditional Renderings for Loading/Error/Empty States ---

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
            Frequently Bought Together
          </h2>
          {/* Match the carousel's skeleton loading state */}
          <div className="flex justify-center gap-4 overflow-hidden px-4">
            {Array(3).fill(null).map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
            Frequently Bought Together
          </h2>
          <p className="text-gray-600">
            {error || "No combo products available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  // --- Main Component Render ---

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
          Frequently Bought Together
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Unlock maximum results with our recommended pairings, often purchased together for complete wellness support.
        </p>
      </div>

      {/* Product Carousel structure */}
      <div className="relative overflow-hidden max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div
            className="min-w-[90%] flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x px-4"
          >
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/ProductDetailsById/${product._id}`)}
                className="bg-white min-w-[90%] sm:min-w-auto shadow-md p-4 overflow-hidden rounded-xl w-52 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center transform hover:scale-105 transition duration-300 cursor-pointer snap-start"
              >
                <img
                  src={product.images[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  className="w-[100%] max-h-[15rem] object-contain rounded-md"
                />
                <h3 className="text-lg font-semibold mt-3 text-center">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-xs mb-2">{product.brand}</p>
                <PriceDisplay product={product} />

                {/* Adopted Buy Now button style and logic from ProductCarousel */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click navigation
                    if (!checkIfUserIsLoggedIn()) {
                      navigate("/login");
                      return;
                    }
                    addToCart(product);
                    // Navigate to cart or product details after adding
                    navigate("/cart"); 
                  }}
                  disabled={product.stock <= 0}
                  className="relative mt-3 w-[180px] h-[54px] flex items-center justify-center px-3 py-0 overflow-visible cursor-pointer group"
                  aria-label={`Buy ${product.name}`}
                >
                  {/* Background with masking */}
                  <div
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    style={{
                      backgroundImage: "url('/ResourseImages/bg.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      WebkitMaskImage: "url('/ResourseImages/buttonShape2.png')",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "cover",
                      WebkitMaskPosition: "center",
                      maskImage: "url('/ResourseImages/buttonShape2.png')",
                      maskRepeat: "no-repeat",
                      maskSize: "cover",
                      maskPosition: "center",
                    }}
                  />

                  {/* Text */}
                  <span className="relative z-10 text-white font-semibold text-sm">
                    Add to Cart
                  </span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop/all")}
          className="bg-[#355425] text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-[#c71e65] transition"
        >
          View All Combos
        </button>
      </div>
    </section>
  );
};

export default FrequentlyBoughtTogether;