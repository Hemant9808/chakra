import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast"; // Add toast for notifications

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Get auth functions and state from Zustand store
  // const { login, signup, loading, error } = useAuthStore((state) => ({
  //   login: state.login,
  //   signup: state.signup,
  //   loading: state.loading,
  //   error: state.error,
  // }));
  const login = useAuthStore((state) => state.login);
const signup = useAuthStore((state) => state.signup);
const loading = useAuthStore((state) => state.loading);
const error = useAuthStore((state) => state.error);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Login successful!");
      } else {
        // Validate all required fields for signup
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
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-500 p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm">
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
            className="text-green-600 hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
