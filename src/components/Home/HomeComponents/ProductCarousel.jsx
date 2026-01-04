import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";
import { PriceDisplay } from "../../../utils/priceUtils";
import { useCartStore } from "../../../Store/useCartStore";
import { FaShoppingBag } from "react-icons/fa";
import { getProductUrl } from "../../../utils/productNavigation";

const ProductSkeleton = () => (
  <div className="bg-white shadow-sm border border-[#715036]/10 p-4 rounded-2xl w-64 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center">
    <div className="w-full h-48 bg-[#715036]/10 rounded-xl animate-pulse" />
    <div className="w-3/4 h-6 bg-[#715036]/10 rounded mt-4 animate-pulse" />
    <div className="w-1/2 h-4 bg-[#715036]/10 rounded mt-2 animate-pulse" />
    <div className="w-1/3 h-6 bg-[#715036]/10 rounded mt-3 animate-pulse" />
    <div className="w-full h-10 bg-[#715036]/10 rounded-full mt-4 animate-pulse" />
  </div>
);

const CategorySkeleton = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="w-24 h-10 bg-[#715036]/10 rounded-full animate-pulse"
      />
    ))}
  </div>
);

const ProductCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL PRODUCTS");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllCategories()
      ]);

      // Filter featured products
      const featuredProducts = productsData.filter(product => product.isFeatured);
      setProducts(featuredProducts);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "ALL PRODUCTS") {
      fetchData();
      return;
    }

    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const categoryProducts = await productService.getProductsByCategory(selectedCategory);
        // Filter featured products
        const featuredProducts = categoryProducts.filter(product => product.isFeatured);
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching category products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  return (
    // Section Background: Cream
    <section className="bg-[#FDFBF7] py-20 px-4 sm:px-8 relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-[#FDFBF7] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4 tracking-tight">
          Wellness Essentials
        </h2>
        <div className="h-1 w-24 bg-[#C17C3A] mx-auto rounded-full mb-6"></div>
        <p className="text-[#715036]/80 max-w-2xl mx-auto font-medium">
          Curated Ayurvedic formulations to support your journey to optimal health.
        </p>
      </div>

      {/* Category Tabs */}
      {loading && categories.length === 0 ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
          <button
            onClick={() => setSelectedCategory("ALL PRODUCTS")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${selectedCategory === "ALL PRODUCTS"
              ? "bg-[#2A3B28] text-white border-[#2A3B28] shadow-lg transform scale-105"
              : "bg-white text-[#715036] border-[#715036]/20 hover:border-[#C17C3A] hover:text-[#C17C3A]"
              }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${selectedCategory === category.name
                ? "bg-[#2A3B28] text-white border-[#2A3B28] shadow-lg transform scale-105"
                : "bg-white text-[#715036] border-[#715036]/20 hover:border-[#C17C3A] hover:text-[#C17C3A]"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Product Carousel / Horizontal Scroll */}
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className={`flex gap-6 overflow-x-auto pb-8 pt-2 px-4 scrollbar-hide scroll-smooth snap-x ${products.length < 3 ? "lg:justify-center" : ""
              }`}
          >
            {loading ? (
              Array(4)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            ) : products.length === 0 ? (
              <div className="w-full text-center py-10 text-[#715036]/60 italic">
                No products found in this category.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(getProductUrl(product))}
                  // Card Style: White with Earthy Border & Shadow
                  className="bg-white min-w-[280px] w-[280px] sm:w-[300px] shadow-sm hover:shadow-xl border border-[#715036]/10 rounded-2xl p-5 flex flex-col items-center flex-shrink-0 snap-center transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-[#C17C3A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Image Container */}
                  <div className="w-full h-56 bg-[#FDFBF7] rounded-xl overflow-hidden mb-4 relative p-4 flex items-center justify-center">
                    <img
                      src={product.images[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Quick Badge */}
                    {product.discountPrice > 0 && product.discountPrice < product.price && (
                      <span className="absolute top-2 right-2 bg-[#C17C3A] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center w-full flex-1 flex flex-col">
                    <p className="text-[#C17C3A] text-xs font-bold uppercase tracking-widest mb-1">
                      {product.brand || "Ayucan"}
                    </p>
                    <h3 className="text-lg font-serif font-bold text-[#2A3B28] line-clamp-1 mb-2 group-hover:text-[#C17C3A] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mb-4">
                      <PriceDisplay product={product} />
                    </div>

                    <div className="mt-auto w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full py-3 rounded-full bg-[#2A3B28] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C17C3A] transition-colors duration-300 shadow-md group-hover:shadow-lg"
                      >
                        <FaShoppingBag className="text-xs" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop/all")}
          className="inline-block border-2 border-[#2A3B28] text-[#2A3B28] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#2A3B28] hover:text-white transition-all duration-300"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;