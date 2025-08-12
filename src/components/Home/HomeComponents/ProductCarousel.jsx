import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../../../Store/useCartStore";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";
import { toast } from "react-hot-toast";
import '../../../Styles/global.css'
import { PriceDisplay } from "../../../utils/priceUtils";

const ProductSkeleton = () => (
  <div className="bg-white shadow-md p-4 rounded-xl w-72 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 rounded-md animate-pulse" />
    <div className="w-32 h-6 bg-gray-200 rounded mt-3 animate-pulse" />
    <div className="w-24 h-4 bg-gray-200 rounded mt-2 animate-pulse" />
    <div className="w-20 h-6 bg-gray-200 rounded mt-2 animate-pulse" />
    <div className="w-full h-10 bg-gray-200 rounded-md mt-3 animate-pulse" />
  </div>
);

const CategorySkeleton = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"
      />
    ))}
  </div>
);

const ProductCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL PRODUCTS");
  const [currentIndex, setCurrentIndex] = useState(0);
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
      // toast.error("lsfmgsekmdv");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "ALL PRODUCTS") {
      fetchData()
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
        // toast.error("lwemfs");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(products.length - 3, 0)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < products.length - 3 ? prev + 1 : 0));
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#355425] mb-4">
          Explore Our Wellness Essentials
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium wellness products, carefully selected to support your journey to optimal health.
        </p>
      </div>

      {/* Category Tabs */}
      {loading && categories.length === 0 ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("ALL PRODUCTS")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "ALL PRODUCTS"
                ? "bg-[#355425] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? "bg-[#355425] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Product Carousel */}
      
      <div className="relative   overflow-hidden  max-w-7xl mx-auto">
        {/* <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
        >
          <ChevronLeft size={24} />
        </button> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div
            className={`flex gap-4 overflow-x-scroll scrollbar-hide px-6 sm:px-10  ${
              products.length <= 3 ? "justify-center" : "justify-start"
            }`}
          >
            {loading ? (
              // Show 3 skeleton products while loading
              Array(3).fill(null).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              
              products.slice(currentIndex, currentIndex + 3).map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md p-4 overflow-hidden rounded-xl w-52 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center transform hover:scale-105 transition duration-300 cursor-pointer"
                  // onClick={() => navigate(`/ProductDetailsById/${product._id}`)}
                >
                  <img
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    className="w-[100%] max-h-[15rem] object-contain rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-3 text-center">{product.name}</h3>
                  <p className="text-gray-700 text-xs mb-2">Brand: {product.brand}</p>
                  <PriceDisplay product={product} />
                  {/* <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{product.price}
                  </p> */}
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-green-700 transition"
                    onClick={(e) => {
                      // e.stopPropagation();
                     navigate(`/ProductDetailsById/${product._id}`)
                      // addToCart(product);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
{/* 
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
        >
          <ChevronRight size={24} />
        </button> */}
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
