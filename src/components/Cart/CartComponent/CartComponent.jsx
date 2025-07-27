import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "../../../Store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { formatPriceDisplay } from "../../../services/productService";

const CartComponent = () => {
  const {
    cartItems,
    loading,
    error,
    fetchCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
   console.log("cart items on cart page", cartItems)


  if (loading) return <LoadingSpinner className="bg-black"/>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const totalPrice = getTotalPrice();

  const renderProductInfo = (item) => {
    // Check if productId exists and has the required properties
    if (item.productId && item.productId._id) {
      const priceInfo = formatPriceDisplay(item.productId);
      return {
        id: item.productId._id,
        name: item.productId.name || 'Product Name Not Available',
        image: item.productId.images?.[0]?.url || '/placeholder.png',
        price: priceInfo.displayPrice || 0,
        originalPrice: priceInfo.originalPrice || 0,
        hasDiscount: priceInfo.hasDiscount,
        quantity: item.quantity || 1
      };
    }
    // Fallback for items without productId
    return {
      id: item._id,
      name: 'Product Name Not Available',
      image: '/placeholder.png',
      price: item.price || 0,
      originalPrice: item.price || 0,
      hasDiscount: false,
      quantity: item.quantity || 1
    };
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-20 py-10">
    <div className="flex justify-between">
      <motion.h2
        className="text-3xl font-semibold text-[#e5dac3] mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Shopping Cart
      </motion.h2>
      {/* <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4  h-10 cursor-pointer rounded-md hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button> */}
            </div>

      {cartItems.length === 0 ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-[#e5dac3] text-black px-6 py-3 rounded-md hover:bg-[#d4c0a8] transition duration-300"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="lg:hidden space-y-6">
            {cartItems.map((item) => {
              const product = renderProductInfo(item);
              return (
                <motion.div
                  key={product.id}
                  className="bg-gray-800 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <div className="mt-2">
                        {product.hasDiscount ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 font-bold">₹{product.price}</span>
                            <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                          </div>
                        ) : (
                          <span className="text-green-400 font-bold">₹{product.price}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          className="bg-gray-700 text-white w-6 h-6 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-sm">{product.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="bg-gray-700 text-white w-6 h-6 rounded flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          ₹{product.price * product.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-600">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Total</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const product = renderProductInfo(item);
                    return (
                      <motion.tr
                        key={product.id}
                        className="border-b border-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          {product.hasDiscount ? (
                            <div className="flex flex-col">
                              <span className="text-green-400 font-bold">₹{product.price}</span>
                              <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                            </div>
                          ) : (
                            <span className="text-green-400 font-bold">₹{product.price}</span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className="bg-gray-700 text-white w-8 h-8 rounded flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className="bg-gray-700 text-white w-8 h-8 rounded flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 font-semibold">
                          ₹{product.price * product.quantity}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-8 lg:mt-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="block w-full border border-gray-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
