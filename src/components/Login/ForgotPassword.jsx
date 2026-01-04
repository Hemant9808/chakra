import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { FiMail, FiArrowLeft, FiCheck } from "react-icons/fi";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const forgotPassword = useAuthStore((state) => state.forgotPassword);
    const loading = useAuthStore((state) => state.loading);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setEmailSent(true);
            toast.success("Password reset link sent to your email!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset email");
        }
    };

    // Shared style classes matching AuthForm design
    const inputContainerClass = "relative";
    const inputIconClass = "absolute left-3 top-3.5 text-[#715036]/60";
    const inputFieldClass = "w-full pl-10 pr-3 py-2.5 mt-1 bg-white border border-[#715036]/20 text-[#2A3B28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all placeholder-gray-400";
    const labelClass = "block text-sm font-semibold text-[#715036] tracking-wide";

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#2A3B28] p-4 relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl p-8 border border-[#715036]/10 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {!emailSent ? (
                    <>
                        <motion.h2
                            className="text-3xl font-bold text-center text-[#715036] mb-2 font-serif"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Forgot Password?
                        </motion.h2>

                        <p className="text-center text-[#2A3B28]/70 mb-8 text-sm">
                            Enter your email and we'll send you a reset link
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className={labelClass}>Email Address</label>
                                <div className={inputContainerClass}>
                                    <FiMail className={inputIconClass} />
                                    <input
                                        type="email"
                                        name="email"
                                        className={inputFieldClass}
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className={`w-full mt-6 bg-[#C17C3A] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#a6662e] transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </motion.button>
                        </form>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 flex items-center justify-center w-full text-[#C17C3A] font-semibold hover:text-[#715036] transition-all"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Login
                        </button>
                    </>
                ) : (
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiCheck className="text-green-600 text-3xl" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#715036] mb-3 font-serif">
                            Check Your Email
                        </h2>

                        <p className="text-[#2A3B28]/70 mb-6 text-sm">
                            We've sent a password reset link to <br />
                            <span className="font-semibold text-[#715036]">{email}</span>
                        </p>

                        <p className="text-[#2A3B28]/60 text-xs mb-6">
                            The link will expire in 10 minutes. If you don't see the email, check your spam folder.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full bg-[#C17C3A] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#a6662e] transition-all duration-300"
                        >
                            Back to Login
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
