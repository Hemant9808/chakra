import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { productService } from '../../services/productService';
import { useCartStore } from '../../Store/useCartStore';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLocation } from "react-router-dom";
import { checkIfUserIsLoggedIn } from '../../middleware/middleware';

const ProductDetailsById = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  console.log("page rendered");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showAgePopup, setShowAgePopup] = useState(false);
  const location = useLocation();
 const  whyChoose = [
        "High-potency extract form Capsules for maximum benefits",
        "Lab-tested for purity & safety",
        "Available in easy-to-consume capsules, powder, or liquid extract",
        "Trusted by Ayurvedic experts",
        "100% Organic & Pure – No fillers, additives, or artificial preservatives",
      ]


      //when this page is rendered i want to scroll to the top of the page
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

   if(product?.categories[0] == "Men's Wellness"){
    setShowAgePopup(true);
   }
  }, [product]);


    if (showAgePopup) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-2">Are you over 18?</h2>
          <p className="text-gray-600 mb-6 text-sm">
            We must verify this before you proceed to our website due to legal obligations.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowAgePopup(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              VERIFY AGE
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }



  if (loading) return (
  <div className="flex justify-center items-center ">
    <div className="flex h-[80vh]    p-8 w-[100%] items-center justify-center gap-4">
      <div className="w-[40%] h-full flex flex-col gap-4 rounded-lg animate-pulse ">
        <div className="w-full h-[20rem] bg-[#f0f0f0] rounded-lg animate-pulse "></div>
        <div className="w-full h-[10rem] bg-[#f0f0f0] rounded-lg animate-pulse "></div>
      </div>
      <div className="w-[60%] h-full  bg-[#f0f0f0] rounded-lg animate-pulse "></div>

    </div>
  </div>
  )

   const calculateDiscount = (price, discountPrice) => {
    //deciaml to 2 decimal places
    const discount = ((price - discountPrice) / price) * 100;
    return discount.toFixed(0);
  }

  // if (loading) return <LoadingSpinner />;
  // if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  // if (!product) return <div className="text-center mt-8">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
          >
            <img
              src={product.images[selectedImage]?.url || '/placeholder.png'}
              alt={product.name}
              className="w-full max-h-[25rem] object-cover h-full object-center"
            />
          </motion.div>
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* Original Price */}
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.price}
                </span>
                
                {/* Discounted Price */}
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.discountPrice}
                </span>
                
              </div>
              <span className="text-green-600 text-sm">
                      {calculateDiscount(product.price, product.discountPrice)}% off
                </span>

            {product.stock > 0 ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
          <div className="flex items-center mt-2">
            ⭐⭐⭐⭐⭐ <span className="text-gray-500">(11 customer reviews)</span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2 prose prose-sm text-gray-500">
              {/* {product.description}
               */}
               {product.description.split('\n').map((line, idx) => (
    <p key={idx}>{line}</p>
  ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Details</h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                {/* <span className="font-medium">Manufacturer:</span> {product.manufacturer} */}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Categories:</span>{' '}
                {product.categories.join(', ')}
              </p>
              {product.subcategories?.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Subcategories:</span>{' '}
                  {product.subcategories.join(', ')}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">Why Choose {product.brand}?</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {whyChoose.map((point, index) => (
                <li key={index}>✔ {point}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              if (!checkIfUserIsLoggedIn()) {
                  navigate("/login")
                  return;
                  }
              addToCart(product);
              // toast.success('Added to cart!');
            }}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-8 flex items-center justify-center text-base font-medium rounded-md ${
              product.stock > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

         

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsById; 