import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaHome, FaShoppingBag, FaEnvelope, FaBookOpen, FaCompass, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCartStore } from "../../Store/useCartStore";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { clearLocalStorage } from "../../middleware/middleware";
import logo from "../../../public/ResourseImages/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cartItems, getTotalItems, getTotalPrice } = useCartStore();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authUser = useAuthStore((state) => state.user);
  const authLogout = useAuthStore((state) => state.logout);

  const totalCartItems = getTotalItems();

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/shop/all", label: "Shop", icon: <FaShoppingBag /> },
    { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
    { path: "/about", label: "Our Roots", icon: <FaCompass /> },
    { path: "/blogs", label: "Wellness Journal", icon: <FaBookOpen /> },
    { path: "/evas", label: "Men's Wellness", icon: <FaHeart /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    authLogout();
    clearLocalStorage(navigate);
    toast.success("Logged out successfully");
  };

  return (
    <header
      // FIX: Removed bg, blur, and shadow from the parent Header tag. 
      // Changed w-screen to w-full to prevent horizontal overflow.
      className={`fixed top-0 left-0 right-0 w-full z-[9997] transition-all duration-300 ${scrolled ? "py-2" : "py-4"
        }`}
    >
      {/* FIX: Added a separate background div. 
          This applies the styles without trapping the fixed sidebar inside a filter context. */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${scrolled
          ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-md"
          : "bg-[#FDFBF7]"
          }`}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center text-[#2A3B28]">
        {/* Left: Hamburger Icon (Mobile Only) */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-[#2A3B28] hover:text-[#C17C3A] transition">
            <FaBars />
          </button>
        </div>

        {/* Logo - Centered on Mobile, Left on Desktop */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Ayucan Logo"
            className={`transition-all duration-300 object-contain ${scrolled ? "h-12" : "h-16"
              }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 text-sm font-bold uppercase tracking-widest">
          {navLinks.map(({ path, label }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `transition-colors duration-300 pb-1 border-b-2 ${isActive
                  ? "text-[#C17C3A] border-[#C17C3A]" // Active: Bronze/Copper
                  : "text-[#2A3B28] border-transparent hover:text-[#C17C3A] hover:border-[#C17C3A]" // Default: Forest Green
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {isAuthenticated ? (
            <div className="cursor-pointer group" onClick={() => navigate("/profile")}>
              <FaUser className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition" />
            </div>
          ) : (
            <Link to="/login" className="block lg:hidden cursor-pointer group">
              <FaUser className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition" />
            </Link>
          )}

          <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition" />
            {totalCartItems > 0 && (
              <motion.span
                key={totalCartItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-[#C17C3A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
              >
                {totalCartItems}
              </motion.span>
            )}
          </div>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="hidden lg:block bg-[#2A3B28] text-[#FDFBF7] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#C17C3A] transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Sidebar and Blur Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar - Deep Green Theme with Glassmorphism */}
            <motion.nav
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] sm:w-[320px] bg-[#2A3B28]/95 backdrop-blur-md border-r border-[#FDFBF7]/10 text-[#FDFBF7] flex flex-col px-6 py-6 z-[9999] shadow-2xl overflow-y-auto"
            >
              {/* Header inside sidebar */}
              <div className="flex justify-between items-center mb-8 border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xl font-serif tracking-widest text-[#C17C3A] font-bold">AYUCAN</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#FDFBF7] text-2xl hover:text-[#C17C3A] transition p-1"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation Links with Icons */}
              <div className="flex flex-col gap-3">
                {navLinks.map(({ path, label, icon }, index) => (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 text-base font-semibold tracking-wide transition-all py-3 px-4 rounded-xl ${
                        isActive 
                          ? "bg-[#C17C3A] text-white shadow-md transform scale-[1.02]" 
                          : "text-[#FDFBF7]/85 hover:text-[#C17C3A] hover:bg-[#FDFBF7]/5"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg flex-shrink-0 opacity-80">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </div>

              {/* User Info & Logout */}
              {isAuthenticated ? (
                <div className="mt-auto border-t border-[#FDFBF7]/10 pt-6">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-[#C17C3A] flex items-center justify-center text-sm font-bold text-white uppercase shadow-inner">
                      {authUser?.firstName?.charAt(0) || "W"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#FDFBF7]/50 uppercase tracking-wider font-bold">Welcome Back</p>
                      <p className="text-sm font-semibold truncate text-[#FDFBF7]">{authUser?.firstName || "Wellness Seeker"}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600/90 text-white py-3 rounded-xl text-sm font-bold hover:bg-red-700 active:scale-[0.98] transition-all shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-auto border-t border-[#FDFBF7]/10 pt-6">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)} 
                    className="block w-full text-center bg-[#C17C3A] hover:bg-[#a6662e] text-white py-3.5 rounded-xl font-bold transition active:scale-[0.98] shadow-md"
                  >
                    Login / Sign Up
                  </Link>
                </div>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;