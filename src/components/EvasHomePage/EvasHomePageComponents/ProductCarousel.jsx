import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../../../Store/useCartStore";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";
import "../../../Styles/global.css";
import { PriceDisplay } from "../../../utils/priceUtils";
import { ShoppingBag, Star } from "lucide-react";
import { getProductUrl } from "../../../utils/productNavigation";

// Updated Skeleton to match new card design
const ProductSkeleton = () => (
  <div className="bg-white border border-[#715036]/10 p-4 rounded-3xl w-72 sm:w-full max-w-sm flex-shrink-0 flex flex-col">
    <div className="w-full h-48 bg-[#FDFBF7] rounded-2xl animate-pulse mb-4" />
    <div className="w-3/4 h-6 bg-[#FDFBF7] rounded mb-2 animate-pulse" />
    <div className="w-1/2 h-4 bg-[#FDFBF7] rounded mb-4 animate-pulse" />
    <div className="mt-auto flex justify-between items-center">
      <div className="w-20 h-6 bg-[#FDFBF7] rounded animate-pulse" />
      <div className="w-24 h-10 bg-[#FDFBF7] rounded-full animate-pulse" />
    </div>
  </div>
);

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  /** ⬇️ Fetch only Men’s Wellness featured products */
  const fetchMenWellnessProducts = async () => {
    try {
      setLoading(true);

      // Fetch products under "Men's Wellness" category
      const menProducts = await productService.getProductsByCategory("Men Wellness");

      // Filter featured ones
      const featuredMenProducts = menProducts.filter((p) => p.isFeatured);

      setProducts(featuredMenProducts);
    } catch (error) {
      console.error("Error loading Men's Wellness products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenWellnessProducts();
  }, []);

  return (
    // Background: Cream
    <section className="bg-[#FDFBF7] py-20 px-4 sm:px-8 relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
        <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
          Premium Collection
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-4">
          Men's Wellness <span className="italic text-[#C17C3A]">Essentials</span>
        </h2>
        <p className="text-[#715036]/80 text-lg max-w-2xl mx-auto font-medium">
          Explore our premium, scientifically-backed formulations designed for peak male vitality.
        </p>
      </div>

      {/* Product Carousel */}
      <div className="relative overflow-hidden max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div className="min-w-[90%] flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x px-4 pb-8">
            {loading ? (
              Array(3).fill(null).map((_, index) => <ProductSkeleton key={index} />)
            ) : products.length === 0 ? (
              <p className="text-center text-[#715036] w-full py-10 font-medium">
                No Men's Wellness products available at the moment.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(getProductUrl(product))}
                  className="bg-white border border-[#715036]/10 min-w-[280px] sm:min-w-[300px] shadow-sm p-4 rounded-3xl flex-shrink-0 flex flex-col group hover:shadow-xl hover:border-[#C17C3A]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer snap-start"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-[#FDFBF7] mb-4">
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#2A3B28] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
                      Premium
                    </div>
                    <img
                      src={product.images[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <p className="text-[#C17C3A] text-xs font-bold uppercase tracking-wider mb-1">
                      {product.brand || "Ayucan"}
                    </p>
                    <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-2 leading-tight line-clamp-2 group-hover:text-[#C17C3A] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-[#715036]/10 flex items-center justify-between">
                      <PriceDisplay product={product} />

                      {/* Updated Buy Now Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          navigate(getProductUrl(product));
                        }}
                        className="bg-[#2A3B28] hover:bg-[#C17C3A] text-white p-3 rounded-full shadow-md transition-all duration-300 transform active:scale-95 group-hover:shadow-lg flex items-center justify-center gap-2"
                        aria-label="Buy Now"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider hidden sm:block px-2">Buy Now</span>
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;