import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi"; // icons

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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
      }
      navigate("/otp-verification", { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
      <motion.div
        className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? "Welcome Back 👋" : "Join Wellvas 🌿"}
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="userName"
                    className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className={`w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 rounded-md shadow-lg hover:from-green-700 hover:to-emerald-600 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
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
            className="text-green-600 font-semibold hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
