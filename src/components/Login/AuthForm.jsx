import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup, loginWithGoogle } = useAuth(); // Get auth functions
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
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
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>

        {/* Google Login */}
        <motion.button
  onClick={async () => {
    const user = await loginWithGoogle();
    if (user) navigate("/"); // Redirect to home after login
  }}
  className="w-full mt-4 flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
  whileHover={{ scale: 1.05 }}
>
  <FaGoogle className="mr-2" /> Continue with Google
</motion.button>

        <div className="relative my-4">
          <hr className="border-gray-300" />
          <p className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">OR</p>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
