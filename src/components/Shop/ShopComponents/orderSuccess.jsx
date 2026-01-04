import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShoppingBag, FaHistory } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleShopMore = () => {
    navigate('/shop/all');
  };

  return (
    // Background: Cream
    <div className="pt-30 min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl flex flex-col justify-center items-center p-8 md:p-12 max-w-2xl w-full text-center relative z-10 border border-[#715036]/10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 relative"
        >
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-[#2A3B28]/10 rounded-full animate-ping"></div>

          <div className="w-24 h-24 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto shadow-sm border border-[#C17C3A]/20 relative z-10">
            <FaCheckCircle className="text-6xl text-[#2A3B28]" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Order Confirmed</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28]">
            Thank You!
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[#715036]/80 mb-10 text-lg max-w-md mx-auto leading-relaxed"
        >
          Your order has been placed successfully. We'll send you an email confirmation with order details shortly.
        </motion.p>

        {/* Order Details / Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#FDFBF7] rounded-2xl p-6 mb-10 border border-[#715036]/10 w-full text-left"
        >
          <p className="text-sm font-bold text-[#2A3B28] mb-4 uppercase tracking-wider border-b border-[#715036]/10 pb-2">What happens next?</p>
          <ul className="text-sm text-[#715036]/80 space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-[#C17C3A] mt-1">●</span> You'll receive an order confirmation email
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C17C3A] mt-1">●</span> We'll process your order within 24 hours
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C17C3A] mt-1">●</span> You'll get tracking updates via email
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C17C3A] mt-1">●</span> Delivery typically takes 3-5 business days
            </li>
          </ul>
        </motion.div>

        {/* Shop More Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleShopMore}
          className="w-full max-w-xs bg-[#2A3B28] hover:bg-[#C17C3A] text-white font-bold text-sm uppercase tracking-widest py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <FaShoppingBag className="text-lg" />
          Continue Shopping
        </motion.button>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col items-center gap-4 w-full"
        >
          <button
            onClick={() => navigate('/profile')}
            className="text-[#715036] hover:text-[#2A3B28] text-sm font-bold flex items-center gap-2 transition duration-300 group"
          >
            <FaHistory className="group-hover:text-[#C17C3A]" /> View Order History
          </button>

          <div className="text-xs text-[#715036]/50 mt-2">
            Need help? <button onClick={() => navigate('/contact')} className="text-[#C17C3A] font-bold hover:underline">Contact Support</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;