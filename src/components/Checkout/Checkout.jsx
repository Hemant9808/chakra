import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../Store/useCartStore";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import LoadingSpinner from "../common/LoadingSpinner";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { FaLock, FaTruck, FaCreditCard, FaShieldAlt } from "react-icons/fa";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart, getTotalDiscountPrice } =
    useCartStore();
  console.log("cart item on checkout page", cartItems);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [emailOpen, setEmailOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
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
        name: item.productId.name || "Product Name Not Available",
        image: item.productId.images?.[0]?.url || "/placeholder.png",
        price: item.price || 0,
        quantity: item.quantity || 1,
      };
    }
    // Fallback for items without productId
    return {
      id: item._id,
      name: "Product Name Not Available",
      image: "/placeholder.png",
      price: item.price || 0,
      quantity: item.quantity || 1,
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
      const totalDiscountPrice = getTotalDiscountPrice();
      console.log("total discount price", totalDiscountPrice, totalAmount);

      const key = await paymentService.getRazorpayKey();
      console.log("razorpay key", key);

      const order = await paymentService.createPaymentOrder(
        totalDiscountPrice || totalAmount
      );
      console.log("razorpay order", order);

      const orderResponse = await orderService.createOrder({
        items: cartItems,
        totalPrice: totalAmount,
        shippingPrice: 0,
        shippingAddress: formData,
        razorpay_order_id: order.order.id,
        totalDiscountPrice: Number(totalDiscountPrice),
      });

      const options = {
        key: key.key,
        amount: order.order.amount,
        currency: "INR",
        name: "Wellvas Healthcare",
        description: "RazorPay",
        // image:
        //   "https://avatars.githubusercontent.com/u/143936287?s=400&u=b0405682c50a0ca7f98e02b46db96e91520df3b5&v=4",
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
        handler: function (response) {
          toast.success("Payment successful! Order placed successfully.");
          navigate("/order-success");
          console.log("payment successful", response);
        },
        modal: {
          ondismiss: function (resp) {
            console.log("payment window closed", resp);
          },
        },
      };
      console.log("options", options);
      const razor = new window.Razorpay(options);

      razor.open();

      // Handle payment failures
      razor.on("payment.failed", function (resp) {
        console.log("payment failed", resp);
        // handlePaymentFailure(resp.error);
      });

      // Handle payment cancellations
      razor.on("payment.cancelled", function () {
        console.log("payment cancelled");
        toast.info("Payment was cancelled. You can try again.");
        setLoading(false);
      });

      // Handle when user closes payment window
      razor.on("modal.close", function () {
        console.log("payment window closed");
        toast.info("Payment window was closed. You can try again.");
        setLoading(false);
      });
      razor.on("payment.success", function (resp) {
        toast.success("Payment successful! Order placed successfully.");
        navigate("/order-success");
        setLoading(false);
      });
    } catch (error) {
      console.error("error", error.message);
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
              animate={
                emailOpen
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6"
            >
              {/* <p className="text-sm mb-2 text-gray-600">
                New customers get <span className="font-bold">10% off</span>{" "}
                their first order.
              </p> */}
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
              animate={
                shippingOpen
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="md:col-span-2 border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="md:col-span-2 border px-4 py-2 rounded-md"
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Payment Method Section (Non-collapsible) */}
          <div className="border border-gray-200 rounded-md p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">3. Payment Method</h3>
            <p className="text-sm text-gray-600">
              You'll be redirected to payment after clicking "Place Order".
            </p>
          </div>
        </div>
        {/* Right: Order Summary */}
        <div className="border border-gray-200 rounded-md p-6 shadow-sm space-y-6">
          <h3 className="font-semibold text-lg">Cart ({cartItems.length})</h3>
          {cartItems.map((item) => {
            const product = renderProductInfo(item);
            return (
              <div
                key={product.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
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
            <button
              className="mt-2 w-full bg-gray-200 py-2 rounded-md text-sm font-medium text-gray-600 cursor-not-allowed"
              disabled
            >
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
            <div className="flex  justify-between font-semibold">
              <span>Total</span>
              <span className="font-semibold flex flex-col ">
                <span className="font-semibold ml-3 text-green-500">
                  ₹{getTotalDiscountPrice() || getTotalPrice()}
                </span>
              
              {getTotalDiscountPrice() > 0 &&
                getTotalDiscountPrice() < getTotalPrice() && (
                  <span className="text-gray-500 ml-2 line-through text-sm">
                    ₹{getTotalPrice()}
                  </span>
                )}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Final tax and shipping calculated after shipping step is complete.
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-black cursor-pointer text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
            disabled={
              loading ||
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.address ||
              !formData.city ||
              !formData.state ||
              !formData.pincode
            }
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
