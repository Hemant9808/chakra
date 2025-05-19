import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "../../../Store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";

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
      <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4  h-10 cursor-pointer rounded-md hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button>
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
            {cartItems.map((item) => (
              <motion.div
                key={item.productId._id}
                className="bg-gray-900 p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4">
                 {item && item.productId && item.productId.name &&<img
                    src={item.productId?.images[0]?.url}
                    alt={item.productId.name}
                    className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                  />}
                  <div className="flex-1">
                    <h4
                      className="text-base font-semi00ld truncate max-w-[200px]"
                      title={item.productId.name}
                    >
                      {item.productId.name}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">₹{item.price} each</p>

                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        className="w-8 h-8 text-lg bg-gray-700 rounded hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="w-8 h-8 text-lg bg-gray-700 rounded hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-semibold text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  {cartItems.map((item) => (
                    <motion.tr
                      key={item.productId._id}
                      className="border-b border-gray-700 hover:bg-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="py-4 flex items-center space-x-4">
                       {item && item.productId && item.productId.name && <img
                          src={item.productId.images[0]?.url}
                          alt={item.productId.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />}
                        <span className="text-lg truncate max-w-[150px]">
                          {item.productId.name}
                        </span>
                      </td>
                      <td className="py-4">₹{item.price}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">₹{item.price * item.quantity}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeItem(item.productId._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <motion.div
          className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <h3 className="text-2xl font-semibold">Total: ₹{totalPrice}</h3>
            {/* <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button> */}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/checkout"
                className="bg-[#66cc1d] text-white px-6 py-3 rounded-md hover:bg-[#d4c0a8] transition duration-300"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/checkout"
               
               >
              <button className="bg-green-500 shadow-md p-2 rounded-lg cursor-pointer ">
              Buy Now
              </button>
                
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CartComponent;
