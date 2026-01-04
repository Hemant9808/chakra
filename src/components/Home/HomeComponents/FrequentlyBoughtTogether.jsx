import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";
import { productService } from "../../../services/productService";
import { PriceDisplay } from "../../../utils/priceUtils";
import { FaShoppingBag } from "react-icons/fa";
import { checkIfUserIsLoggedIn } from "../../../middleware/middleware";
import { toast } from "react-hot-toast";
import { getProductUrl } from "../../../utils/productNavigation";

const ProductSkeleton = () => (
    <div className="bg-white shadow-sm border border-[#715036]/10 p-4 rounded-2xl w-64 sm:w-full max-w-sm flex-shrink-0 flex flex-col items-center">
        <div className="w-full h-48 bg-[#715036]/10 rounded-xl animate-pulse" />
        <div className="w-3/4 h-6 bg-[#715036]/10 rounded mt-4 animate-pulse" />
        <div className="w-1/2 h-4 bg-[#715036]/10 rounded mt-2 animate-pulse" />
        <div className="w-1/3 h-6 bg-[#715036]/10 rounded mt-3 animate-pulse" />
        <div className="w-full h-10 bg-[#715036]/10 rounded-full mt-4 animate-pulse" />
    </div>
);

const FrequentlyBoughtTogether = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addToCart = useCartStore((state) => state.addToCart);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComboProducts = async () => {
            try {
                setLoading(true);
                // Keep the original logic: fetch by "Combo" category
                const comboProducts = await productService.getProductsByCategory("Combo");
                setProducts(comboProducts);
            } catch (error) {
                setError("Failed to fetch recommended products.");
            } finally {
                setLoading(false);
            }
        };
        fetchComboProducts();
    }, []);

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        if (!checkIfUserIsLoggedIn()) {
            // Optional: You might want to let them add to cart without login, 
            // but if your logic requires it, keep this check.
            // navigate("/login"); 
            // return;
        }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
        // navigate("/cart"); // Optional: Redirect or stay on page
    };


    // --- Loading State ---
    if (loading) {
        return (
            <section className="bg-[#FDFBF7] py-20 px-4 sm:px-8 border-t border-[#715036]/5">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4">
                        Frequently Bought Together
                    </h2>
                    <div className="flex justify-center gap-6 overflow-hidden px-4">
                        {Array(3).fill(null).map((_, index) => <ProductSkeleton key={index} />)}
                    </div>
                </div>
            </section>
        );
    }

    // --- Error or Empty State ---
    if (error || products.length === 0) {
        return (
            <section className="bg-[#FDFBF7] py-20 px-4 sm:px-8 border-t border-[#715036]/5">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4">
                        Frequently Bought Together
                    </h2>
                    <p className="text-[#715036]/60 italic">
                        {error || "No combo products available at the moment."}
                    </p>
                </div>
            </section>
        );
    }

    // --- Main Content ---
    return (
        <section className="bg-[#FDFBF7] py-20 px-4 sm:px-8 border-t border-[#715036]/5 relative">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17C3A]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4">
                    Perfect Pairs
                </h2>
                <div className="h-1 w-24 bg-[#C17C3A] mx-auto rounded-full mb-6"></div>
                <p className="text-[#715036]/80 max-w-2xl mx-auto font-medium">
                    Maximize your wellness journey with our curated product combinations.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className={`flex gap-6 overflow-x-auto pb-8 pt-2 px-4 scrollbar-hide scroll-smooth snap-x ${products.length < 3 ? "lg:justify-center" : ""
                        }`}>
                        {products.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(getProductUrl(product))}
                                // Card Style: White with Earthy Border & Shadow
                                className="bg-white min-w-[280px] w-[280px] sm:w-[300px] shadow-sm hover:shadow-xl border border-[#715036]/10 rounded-2xl p-5 flex flex-col items-center flex-shrink-0 snap-center transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            >
                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-[#C17C3A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="w-full h-56 bg-[#FDFBF7] rounded-xl overflow-hidden mb-4 relative p-4 flex items-center justify-center">
                                    <img
                                        src={product.images[0]?.url || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <span className="absolute top-2 right-2 bg-[#2A3B28] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                        Combo
                                    </span>
                                </div>

                                <div className="text-center w-full flex-1 flex flex-col">
                                    <p className="text-[#C17C3A] text-xs font-bold uppercase tracking-widest mb-1">
                                        {product.brand || "Ayucan"}
                                    </p>
                                    <h3 className="text-lg font-serif font-bold text-[#2A3B28] line-clamp-1 mb-2 group-hover:text-[#C17C3A] transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="mb-4">
                                        <PriceDisplay product={product} />
                                    </div>

                                    <div className="mt-auto w-full">
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            disabled={product.stock <= 0}
                                            className={`w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300 shadow-md ${product.stock <= 0
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-[#2A3B28] text-white hover:bg-[#C17C3A] group-hover:shadow-lg"
                                                }`}
                                        >
                                            <FaShoppingBag className="text-xs" />
                                            {product.stock <= 0 ? "Out of Stock" : "Add Combo"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="text-center mt-10">
                <button
                    onClick={() => navigate("/shop/all")}
                    className="inline-block border-2 border-[#2A3B28] text-[#2A3B28] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#2A3B28] hover:text-white transition-all duration-300"
                >
                    View All Combos
                </button>
            </div>
        </section>
    );
};

export default FrequentlyBoughtTogether;