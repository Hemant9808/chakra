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
  ShieldCheck,
  Leaf,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import BenefitsSection from "./BenefitsSection";
import BenifitsRight from "./BenifitsRight";
import FrequentlyBoughtTogether from "../Home/HomeComponents/FrequentlyBoughtTogether";
import ReviewsList from "../Reviews/ReviewsList";
import { useBreadcrumb } from "../../context/BreadcrumbContext";


const ProductDetailsById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const { updateBreadcrumb, resetBreadcrumb } = useBreadcrumb();

  const whyChoose = [
    "High-potency extract form for maximum benefits",
    "Lab-tested for purity & safety",
    "Available in easy-to-consume formats",
    "Trusted by Ayurvedic experts",
    "100% Organic & Pure – No fillers or additives",
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
        // Update breadcrumb with product name
        updateBreadcrumb({ productName: data.name });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    // Cleanup: reset breadcrumb on unmount
    return () => {
      resetBreadcrumb();
    };
  }, [id]);

  useEffect(() => {
    if (product?.categories[0] === "Men's Wellness") {
      setShowAgePopup(true);
    }
  }, [product]);

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!product?.images) return;

      if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && selectedImage < product.images.length - 1) {
        setSelectedImage(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, product?.images]);

  if (showAgePopup) {
    return (

      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-[#715036]/10">
          <ShieldCheck className="mx-auto text-[#C17C3A] mb-4" size={48} />
          <h2 className="text-xl font-serif font-bold text-[#2A3B28] mb-2">Age Verification</h2>
          <p className="text-[#715036]/80 mb-8 text-sm leading-relaxed">
            This product contains potent Ayurvedic herbs. We must verify that you are over 18 years of age to proceed.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowAgePopup(false)}
              className="bg-[#2A3B28] hover:bg-[#C17C3A] text-white font-bold py-3 px-4 rounded-full transition-all uppercase tracking-widest text-xs"
            >
              I am over 18
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-[#715036] hover:text-[#2A3B28] font-bold py-2 px-4 rounded transition-all text-xs uppercase tracking-widest"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FDFBF7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17C3A]"></div>
      </div>
    );

  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return discount.toFixed(0);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans">

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* --- Image Section --- */}
          <div className="space-y-6">
            {/* Main Image with Swipe/Drag Support */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#715036]/10 bg-white">
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#2A3B28] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                Premium Ayurveda
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                    disabled={selectedImage === 0}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all ${selectedImage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="text-[#2A3B28]" size={24} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => Math.min(product.images.length - 1, prev + 1))}
                    disabled={selectedImage === product.images.length - 1}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all ${selectedImage === product.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                    aria-label="Next image"
                  >
                    <ChevronRight className="text-[#2A3B28]" size={24} />
                  </button>
                </>
              )}

              {/* Swipeable Image Container */}
              <motion.div
                key={selectedImage}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  // Swipe right (show previous image)
                  if (swipe > 500 && selectedImage > 0) {
                    setSelectedImage(prev => prev - 1);
                  }
                  // Swipe left (show next image)
                  else if (swipe < -500 && selectedImage < product.images.length - 1) {
                    setSelectedImage(prev => prev + 1);
                  }
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="cursor-grab active:cursor-grabbing relative group"
              >
                <img
                  src={product.images[selectedImage]?.url || "/placeholder.png"}
                  alt={product.name}
                  className="w-full max-h-[35rem] object-contain p-8 select-none pointer-events-none"
                  draggable={false}
                />
              </motion.div>

              {/* Dot Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${selectedImage === index
                        ? 'w-8 bg-[#C17C3A]'
                        : 'w-2 bg-white/60 hover:bg-white/80'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileTap={{ scale: 0.9 }}
                  animate={selectedImage === index ? { scale: 1.05 } : { scale: 1 }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white ${selectedImage === index
                    ? "border-[#C17C3A] shadow-md ring-2 ring-[#C17C3A]/20"
                    : "border-[#715036]/10 hover:border-[#C17C3A]/50"
                    }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </motion.button>
              ))}
            </div>

          </div>



          {/* --- Product Info Section --- */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1, duration: 0.5 },
              },
            }}
          >
            {/* Title & Brand */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                {product.brand || "Ayucan Wellness"}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2A3B28] leading-tight mb-4">
                {product.name}
              </h1>

              {/* Ratings - Now showing actual data */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#C17C3A]">
                  {Array(5).fill().map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(product.averageRating || 0) ? "currentColor" : "none"}
                      className={i < Math.round(product.averageRating || 0) ? "" : "opacity-30"}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#715036]/60 font-medium">
                  {product.averageRating > 0
                    ? `${product.averageRating.toFixed(1)} (${product.totalReviews || 0} ${product.totalReviews === 1 ? 'review' : 'reviews'})`
                    : 'No reviews yet'
                  }
                </span>
              </div>
            </motion.div>

            {/* Price & Stock */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex items-center flex-wrap gap-4 border-b border-[#715036]/10 pb-8"
            >
              <span className="text-4xl font-serif font-bold text-[#2A3B28]">
                ₹{product.discountPrice}
              </span>
              {product.price > product.discountPrice && (
                <div className="flex flex-col">
                  <span className="text-lg text-[#715036]/50 line-through decoration-[#C17C3A]">
                    ₹{product.price}
                  </span>
                  <span className="text-[#C17C3A] text-xs font-bold uppercase tracking-wide">
                    Save {calculateDiscount(product.price, product.discountPrice)}%
                  </span>
                </div>
              )}

              <div className="ml-auto">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2A3B28]/10 text-[#2A3B28]">
                    <Package size={14} className="mr-2" /> In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="space-y-4"
            >
              <h3 className="text-lg font-serif font-bold text-[#2A3B28]">Description</h3>
              <div
                className="text-[#715036]/80 text-sm md:text-base leading-relaxed font-medium space-y-4"
              >
                {product.description.split("\n").map((line, idx) => (
                  <p key={idx}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Section */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="bg-white p-6 rounded-2xl border border-[#715036]/10 shadow-sm"
            >
              <h3 className="text-lg font-serif font-bold text-[#2A3B28] mb-4 flex items-center gap-2">
                <Leaf size={18} className="text-[#C17C3A]" /> Why Choose {product.brand}?
              </h3>
              <ul className="space-y-3">
                {whyChoose.map((point, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-sm text-[#715036]/80 font-medium"
                  >
                    <CheckCircle size={16} className="text-[#2A3B28] mt-0.5 flex-shrink-0" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>



            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!checkIfUserIsLoggedIn()) {
                  navigate("/login");
                  return;
                }
                addToCart(product);
                // Toast is already shown in the cart store
              }}
              disabled={product.stock <= 0}
              className={`w-full py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 ${product.stock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#2A3B28] text-white hover:bg-[#C17C3A]"
                }`}
            >
              <ShoppingCart size={20} />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </motion.button>


          </motion.div>
        </div>
      </motion.div>

      <BenefitsSection />
      <BenifitsRight />
      <FrequentlyBoughtTogether />

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReviewsList productId={product?._id} />
      </div>
    </div>
  );
};

export default ProductDetailsById;