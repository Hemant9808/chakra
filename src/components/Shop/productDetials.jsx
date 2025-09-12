import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { productService } from "../../services/productService";
import { useCartStore } from "../../Store/useCartStore";
import { checkIfUserIsLoggedIn } from "../../middleware/middleware";
import {
  ShoppingCart,
  Tag,
  Package,
  Star,
  CheckCircle,
  ArrowRightCircle,
  CheckCircle2,
} from "lucide-react";

const ProductDetailsById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showAgePopup, setShowAgePopup] = useState(false);

  const whyChoose = [
    "High-potency extract form Capsules for maximum benefits",
    "Lab-tested for purity & safety",
    "Available in easy-to-consume capsules, powder, or liquid extract",
    "Trusted by Ayurvedic experts",
    "100% Organic & Pure – No fillers, additives, or artificial preservatives",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.categories[0] === "Men's Wellness") {
      setShowAgePopup(true);
    }
  }, [product]);

  if (showAgePopup) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-2">Are you over 18?</h2>
          <p className="text-gray-600 mb-6 text-sm">
            We must verify this before you proceed to our website due to legal
            obligations.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowAgePopup(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              VERIFY AGE
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div className="flex h-[80vh] p-8 w-[100%] items-center justify-center gap-4">
          <div className="w-[40%] h-full flex flex-col gap-4 rounded-lg animate-pulse ">
            <div className="w-full h-[20rem] bg-[#f0f0f0] rounded-lg animate-pulse "></div>
            <div className="w-full h-[10rem] bg-[#f0f0f0] rounded-lg animate-pulse "></div>
          </div>
          <div className="w-[60%] h-full bg-[#f0f0f0] rounded-lg animate-pulse "></div>
        </div>
      </div>
    );

  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return discount.toFixed(0);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* --- Image Section --- */}
        <div className="space-y-4">
          {/* Main Image */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={product.images[selectedImage]?.url || "/placeholder.png"}
              alt={product.name}
              className="w-full max-h-[25rem] object-cover"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                whileTap={{ scale: 0.9 }}
                animate={selectedImage === index ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? "border-green-500 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 text-white"
                >
                  {selectedImage === index ? (
                    <CheckCircle2 size={22} className="text-green-400 drop-shadow" />
                  ) : (
                    <ArrowRightCircle size={22} className="drop-shadow" />
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- Product Info Section --- */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15, duration: 0.5 },
            },
          }}
        >
          {/* Title */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
          </motion.div>

          {/* Price & Stock */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center space-x-4"
          >
            <Tag className="text-green-600" size={20} />
            <span className="text-lg text-gray-500 line-through">
              ₹{product.price}
            </span>
            <span className="text-2xl font-bold text-green-600">
              ₹{product.discountPrice}
            </span>
            <span className="text-green-600 text-sm">
              {calculateDiscount(product.price, product.discountPrice)}% off
            </span>
            {product.stock > 0 ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Package size={14} className="mr-1" /> In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </motion.div>

          {/* Ratings */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center mt-2"
          >
            {Array(5)
              .fill()
              .map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
            <span className="ml-2 text-gray-500">(11 customer reviews)</span>
          </motion.div>

          {/* Description */}
<motion.div
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
  className="space-y-2"
>
  <h3 className="text-lg font-medium text-gray-900">Description</h3>
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative bg-gray-50 p-4 rounded-lg text-gray-600 text-sm leading-relaxed shadow-inner 
               border-l-4 border-green-500 hover:border-green-600 transition-all duration-300"
  >
    {product.description.split("\n").map((line, idx) => (
      <p key={idx} className="mb-2">
        {line}
      </p>
    ))}
  </motion.div>


          </motion.div>

          {/* Why Choose */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <h3 className="text-xl font-semibold text-black">
              Why Choose {product.brand}?
            </h3>
            <ul className="list-none mt-3 space-y-2 text-gray-600 text-sm">
              {whyChoose.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle size={16} className="text-green-500" /> {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              if (!checkIfUserIsLoggedIn()) {
                navigate("/login");
                return;
              }
              addToCart(product);
              toast.success("Added to cart!");
            }}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-8 flex items-center justify-center gap-2 text-lg font-medium rounded-xl shadow-md ${
              product.stock > 0
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={20} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsById;
