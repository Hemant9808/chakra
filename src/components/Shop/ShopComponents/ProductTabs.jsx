import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { toast } from "react-hot-toast";
import { productService } from "../../../services/productService";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";
import { PriceDisplay } from "../../../utils/priceUtils";
import { FaShoppingBag } from "react-icons/fa";

const ProductSkeleton = () => (
  <div className="bg-white shadow-sm border border-[#715036]/10 p-4 rounded-2xl flex flex-col">
    <div className="w-full h-48 bg-[#715036]/10 rounded-xl animate-pulse" />
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="h-4 w-32 bg-[#715036]/10 animate-pulse rounded" />
      <div className="h-3 w-24 bg-[#715036]/10 animate-pulse rounded" />
      <div className="h-4 w-20 bg-[#715036]/10 animate-pulse rounded" />
    </div>
    <div className="h-10 w-full bg-[#715036]/10 animate-pulse rounded-full mt-4" />
  </div>
);

const CategorySkeleton = () => (
  <div className="flex flex-wrap justify-center gap-4 border-b border-[#715036]/10 mb-8 pb-4">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="w-24 h-10 bg-[#715036]/10 animate-pulse rounded-full"
      />
    ))}
  </div>
);

const ProductTabs = ({ products: allProducts, categories, loading: initialLoading }) => {
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { id } = useParams(); // id represents the active category name or 'all'

  useEffect(() => {
    if (!id || id === "all") {
      setProducts(allProducts);
    } else {
      setLoading(true);
      productService.getProductsByCategory(id)
        .then((data) => setProducts(data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
  }, [id, allProducts]);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent link navigation
    if (!checkIfUserIsLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(product);
    // Toast is already shown in the cart store
  };

  return (
    // Background: Cream
    <div className="w-full px-4 py-12 bg-[#FDFBF7]">

      {/* Tabs */}
      {initialLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 border-b border-[#715036]/10 mb-10 pb-4">
          <button
            onClick={() => navigate(`/shop/all`)}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative ${!id || id === "all"
              ? "text-[#2A3B28]"
              : "text-[#715036]/60 hover:text-[#715036]"
              }`}
          >
            All Products
            {(!id || id === "all") && (
              <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-1 bg-[#C17C3A] rounded-t-full" />
            )}
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => navigate(`/shop/${cat.name}`)}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative ${id === cat.name
                ? "text-[#2A3B28]"
                : "text-[#715036]/60 hover:text-[#715036]"
                }`}
            >
              {cat.name}
              {id === cat.name && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-1 bg-[#C17C3A] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {(loading || initialLoading) ? (
          Array(8).fill(null).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-[#715036]/60 text-lg italic">No products found in this category.</p>
            <button onClick={() => navigate('/shop/all')} className="mt-4 text-[#C17C3A] font-bold hover:underline">
              View all products
            </button>
          </div>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white shadow-sm hover:shadow-xl border border-[#715036]/10 rounded-2xl p-5 flex flex-col group transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${product._id}`} className="block flex-1">
                <div className="relative w-full h-56 bg-[#FDFBF7] rounded-xl overflow-hidden flex justify-center items-center p-4">
                  <img
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100 uppercase tracking-wide">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {/* Discount Badge */}
                  {product.discountPrice > 0 && product.discountPrice < product.price && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-[#C17C3A] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      SALE
                    </div>
                  )}
                </div>

                <div className="text-center mt-5">
                  <p className="text-xs font-bold text-[#C17C3A] uppercase tracking-widest mb-1">
                    {product.brand || "Ayucan"}
                  </p>
                  <h3 className="font-serif font-bold text-lg text-[#2A3B28] group-hover:text-[#C17C3A] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="mt-2 mb-4">
                    <PriceDisplay product={product} />
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button - CSS Styled */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                disabled={product.stock <= 0}
                className={`w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${product.stock <= 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-[#2A3B28] text-white hover:bg-[#C17C3A] hover:shadow-lg hover:-translate-y-0.5"
                  }`}
              >
                <FaShoppingBag className="text-xs mb-0.5" />
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>

            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductTabs;