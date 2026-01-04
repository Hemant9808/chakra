import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const resetPassword = useAuthStore((state) => state.resetPassword);
    const loading = useAuthStore((state) => state.loading);

    useEffect(() => {
        // Check if token exists
        if (!token) {
            toast.error("Invalid or missing reset token");
            navigate("/login");
        }
    }, [token, navigate]);

    // Password strength calculator
    const calculatePasswordStrength = (password) => {
        if (!password) return "";
        if (password.length < 6) return "weak";
        if (password.length < 10) return "medium";
        if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return "strong";
        }
        return "medium";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update password strength for new password field
        if (name === "newPassword") {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Validate password length
        if (formData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            await resetPassword(token, formData.newPassword);
            toast.success("Password reset successful! Please login with your new password.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    };

    // Shared style classes
    const inputContainerClass = "relative";
    const inputIconClass = "absolute left-3 top-3.5 text-[#715036]/60";
    const inputFieldClass = "w-full pl-10 pr-10 py-2.5 mt-1 bg-white border border-[#715036]/20 text-[#2A3B28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all placeholder-gray-400";
    const labelClass = "block text-sm font-semibold text-[#715036] tracking-wide";

    // Password strength colors
    const getStrengthColor = () => {
        switch (passwordStrength) {
            case "weak":
                return "bg-red-500";
            case "medium":
                return "bg-yellow-500";
            case "strong":
                return "bg-green-500";
            default:
                return "bg-gray-300";
        }
    };

    const getStrengthWidth = () => {
        switch (passwordStrength) {
            case "weak":
                return "w-1/3";
            case "medium":
                return "w-2/3";
            case "strong":
                return "w-full";
            default:
                return "w-0";
        }
    };

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
                <motion.h2
                    className="text-3xl font-bold text-center text-[#715036] mb-2 font-serif"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Reset Password
                </motion.h2>

                <p className="text-center text-[#2A3B28]/70 mb-8 text-sm">
                    Enter your new password below
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div>
                        <label className={labelClass}>New Password</label>
                        <div className={inputContainerClass}>
                            <FiLock className={inputIconClass} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                className={inputFieldClass}
                                placeholder="••••••••"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-[#715036]/60 hover:text-[#715036] transition-colors"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-[#2A3B28]/60">Password strength:</span>
                                    <span className={`text-xs font-semibold capitalize ${passwordStrength === "weak" ? "text-red-600" :
                                            passwordStrength === "medium" ? "text-yellow-600" :
                                                passwordStrength === "strong" ? "text-green-600" : ""
                                        }`}>
                                        {passwordStrength}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className={labelClass}>Confirm Password</label>
                        <div className={inputContainerClass}>
                            <FiLock className={inputIconClass} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={inputFieldClass}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3.5 text-[#715036]/60 hover:text-[#715036] transition-colors"
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {/* Password match indicator */}
                        {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                            <div className="flex items-center mt-2 text-red-600 text-xs">
                                <FiAlertCircle className="mr-1" />
                                Passwords do not match
                            </div>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        className={`w-full mt-6 bg-[#C17C3A] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#a6662e] transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </motion.button>
                </form>

                <p className="mt-8 text-center text-sm text-[#2A3B28]/80">
                    Remember your password?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-[#C17C3A] font-bold hover:text-[#715036] hover:underline transition-all"
                    >
                        Login
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
