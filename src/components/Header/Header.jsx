import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaLeaf } from "react-icons/fa"; // Added FaLeaf for logo icon
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCartStore } from "../../Store/useCartStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartItems = useCartStore((state) => state.cartItems);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const navLinks = [
    { path: "/quiz", label: "Male Wellness Test" },
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
    { path: "/blogs", label: "Blogs" },
    { path: "/shop", label: "Shop" },
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

  return (
    <header className="shadow sticky top-0 z-50 bg-black text-white">
      <nav className="px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Show icon only on small screens, full name on large */}
          <FaLeaf className="text-[#e5dac3] text-2xl lg:hidden" />
          <span className="text-2xl font-semibold tracking-wide text-[#e5dac3] hidden lg:block">
            Charak Wellness
          </span>
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
          <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <FaUser className="text-xl hover:text-gray-400" />
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
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
          </div>

          <span className="text-sm font-semibold">₹{totalPrice}</span>

          {user ? (
            <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#e5dac3] text-black px-4 py-2 rounded-md hover:bg-[#d4be9b]"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu: Cart & User always visible */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
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
          </div>

          {/* Profile */}
          <div className="cursor-pointer" onClick={() => navigate("/profile")}>
            <FaUser className="text-xl hover:text-gray-400" />
          </div>

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

            {user ? (
              <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="bg-[#e5dac3] text-black px-4 py-2 rounded-md hover:bg-[#d4be9b]"
              >
                Login
              </button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
