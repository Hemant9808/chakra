import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleShopMore = () => {
    navigate('/shop/all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className=" rounded-2xl flex flex-col justify-center items-center p-8 md:p-12 max-w-3xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-3"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          
          {/* <img src={require('../../assets/images/success.gif')} alt="success" className="w-20 h-20" /> */}
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className=" font-bold text-gray-800 mb-2"
        >
        <p className="text-[3rem]">
          Thank You!
        </p>

         
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 text-lg"
        >
          Your order has been placed successfully. We'll send you an email confirmation with order details shortly.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className=" rounded-lg  flex flex-col justify-center items-center p-4 mb-8"
        >
          <p className="text-sm text-gray-600 mb-2">What happens next?</p>
          <ul className="text-sm text-gray-700 space-y-1 text-left">
            <li>• You'll receive an order confirmation email</li>
            <li>• We'll process your order within 24 hours</li>
            <li>• You'll get tracking updates via email</li>
            <li>• Delivery typically takes 3-5 business days</li>
          </ul>
        </motion.div>

        {/* Shop More Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleShopMore}
          className="w-full max-w-[15rem]  bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-4xl transition duration-300 flex items-center justify-center gap-2"
        >
          <FaShoppingBag className="text-lg" />
          Shop More Products
        </motion.button>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 space-y-3"
        >
          <button
            onClick={() => navigate('/profile')}
            className="text-green-600 hover:text-green-700 text-sm font-medium transition duration-300"
          >
            View Order History
          </button>
          <div className="text-xs text-gray-500">
            Need help? <span className="text-green-600 cursor-pointer">Contact Support</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;