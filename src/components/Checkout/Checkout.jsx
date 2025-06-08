import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../../Store/useCartStore';
import orderService from '../../services/orderService';
import paymentService from '../../services/paymentService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import { FaLock, FaTruck, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  console.log("cart item on checkout page", cartItems)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [emailOpen, setEmailOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderProductInfo = (item) => {
    // Check if productId exists and has the required properties
    if (item.productId && item.productId._id) {
      return {
        id: item.productId._id,
        name: item.productId.name || 'Product Name Not Available',
        image: item.productId.images?.[0]?.url || '/placeholder.png',
        price: item.price || 0,
        quantity: item.quantity || 1
      };
    }
    // Fallback for items without productId
    return {
      id: item._id,
      name: 'Product Name Not Available',
      image: '/placeholder.png',
      price: item.price || 0,
      quantity: item.quantity || 1
    };
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const isScriptLoaded = await paymentService.loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const totalAmount = getTotalPrice();

      const key = await paymentService.getRazorpayKey();
      console.log("razorpay key", key) 

      const order = await paymentService.createPaymentOrder(totalAmount);
      console.log("razorpay order", order)
      
      
      const orderResponse = await orderService.createOrder({
        items: cartItems,
        totalPrice: totalAmount,
        shippingPrice: 0,
        shippingAddress: formData,
        razorpay_order_id : order.order.id,
      });


      const options = {
        key:key.key,
        amount: order.order.amount,
        currency: "INR",
        name: "Hemant Kumar",
        description: "RazorPay",
        image:
          "https://avatars.githubusercontent.com/u/143936287?s=400&u=b0405682c50a0ca7f98e02b46db96e91520df3b5&v=4",
        order_id: order.order.id,
        // callback_url: "https://medimart-nayg.onrender.com/payment/paymentverification",
        prefill: {
          name: formData.name || "John Doe",
          email: formData.email || "john.doe@example.com",
          contact: formData.phone || "9876543210",
        },
        notes: {
          address: formData.address || "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };
      console.log("options", options)
       const razor = new window.Razorpay(options)
      
      
      razor.open()

      
    } catch (error) {
      console.error("error", error.message) 
      toast.error("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white text-black min-h-screen px-4 py-8 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">

          {/* Email Section */}
          <div className="border border-gray-200 rounded-md shadow-sm">
            <div
              onClick={() => setEmailOpen(!emailOpen)}
              className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-lg">1. Enter Your Email</h3>
              {emailOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={emailOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6"
            >
              <p className="text-sm mb-2 text-gray-600">
                New customers get <span className="font-bold">10% off</span> their first order.
              </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </motion.div>
          </div>

          {/* Shipping Section */}
          <div className="border border-gray-200 rounded-md shadow-sm">
            <div
              onClick={() => setShippingOpen(!shippingOpen)}
              className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-lg">2. Shipping Information</h3>
              {shippingOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={shippingOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border px-4 py-2 rounded-md" required />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border px-4 py-2 rounded-md" required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="md:col-span-2 border px-4 py-2 rounded-md" required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border px-4 py-2 rounded-md" required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border px-4 py-2 rounded-md" required />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="md:col-span-2 border px-4 py-2 rounded-md" required />
              </div>
            </motion.div>
          </div>

          {/* Payment Method Section (Non-collapsible) */}
          <div className="border border-gray-200 rounded-md p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">3. Payment Method</h3>
            <p className="text-sm text-gray-600">You'll be redirected to payment after clicking "Place Order".</p>
          </div>
        </div>
      {/* Right: Order Summary */}
      <div className="border border-gray-200 rounded-md p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-lg">Cart ({cartItems.length})</h3>
        {cartItems.map((item) => {
          const product = renderProductInfo(item);
          return (
            <div key={product.id} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p>{product.name}</p>
                  <p className="text-gray-500">Qty: {product.quantity}</p>
                </div>
              </div>
              <p>₹{product.price * product.quantity}</p>
            </div>
          );
        })}

        <div>
          <input
            type="text"
            placeholder="Gift or promo code"
            className="w-full border px-4 py-2 rounded-md text-sm"
          />
          <button className="mt-2 w-full bg-gray-200 py-2 rounded-md text-sm font-medium text-gray-600 cursor-not-allowed" disabled>
            Apply
          </button>
        </div>

        <div className="text-sm border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Final tax and shipping calculated after shipping step is complete.
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-black cursor-pointer text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  </div>
    // <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-20 py-10">
    //   <motion.h2
    //     className="text-3xl font-semibold text-[#e5dac3] mb-6"
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     Checkout
    //   </motion.h2>

    //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //     {/* Shipping Information */}
    //     <motion.div
    //       className="bg-gray-900 p-6 rounded-lg"
    //       initial={{ opacity: 0, x: -20 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.5 }}
    //     >
    //       <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
    //       <form className="space-y-4">
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Full Name</label>
    //           <input
    //             type="text"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Email</label>
    //           <input
    //             type="email"
    //             name="email"
    //             value={formData.email}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Phone</label>
    //           <input
    //             type="tel"
    //             name="phone"
    //             value={formData.phone}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Address</label>
    //           <textarea
    //             name="address"
    //             value={formData.address}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //             required
    //           />
    //         </div>
    //         <div className="grid grid-cols-2 gap-4">
    //           <div>
    //             <label className="block text-sm font-medium mb-1">City</label>
    //             <input
    //               type="text"
    //               name="city"
    //               value={formData.city}
    //               onChange={handleChange}
    //               className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium mb-1">State</label>
    //             <input
    //               type="text"
    //               name="state"
    //               value={formData.state}
    //               onChange={handleChange}
    //               className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium mb-1">Pincode</label>
    //           <input
    //             type="text"
    //             name="pincode"
    //             value={formData.pincode}
    //             onChange={handleChange}
    //             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-[#96d569] focus:outline-none"
    //             required
    //           />
    //         </div>
    //       </form>
    //     </motion.div>

    //     {/* Order Summary */}
    //     <motion.div
    //       className="bg-gray-900 p-6 rounded-lg"
    //       initial={{ opacity: 0, x: 20 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.5 }}
    //     >
    //       <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
    //       <div className="space-y-4">
    //         {cartItems.map((item) => (
    //           <div key={item.productId._id} className="flex justify-between items-center">
    //             <div className="flex items-center space-x-4">
    //               <img
    //                 src={item.productId.images[0]?.url}
    //                 alt={item.productId.name}
    //                 className="w-16 h-16 rounded-md object-cover"
    //               />
    //               <div>
    //                 <h4 className="font-medium">{item.productId.name}</h4>
    //                 <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
    //               </div>
    //             </div>
    //             <p className="font-medium">₹{item.price * item.quantity}</p>
    //           </div>
    //         ))}
    //         <div className="border-t border-gray-700 pt-4">
    //           <div className="flex justify-between text-lg font-semibold">
    //             <span>Total</span>
    //             <span>₹{getTotalPrice()}</span>
    //           </div>
    //         </div>
    //         <button
    //           onClick={handlePayment}
    //           className="w-full bg-[#96d569] text-black py-3 rounded-md font-semibold hover:bg-[#d4be9b] transition duration-300"
    //           disabled={loading}
    //         >
    //           {loading ? 'Processing...' : 'Pay Now'}
    //         </button>
            
    //       </div>
    //     </motion.div>
    //   </div>
    // </div>
  );
};

export default Checkout; 