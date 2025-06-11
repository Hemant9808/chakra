import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { toast } from "react-hot-toast";
import { productService } from "../../../services/productService";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";

const ProductSkeleton = () => (
  <div className="bg-white shadow rounded-xl p-4 flex flex-col">
    <div className="relative w-full h-48 flex justify-center overflow-hidden">
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-md" />
    </div>
    <div className="text-center mt-4">
      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
      <div className="h-3 w-24 bg-gray-200 animate-pulse rounded mx-auto mt-2" />
      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mx-auto mt-2" />
    </div>
    <div className="h-10 bg-gray-200 animate-pulse rounded mt-3" />
  </div>
);

const CategorySkeleton = () => (
  <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 mb-6">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="w-24 h-10 bg-gray-200 animate-pulse rounded"
      />
    ))}
  </div>
);

const ProductTabs = ({ products: allProducts, categories, loading: initialLoading }) => {
  const [activeTab, setActiveTab] = useState("ALL PRODUCTS");
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate()

  useEffect(() => {
    if (activeTab === "ALL PRODUCTS") {
      setProducts(allProducts);
    } else {
      setLoading(true);
      productService.getProductsByCategory(activeTab)
        .then((data) => setProducts(data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
  }, [activeTab, allProducts]);

  return (
    <div className="w-full px-4 py-8">
      {/* Tabs */}
      {initialLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab("ALL PRODUCTS")}
            className={`px-4 cursor-pointer py-2 font-semibold border-b-2 ${
              activeTab === "ALL PRODUCTS"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            } hover:text-black transition-all`}
          >
            ALL PRODUCTS
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveTab(cat.name)}
              className={`px-4 py-2 cursor-pointer font-semibold border-b-2 ${
                activeTab === cat.name
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              } hover:text-black transition-all`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(loading || initialLoading) ? (
          // Show 8 skeleton products while loading
          Array(8).fill(null).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center">No products found</div>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white shadow rounded-xl p-4 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/ProductDetailsById/${product._id}`} className="group">
                <div className="relative w-full h-48 flex justify-center overflow-hidden">
                  <img
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  {product.stock <= 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-semibold text-sm group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                  <div className="text-sm mt-2">
                    <span className="font-bold">₹{product.price}</span>
                  </div>
                </div>
              </Link>
              <button
                className="bg-black text-white text-sm mt-3 px-4 py-2 rounded hover:bg-gray-800 disabled:bg-gray-300"
                onClick={() => {
                  if (!checkIfUserIsLoggedIn()) {
                  navigate("/login")
                  return;
                  }
                  addToCart(product);
                }}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
