import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaLeaf } from "react-icons/fa"; // Added FaLeaf for logo icon
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCartStore } from "../../Store/useCartStore";
import useAuthStore from '../../Store/useAuthStore';
import { toast } from 'react-hot-toast';
import { clearLocalStorage } from "../../middleware/middleware";
import logo from "../../../public/ResourseImages/logo2.jpg"; // Adjust path as needed
// import { FaLeaf } from "react-icons/fa";
// import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems, getTotalItems, getTotalPrice } = useCartStore();
  const   userStorage = localStorage.getItem("auth-storage");
  const token = JSON.parse(userStorage)?.state?.token
  console.log("token",token);
  
  const authUser = useAuthStore(state => state.user);
  const authLogout = useAuthStore(state => state.logout);
  

  const totalCartItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop/all", label: "Shop" },
    { path: "/quiz", label: "Wellness Test" },
   
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
    { path: "/blogs", label: "Blogs" },
   
  ];

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    authLogout();
    clearLocalStorage(navigate);
    toast.success('Logged out successfully');
  };

  return (
    <header
  className="shadow sticky top-0 z-50 text-white bg-cover bg-center"
  style={{
    backgroundImage: "url('/ResourseImages/bg.png')", // your placeholder path
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backgroundBlendMode: "darken",
  }}
>
      <nav className="px-6 lg:px-10 py-4 flex justify-between items-center">
        <img src=""></img>
        <Link to="/" className="flex items-center space-x-2">
          {/* Show icon only on small screens */}
          <FaLeaf className="text-[#e5dac3] text-2xl lg:hidden" />
          
          {/* Show full logo on large screens */}
          <img
            src={logo}
            alt="Wellvas Logo"
            className="hidden lg:block h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 text-sm font-semibold uppercase">
          {navLinks.map(({ path, label }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `hover:text-gray-400 ${isActive ? "text-[#e5dac3]" : "text-white"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Icons and Auth - Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Profile */}
        {token &&  <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <FaUser className="text-xl hover:text-gray-400" />
          </div>}

          {/* Cart */}
         {token && <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-xl hover:text-gray-400" />
            {totalCartItems > 0 && (
              <motion.span
                key={totalCartItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full"
              >
                {totalCartItems}
              </motion.span>
            )}
          </div>}

          <span className="text-sm font-semibold">₹{totalPrice}</span>

          {token  ? (
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                  <span>Hi, {authUser?.firstName || 'User'}</span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu: Cart & User always visible */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Cart */}
        {token &&  <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-xl hover:text-gray-400" />
            {totalCartItems > 0 && (
              <motion.span
                key={totalCartItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full"
              >
                {totalCartItems}
              </motion.span>
            )}
          </div>}

          {/* Profile */}
        {token &&  <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <FaUser className="text-xl hover:text-gray-400" />
          </div>}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-black text-white flex flex-col space-y-6 px-6 py-10 z-50 shadow-lg lg:hidden"
          >
            {navLinks.map(({ path, label }, index) => (
              <NavLink
                key={index}
                to={path}
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {token ? (
              <div className="flex flex-col gap-4  items-center ">
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                    <span>Hi, {authUser?.firstName || 'User'}</span>
                  </button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                
                </div>
                 <button
                    onClick={handleLogout}
                    className="block w-25 bg-red-200 rounded-lg mt-3 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600  text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Login
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
