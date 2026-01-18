import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi"; // icons

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const sanitizedValue = value.replace(/\D/g, "");
      if (sanitizedValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: sanitizedValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Login successful!");

        // Check if user came from instant-reward page (QR code scan) or other protected routes
        const redirectPath = location.state?.from || '/';
        navigate(redirectPath);
      } else {
        const requiredFields = [
          "firstName",
          "lastName",
          "userName",
          "email",
          "phone",
          "password",
        ];
        const missingFields = requiredFields.filter((field) => !formData[field]);

        if (missingFields.length > 0) {
          toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
          return;
        }

        await signup(formData);
        toast.success("Account created successfully!");
        navigate("/otp-verification", { state: { email: formData.email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Shared input style classes to keep JSX clean
  const inputContainerClass = "relative";
  const inputIconClass = "absolute left-3 top-3.5 text-[#715036]/60"; // Earthy brown icon
  const inputFieldClass = "w-full pl-10 pr-3 py-2.5 mt-1 bg-white border border-[#715036]/20 text-[#2A3B28] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all placeholder-gray-400";
  const labelClass = "block text-sm font-semibold text-[#715036] tracking-wide";

  return (
    // Background: Deep Forest Green
    <div className="flex items-center pt-30 justify-center min-h-screen bg-[#2A3B28] p-4 relative overflow-hidden">

      {/* Decorative background circle (optional aesthetic touch) */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        // Card: Cream background with earthy text
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
          {isLogin ? "Welcome Back" : "Join Ayucan"}
        </motion.h2>

        <p className="text-center text-[#2A3B28]/70 mb-8 text-sm">
          {isLogin ? "Continue your wellness journey" : "Unlock nature's power today"}
        </p>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative mb-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    First Name
                  </label>
                  <div className={inputContainerClass}>
                    <FiUser className={inputIconClass} />
                    <input
                      type="text"
                      name="firstName"
                      className={inputFieldClass}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>
                    Last Name
                  </label>
                  <div className={inputContainerClass}>
                    <FiUser className={inputIconClass} />
                    <input
                      type="text"
                      name="lastName"
                      className={inputFieldClass}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Username
                </label>
                <div className={inputContainerClass}>
                  <FiUser className={inputIconClass} />
                  <input
                    type="text"
                    name="userName"
                    className={inputFieldClass}
                    placeholder="johndoe123"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Phone Number
                </label>
                <div className={inputContainerClass}>
                  <FiPhone className={inputIconClass} />
                  <input
                    type="tel"
                    name="phone"
                    className={inputFieldClass}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <label className={labelClass}>
              Email
            </label>
            <div className={inputContainerClass}>
              <FiMail className={inputIconClass} />
              <input
                type="email"
                name="email"
                className={inputFieldClass}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Password
            </label>
            <div className={inputContainerClass}>
              <FiLock className={inputIconClass} />
              <input
                type="password"
                name="password"
                className={inputFieldClass}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {isLogin && (
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-[#C17C3A] font-semibold hover:text-[#715036] hover:underline transition-all"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <motion.button
            type="submit"
            // Button: Bronze background with slight earthy hover state
            className={`w-full mt-6 bg-[#C17C3A] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#a6662e] transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-[#2A3B28]/80">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                phone: "",
                password: "",
              });
            }}
            // Link: Bronze/Copper Color
            className="text-[#C17C3A] font-bold hover:text-[#715036] hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;