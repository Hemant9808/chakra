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

   const totaldiscountedPrice = cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0);


  if (loading) return <LoadingSpinner className="bg-black"/>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const totalPrice = getTotalPrice();

  const renderProductInfo = (item) => {
    // Check if productId exists and has the required properties
    if (item.productId && item.productId._id) {
      return {
        id: item.productId._id,
        name: item.productId.name || 'Product Name Not Available',
        image: item.productId.images?.[0]?.url || '/placeholder.png',
        price: item.price || 0,
        discountPrice: item.discountPrice || null,
        quantity: item.quantity || 1
      };
    }
    // Fallback for items without productId
    return {
      id: item._id,
      name: 'Product Name Not Available',
      image: '/placeholder.png',
      price: item.price || 0,
      discountPrice: item.discountPrice || null,
      quantity: item.quantity || 1
    };
  };

  // Helper function to get effective price (discount if available and less than original, otherwise original)
  const getEffectivePrice = (item) => {
    if (item.discountPrice && item.discountPrice > 0 && item.discountPrice < item.price) {
      return item.discountPrice;
    }
    return item.price;
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
            className="mt-4 inline-block bg-[#e5dac3] text-white px-6 py-3 rounded-md hover:bg-[#d4c0a8] transition duration-300"
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
                  className="bg-gray-900 p-4 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4
                        className="text-base font-semibold truncate max-w-[200px]"
                        title={product.name}
                      >
                        {product.name}
                      </h4>
                      <div className="text-sm text-gray-400 mt-1">
                        {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price ? (
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">₹{product.discountPrice}</span>
                            <span className="text-gray-500 line-through">₹{product.price}</span>
                          </div>
                        ) : (
                          <span>₹{product.price} each</span>
                        )}
                      </div>

                      <div className="flex items-center mt-3 space-x-3">
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          className="w-8 h-8 text-lg bg-gray-700 rounded hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="text-base">{product.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="w-8 h-8 text-lg bg-gray-700 rounded hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="font-semibold text-sm">
                          {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">₹{product.discountPrice * product.quantity}</span>
                              <span className="text-gray-500 line-through text-xs">₹{product.price * product.quantity}</span>
                            </div>
                          ) : (
                            <span>₹{product.price * product.quantity}</span>
                          )}
                        </div>
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
                        className="border-b border-gray-700 hover:bg-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="py-4 flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <span className="text-lg truncate max-w-[150px]">
                            {product.name}
                          </span>
                        </td>
                        <td className="py-4">
                          {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price ? (
                            <div className="flex flex-col">
                              <span className="text-green-400">₹{product.discountPrice}</span>
                              <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                            </div>
                          ) : (
                            <span>₹{product.price}</span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{product.quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      
                        <td className="py-4">
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-red-500 hover:text-red-700"
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
            <h3 className="text-2xl font-semibold">Total: ₹
            {totaldiscountedPrice < totalPrice ? totaldiscountedPrice : totalPrice}
           { totaldiscountedPrice > 0 && totaldiscountedPrice < totalPrice && <span className="text-gray-500 ml-2 line-through text-sm">₹{totalPrice}</span>}
            </h3>
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
                
              >
              <button className="bg-[#499611] text-white px-6 py-3 rounded-md hover:bg-[#499611] cursor-pointer transition duration-300">
                Proceed to Checkout
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
