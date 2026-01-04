import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../Store/useCartStore";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import LoadingSpinner from "../common/LoadingSpinner";
import { FaChevronDown, FaChevronRight, FaLock, FaShieldAlt } from "react-icons/fa";
import cartService from "../../services/cartService";
import axios from "../../axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart, getTotalDiscountPrice } = useCartStore();

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
  const [shippingOpen, setShippingOpen] = useState(true);

  // Coupon states
  const [promoInput, setPromoInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Apply coupon via API
  const handleApplyPromo = async () => {
    if (!promoInput.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      setCouponLoading(true);

      // Prepare cart data for validation - use discounted price
      const cartData = cartItems.map(item => ({
        productId: item.productId?._id || item._id,
        name: item.productId?.name || item.name,
        price: item.discountPrice || item.price, // Use discounted price if available
        quantity: item.quantity,
        category: item.productId?.category
      }));

      const response = await axios.post('/coupons/validate', {
        code: promoInput.trim(),
        cart: cartData,
        userId: localStorage.getItem('userId') // If you store userId
      });

      if (response.data.success) {
        setAppliedCoupon(response.data.coupon);
        setCouponDiscount(response.data.discount);
        toast.success(`Coupon applied! You saved ₹${response.data.discount.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      const message = error.response?.data?.message || 'Invalid coupon code';
      toast.error(message);
    } finally {
      setCouponLoading(false);
    }
  };

  // Remove applied coupon
  const handleRemovePromo = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setPromoInput("");
    toast.success("Coupon removed");
  };

  // Calculate totals with coupon
  const subtotal = getTotalPrice();
  const backendDiscountPrice = getTotalDiscountPrice();
  const baseTotal = backendDiscountPrice || subtotal;
  const total = baseTotal - couponDiscount;

  const handlePayment = async () => {
    try {
      setLoading(true);
      const isScriptLoaded = await paymentService.loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const key = await paymentService.getRazorpayKey();
      const order = await paymentService.createPaymentOrder(total);

      await orderService.createOrder({
        items: cartItems,
        totalPrice: subtotal,
        shippingPrice: 0,
        shippingAddress: formData,
        razorpay_order_id: order.order.id,
        totalDiscountPrice: Number(total),
        couponCode: appliedCoupon?.code || null,
        couponDiscount: couponDiscount || 0,
      });

      const options = {
        key: key.key,
        amount: order.order.amount,
        currency: "INR",
        name: "Ayucan",
        description: "RazorPay",
        order_id: order.order.id,
        prefill: {
          name: formData.name || "John Doe",
          email: formData.email || "john.doe@example.com",
          contact: formData.phone || "9876543210",
        },
        notes: {
          address: formData.address || "Razorpay Corporate Office",
        },
        theme: {
          color: "#2A3B28", // Ayucan Green
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
        },
        modal: {
          ondismiss: function (resp) {
            console.log("payment window closed", resp);
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      razor.on("payment.failed", function (resp) {
        console.log("payment failed", resp);
        toast.error("Payment failed. Try again.");
      });

      razor.on("payment.cancelled", function () {
        toast.info("Payment was cancelled. You can try again.");
        setLoading(false);
      });

      razor.on("modal.close", function () {
        toast.info("Payment window was closed. You can try again.");
        setLoading(false);
      });

      razor.on("payment.success", function () {
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

  const handleCod = async () => {
    console.log("COD order processing");

    try {
      console.log("order", cartItems)
      setLoading(true);
      const response = await orderService.createOrder({
        items: cartItems,
        totalPrice: subtotal,
        shippingPrice: 0,
        shippingAddress: formData,
        razorpay_order_id: "",
        totalDiscountPrice: Number(total),
        authorised: true,
        couponCode: appliedCoupon?.code || null,
        couponDiscount: couponDiscount || 0,

      });
      console.log("response.................................................................", response)
      if (response.success == true) {
        // remove cart from local storage
        cartService.clearCart();

        navigate("/order-success");
      }

    }
    catch (error) {
      toast.error("Failed to place COD order");
    }
    finally {
      setLoading(false);
    }
  }

  // Styles
  const inputClasses = "w-full p-3 rounded-lg bg-white border border-[#715036]/20 text-[#2A3B28] placeholder:text-[#715036]/40 focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all duration-300 shadow-sm";
  const sectionHeaderClasses = "flex justify-between items-center p-6 cursor-pointer hover:bg-[#FDFBF7]/50 transition bg-white";
  const sectionTitleClasses = "font-serif font-bold text-lg text-[#2A3B28] flex items-center gap-2";

  if (loading) return <LoadingSpinner />;

  return (
    // Background: Cream
    <div className="pt-30 bg-[#FDFBF7] text-[#2A3B28] min-h-screen px-4 py-12 md:px-12 lg:px-24 font-sans relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        {/* Left Column: Forms */}
        <div className="md:col-span-2 space-y-6">

          <h1 className="text-3xl font-serif font-bold text-[#2A3B28] mb-8">Secure Checkout</h1>

          {/* Email Section */}
          <div className="border border-[#715036]/10 rounded-2xl shadow-sm overflow-hidden bg-white">
            <div
              onClick={() => setEmailOpen(!emailOpen)}
              className={sectionHeaderClasses}
            >
              <h3 className={sectionTitleClasses}>
                <span className="w-6 h-6 rounded-full bg-[#2A3B28] text-white flex items-center justify-center text-xs">1</span>
                Contact Information
              </h3>
              {emailOpen ? <FaChevronDown className="text-[#C17C3A]" /> : <FaChevronRight className="text-[#C17C3A]" />}
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                emailOpen
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6 bg-white"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={inputClasses}
              />
            </motion.div>
          </div>

          {/* Shipping Section */}
          <div className="border border-[#715036]/10 rounded-2xl shadow-sm overflow-hidden bg-white">
            <div
              onClick={() => setShippingOpen(!shippingOpen)}
              className={sectionHeaderClasses}
            >
              <h3 className={sectionTitleClasses}>
                <span className="w-6 h-6 rounded-full bg-[#2A3B28] text-white flex items-center justify-center text-xs">2</span>
                Shipping Address
              </h3>
              {shippingOpen ? <FaChevronDown className="text-[#C17C3A]" /> : <FaChevronRight className="text-[#C17C3A]" />}
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                shippingOpen
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 pb-6 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (House No, Building, Street)"
                  value={formData.address}
                  onChange={handleChange}
                  className={`${inputClasses} md:col-span-2`}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`${inputClasses} md:col-span-2`}
                  required
                />
              </div>
            </motion.div>
          </div>

          {/* Payment Method Section (Info Only) */}
          <div className="border border-[#715036]/10 rounded-2xl p-6 shadow-sm bg-white flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-[#2A3B28] text-white flex items-center justify-center text-xs mt-1 flex-shrink-0">3</div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2A3B28] mb-2">Payment</h3>
              <p className="text-sm text-[#715036]/70 flex items-center gap-2">
                <FaLock size={12} /> All transactions are secure and encrypted. You will select your payment method in the next step.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="border border-[#715036]/10 rounded-2xl p-6 shadow-lg bg-white space-y-6 h-fit sticky top-24">
          <h3 className="font-serif font-bold text-xl text-[#2A3B28] pb-4 border-b border-[#715036]/10">Order Summary <span className="text-sm font-normal text-[#715036]/60">({cartItems.length} items)</span></h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => {
              const product = {
                id: item.productId?._id || item._id,
                name: item.productId?.name || "Product Name Not Available",
                image: item.productId?.images?.[0]?.url || "/placeholder.png",
                price: item.price || 0, // MRP
                discountPrice: item.discountPrice || item.price || 0, // Discounted price
                quantity: item.quantity || 1,
              };

              const hasDiscount = product.price > product.discountPrice;

              return (
                <div
                  key={product.id}
                  className="flex justify-between items-start text-sm pb-4 border-b border-[#715036]/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#715036]/10 flex-shrink-0 bg-[#FDFBF7]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#2A3B28] line-clamp-2">{product.name}</p>
                      <p className="text-[#715036]/60 text-xs mt-1">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {hasDiscount && (
                      <p className="text-[#715036]/50 line-through text-xs mb-1">
                        ₹{product.price * product.quantity}
                      </p>
                    )}
                    <p className="font-bold text-[#2A3B28]">
                      ₹{product.discountPrice * product.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Promo Code */}
          <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#715036]/10">
            <label className="text-xs font-bold text-[#715036] uppercase tracking-wider mb-2 block">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="w-full border border-[#715036]/20 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#C17C3A] bg-white"
                disabled={!!appliedCoupon || couponLoading}
              />
              {!appliedCoupon ? (
                <button
                  onClick={handleApplyPromo}
                  disabled={couponLoading}
                  className="bg-[#2A3B28] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#C17C3A] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {couponLoading ? "Verifying..." : "Apply"}
                </button>
              ) : (
                <button
                  onClick={handleRemovePromo}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shadow-sm whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
            {appliedCoupon && (
              <div className="text-green-600 text-xs mt-2 font-bold">
                <div className="flex items-center gap-1 mb-1">
                  <FaShieldAlt /> {appliedCoupon.code} applied!
                </div>
                <div className="text-[#715036]/70">
                  {appliedCoupon.description}
                </div>
                <div className="text-green-700 mt-1">
                  💰 You saved ₹{couponDiscount.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="text-sm pt-2 space-y-3">
            {/* MRP Total (if there's a product discount) */}
            {subtotal > baseTotal && (
              <div className="flex justify-between text-[#715036]/70">
                <span>MRP Total</span>
                <span className="line-through">₹{subtotal.toFixed(2)}</span>
              </div>
            )}

            {/* Product Discount */}
            {subtotal > baseTotal && (
              <div className="flex justify-between text-green-600">
                <span>Product Discount</span>
                <span className="font-bold">-₹{(subtotal - baseTotal).toFixed(2)}</span>
              </div>
            )}

            {/* Subtotal (After Product Discount) */}
            <div className="flex justify-between text-[#715036]">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">₹{baseTotal.toFixed(2)}</span>
            </div>

            {/* Coupon Discount */}
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="font-bold">-₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between text-[#715036]">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>

            {/* Total Savings Summary */}
            {(subtotal > baseTotal || couponDiscount > 0) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-semibold text-xs">Total Savings</span>
                  <span className="text-green-700 font-bold">₹{((subtotal - baseTotal) + couponDiscount).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Final Total */}
            <div className="flex justify-between items-end border-t border-[#715036]/10 pt-4">
              <span className="font-serif font-bold text-lg text-[#2A3B28]">Total</span>
              <div className="text-right">
                {(subtotal > total || couponDiscount > 0) && (
                  <span className="text-[#715036]/50 line-through text-xs block mb-1">
                    ₹{subtotal.toFixed(2)}
                  </span>
                )}
                <span className="font-bold text-xl text-[#C17C3A]">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#715036]/50 mt-1 text-center">
              *Taxes included. By placing this order, you agree to our Terms of Service.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handlePayment}
              className="w-full bg-[#2A3B28] cursor-pointer text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#C17C3A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
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
              {loading ? "Processing..." : "Pay Online"}
            </button>
            <button
              onClick={handleCod}
              className="w-full bg-white border-2 border-[#2A3B28] cursor-pointer text-[#2A3B28] py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#FDFBF7] transition-all"
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
              {loading ? "Processing..." : "Cash on Delivery"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;