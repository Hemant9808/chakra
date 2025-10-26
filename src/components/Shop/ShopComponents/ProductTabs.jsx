import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { toast } from "react-hot-toast";
import { productService } from "../../../services/productService";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";
import { PriceDisplay } from "../../../utils/priceUtils";


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

  //get the id from the url
  const { id } = useParams();

  // console.log("id.........", id);

  useEffect(() => {
    console.log("id.........wefsdrfgth", id);
    if (id === "all") {
      setProducts(allProducts);
    } else {
      setLoading(true);
      productService.getProductsByCategory(id)
        .then((data) => setProducts(data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
  }, [id, allProducts]);

  const calculateDiscount = (price, discountPrice) => {
    //deciaml to 2 decimal places
    const discount = ((price - discountPrice) / price) * 100;
    return discount.toFixed(2);
  }

  return (
    <div className="w-full px-4 py-8">
      {/* Tabs */}
      {initialLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 mb-6">
          <button
            // onClick={() => setActiveTab("ALL PRODUCTS")}
            onClick={() => navigate(`/shop/all`)}
            className={`px-4 cursor-pointer py-2 font-semibold border-b-2 ${
              id === "all"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            } hover:text-black transition-all`}
          >
            ALL PRODUCTS
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              // onClick={() => setActiveTab(cat.name)}
              onClick={() => navigate(`/shop/${cat.name}`)}
              className={`px-4 py-2 cursor-pointer font-semibold border-b-2 ${
                id === cat.name
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

                  {/* discounted price */}
                  <PriceDisplay product={product} />
                  {/* {
                    product.discountPrice ? (
                      <div className="flex justify-center mb-3  flex-col items-center ">
                        
                        <span className="text-green-600  font-bold text-lg">
                        
                        ₹{product.discountPrice}
                        </span>
                        <span className=" text-gray-500 line-through">₹{product.price}</span>

                        <span className="text-green-600 text-sm">
                          {calculateDiscount(product.price, product.discountPrice)}% off
                        </span>

                       

                      </div>
                    ) : (
                      <span className="font-bold">₹{product.price}</span>
                    )
                  } */}
                  {/* <span className="font-bold">₹{product.price}</span> */}
                  
                    {/* <span className="font-bold">₹{product.price}</span> */}
                  </div>
                </div>
              </Link>
<button
  onClick={() => {
    if (!checkIfUserIsLoggedIn()) {
      navigate("/login");
      return;
    }
    addToCart(product);
  }}
  disabled={product.stock <= 0}
  className="group relative mt-3 mx-auto w-[180px] h-[54px] flex items-center justify-center overflow-hidden cursor-pointer disabled:cursor-not-allowed"
>
  {/* Background */}
  <div
    className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out 
      group-hover:scale-110 ${product.stock <= 0 ? "opacity-50" : ""}`}
    style={{
      backgroundImage: "url('/ResourseImages/bgOrignal.png')",
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
  <span
    className={`relative z-10 text-white font-semibold text-sm ${
      product.stock <= 0 ? "opacity-70" : ""
    }`}
  >
    {product.stock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
  </span>
</button>


            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
