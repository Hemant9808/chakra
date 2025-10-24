import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../Store/useCartStore";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import LoadingSpinner from "../common/LoadingSpinner";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import cartService from "../../services/cartService";

// Define promo codes (frontend-only)
const PROMO_CODES = [

  {code : "MONU10",discount:10},
  {code : "HARIOM",discount:100},
  {code : "PARAS10",discount:10},
  {code : "SHIVANI10",discount:10},
  {code : "BEASTAMIT10",discount:10},
  {code : "AFG10",discount:10},
  {code : "ARVIND10",discount:10},
];

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
    // 👇 Missing states added
  const [emailOpen, setEmailOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(true);

  // Promo code states
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleApplyPromo = () => {
    const found = PROMO_CODES.find(
      (promo) => promo.code.toLowerCase() === promoInput.trim().toLowerCase()
    );
    if (found) {
      setAppliedPromo(found);
      toast.success(`${found.code} applied! You got ${found.discount}% off.`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Remove applied promo
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    toast.success("Promo code removed");
  };

  // Calculate discounted price (including backend discount logic if any)
  const subtotal = getTotalPrice();
  const backendDiscountPrice = getTotalDiscountPrice();

  let total = backendDiscountPrice || subtotal;
  if (appliedPromo) {
    total = total - (total * appliedPromo.discount) / 100;
  }

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
        couponCode: appliedPromo?.code || null,
      });

      const options = {
        key: key.key,
        amount: order.order.amount,
        currency: "INR",
        name: "Wellvas Healthcare",
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
      console.log("order",cartItems )
      setLoading(true);
        const response = await orderService.createOrder({
        items: cartItems,
        totalPrice: subtotal,
        shippingPrice: 0,
        shippingAddress: formData,
        razorpay_order_id: "",
        totalDiscountPrice: Number(total),
        authorised: true,
        couponCode: appliedPromo?.code || null,
        
      });
      console.log("response.................................................................",response )
      if(response.success == true){
        // remove cart from local storage
        cartService.clearCart();

        navigate("/order-success");
      }

    }
      catch (error) {
      }
      finally {
        setLoading(false);
      }
    }

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

          {/* Payment Method Section */}
          <div className="border border-gray-200 rounded-md p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">3. Payment Method</h3>
            <p className="text-sm text-gray-600">
              You'll be redirected to payment after clicking "Place Order".
            </p>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="border border-gray-200 rounded-md p-6 shadow-sm space-y-6">
          <h3 className="font-semibold text-lg">Cart ({cartItems.length})</h3>
          {cartItems.map((item) => {
            const product = {
              id: item.productId?._id || item._id,
              name: item.productId?.name || "Product Name Not Available",
              image: item.productId?.images?.[0]?.url || "/placeholder.png",
              price: item.price || 0,
              quantity: item.quantity || 1,
            };
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

          {/* Promo Code */}
          <div>
            <input
              type="text"
              placeholder="Gift or promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="w-full border px-4 py-2 rounded-md text-sm"
              disabled={!!appliedPromo}
            />
            {!appliedPromo ? (
              <button
                onClick={handleApplyPromo}
                className="mt-2 w-full bg-black py-2 rounded-md text-sm font-medium text-white hover:opacity-90 transition"
              >
                Apply
              </button>
            ) : (
              <button
                onClick={handleRemovePromo}
                className="mt-2 w-full bg-red-500 py-2 rounded-md text-sm font-medium text-white hover:opacity-90 transition"
              >
                Remove {appliedPromo.code}
              </button>
            )}
            {appliedPromo && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Applied <strong>{appliedPromo.code}</strong> (
                {appliedPromo.discount}% OFF)
              </p>
            )}
          </div>

          {/* Totals */}
          <div className="text-sm border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="font-semibold flex flex-col">
                <span className="font-semibold ml-3 text-green-500">
                  ₹{total.toFixed(2)}
                </span>
                {total < subtotal && (
                  <span className="text-gray-500 ml-2 line-through text-sm">
                    ₹{subtotal}
                  </span>
                )}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Final tax and shipping calculated after shipping step is complete.
            </p>
          </div>

          {/* Place Order Button */}
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
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <button
            onClick={handleCod}
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
            {loading ? "Processing..." : "Cash on Delivery"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
