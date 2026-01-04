import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { useCartStore } from "../../../Store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { getProductUrl } from "../../../utils/productNavigation";

const CartComponent = () => {
    const {
        cartItems,
        loading,
        error,
        fetchCart,
        removeItem,
        updateQuantity,
        getTotalPrice,
    } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    console.log("cart items on cart page", cartItems);

    const totaldiscountedPrice = cartItems.reduce(
        (total, item) => total + item.discountPrice * item.quantity,
        0
    );

    // Updated Spinner background to match new theme
    if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center"><LoadingSpinner /></div>;

    if (error) return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
            <div className="text-red-500 text-center font-serif text-xl">{error}</div>
        </div>
    );

    const totalPrice = getTotalPrice();

    const renderProductInfo = (item) => {
        if (item.productId && item.productId._id) {
            return {
                id: item.productId._id,
                name: item.productId.name || "Product Name Not Available",
                image: item.productId.images?.[0]?.url || "/placeholder.png",
                price: item.price || 0,
                discountPrice: item.discountPrice || null,
                quantity: item.quantity || 1,
            };
        }
        return {
            id: item._id,
            name: "Product Name Not Available",
            image: "/placeholder.png",
            price: item.price || 0,
            discountPrice: item.discountPrice || null,
            quantity: item.quantity || 1,
        };
    };

    const handleQuantityChange = (productId, newQuantity, item) => {
        if (newQuantity < 1) {
            removeItem(productId);
        } else {
            // Pass the item's price and discountPrice along with quantity
            updateQuantity(productId, newQuantity, item.price, item.discountPrice);
        }
    };

    return (
        // Background: Cream
        <div className="min-h-screen bg-[#FDFBF7] text-[#2A3B28] px-4 sm:px-6 lg:px-20 py-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center justify-between mb-8 border-b border-[#715036]/10 pb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28]">
                        Shopping Cart
                    </h2>
                    <span className="text-[#715036] font-medium hidden sm:block">
                        {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                </motion.div>

                {cartItems.length === 0 ? (
                    <motion.div
                        className="text-center py-20 bg-white rounded-2xl shadow-sm border border-[#715036]/10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaShoppingBag className="text-3xl text-[#C17C3A]/50" />
                        </div>
                        <p className="text-xl font-serif text-[#2A3B28] mb-2">Your cart is currently empty.</p>
                        <p className="text-[#715036]/70 mb-8">Unlock the power of nature with our wellness essentials.</p>
                        <Link
                            to="/shop/all"
                            className="inline-flex items-center gap-2 bg-[#2A3B28] text-white px-8 py-3 rounded-full hover:bg-[#C17C3A] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                        >
                            Continue Shopping <FaArrowRight className="text-sm" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Cart Items Section */}
                        <div className="flex-1">

                            {/* Mobile Card Layout */}
                            <div className="lg:hidden space-y-4">
                                {cartItems.map((item) => {
                                    const product = renderProductInfo(item);
                                    return (
                                        <motion.div
                                            key={item._id}
                                            className="bg-white p-4 rounded-xl shadow-sm border border-[#715036]/10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div
                                                    onClick={() => navigate(getProductUrl({ _id: product.id, name: product.name }))}
                                                    className="w-24 h-24 bg-[#FDFBF7] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4
                                                        onClick={() => navigate(getProductUrl({ _id: product.id, name: product.name }))}
                                                        className="text-lg font-serif font-bold text-[#2A3B28] truncate cursor-pointer"
                                                        title={product.name}
                                                    >
                                                        {product.name}
                                                    </h4>

                                                    <div className="mt-1 mb-3">
                                                        {product.discountPrice &&
                                                            product.discountPrice > 0 &&
                                                            product.discountPrice < product.price ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[#C17C3A] font-bold">
                                                                    ₹{product.discountPrice}
                                                                </span>
                                                                <span className="text-[#715036]/50 line-through text-sm">
                                                                    ₹{product.price}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[#2A3B28] font-bold">₹{product.price}</span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border border-[#715036]/20 rounded-lg overflow-hidden">
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(product.id, product.quantity - 1, item)
                                                                }
                                                                className="px-3 py-1 bg-[#FDFBF7] hover:bg-[#eaddcf] text-[#2A3B28] transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1 text-sm font-medium bg-white min-w-[30px] text-center">
                                                                {product.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(product.id, product.quantity + 1, item)
                                                                }
                                                                className="px-3 py-1 bg-[#FDFBF7] hover:bg-[#eaddcf] text-[#2A3B28] transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeItem(product.id)}
                                                            className="text-red-400 hover:text-red-600 p-2 transition-colors"
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
                            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-[#715036]/10 overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead className="bg-[#FDFBF7]">
                                        <tr className="text-left border-b border-[#715036]/10">
                                            <th className="py-5 px-6 font-bold text-[#715036] uppercase text-xs tracking-wider">Product</th>
                                            <th className="py-5 px-6 font-bold text-[#715036] uppercase text-xs tracking-wider">Price</th>
                                            <th className="py-5 px-6 font-bold text-[#715036] uppercase text-xs tracking-wider">Quantity</th>
                                            <th className="py-5 px-6 font-bold text-[#715036] uppercase text-xs tracking-wider text-right">Total</th>
                                            <th className="py-5 px-6 font-bold text-[#715036] uppercase text-xs tracking-wider text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {cartItems.map((item) => {
                                                const product = renderProductInfo(item);
                                                const currentPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

                                                return (
                                                    <motion.tr
                                                        key={item._id}
                                                        className="border-b border-[#715036]/10 last:border-0 hover:bg-[#FDFBF7]/50 transition-colors"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                    >
                                                        <td className="py-6 px-6">
                                                            <div
                                                                className="flex items-center space-x-4 cursor-pointer group"
                                                                onClick={() => navigate(getProductUrl({ _id: product.id, name: product.name }))}
                                                            >
                                                                <div className="w-20 h-20 bg-[#FDFBF7] rounded-lg overflow-hidden border border-[#715036]/10">
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-serif font-bold text-[#2A3B28] text-lg group-hover:text-[#C17C3A] transition-colors">
                                                                        {product.name}
                                                                    </h4>
                                                                    <p className="text-xs text-[#715036]/60 mt-1">ID: {product.id.slice(-6).toUpperCase()}</p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="py-6 px-6">
                                                            {product.discountPrice &&
                                                                product.discountPrice > 0 &&
                                                                product.discountPrice < product.price ? (
                                                                <div className="flex flex-col">
                                                                    <span className="text-[#C17C3A] font-bold text-lg">
                                                                        ₹{product.discountPrice}
                                                                    </span>
                                                                    <span className="text-[#715036]/40 line-through text-sm">
                                                                        ₹{product.price}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-[#2A3B28] font-bold text-lg">₹{product.price}</span>
                                                            )}
                                                        </td>

                                                        <td className="py-6 px-6">
                                                            <div className="inline-flex items-center border border-[#715036]/20 rounded-lg overflow-hidden bg-white">
                                                                <button
                                                                    onClick={() =>
                                                                        handleQuantityChange(product.id, product.quantity - 1, item)
                                                                    }
                                                                    className="px-3 py-2 bg-transparent hover:bg-[#FDFBF7] text-[#2A3B28] transition-colors border-r border-[#715036]/10"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-12 text-center font-medium text-[#2A3B28]">
                                                                    {product.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        handleQuantityChange(product.id, product.quantity + 1, item)
                                                                    }
                                                                    className="px-3 py-2 bg-transparent hover:bg-[#FDFBF7] text-[#2A3B28] transition-colors border-l border-[#715036]/10"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>

                                                        <td className="py-6 px-6 text-right font-bold text-[#2A3B28] text-lg">
                                                            ₹{currentPrice * product.quantity}
                                                        </td>

                                                        <td className="py-6 px-6 text-center">
                                                            <button
                                                                onClick={() => removeItem(product.id)}
                                                                className="text-[#715036]/50 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
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
                        </div>

                        {/* Checkout Summary Section - Sidebar on Large Screens */}
                        <div className="lg:w-96 flex-shrink-0">
                            <motion.div
                                className="bg-white p-8 rounded-2xl shadow-sm border border-[#715036]/10 sticky top-24"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-6 pb-4 border-b border-[#715036]/10">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-[#715036]">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                    {totaldiscountedPrice < totalPrice && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>- ₹{totalPrice - totaldiscountedPrice}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[#715036]">
                                        <span>Shipping</span>
                                        <span className="text-sm">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t border-[#715036]/10 mb-8">
                                    <span className="text-lg font-bold text-[#2A3B28]">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-serif font-bold text-[#2A3B28]">
                                            ₹{totaldiscountedPrice < totalPrice ? totaldiscountedPrice : totalPrice}
                                        </span>
                                        {totaldiscountedPrice < totalPrice && (
                                            <p className="text-sm text-[#715036]/50 line-through">₹{totalPrice}</p>
                                        )}
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link to="/checkout" className="block">
                                        <button className="w-full bg-[#2A3B28] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#C17C3A] transition-colors duration-300 shadow-md">
                                            Proceed to Checkout
                                        </button>
                                    </Link>
                                </motion.div>

                                <div className="mt-6 text-center">
                                    <Link to="/shop/all" className="text-sm text-[#715036] hover:text-[#C17C3A] font-medium underline">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartComponent;