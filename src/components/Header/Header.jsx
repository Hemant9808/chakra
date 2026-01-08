import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
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
  const { getUserDetails } = useAuthStore();

  const userStorage = localStorage.getItem("auth-storage");
  const token = JSON.parse(userStorage)?.state?.token;

  const authUser = useAuthStore((state) => state.user);
  const authLogout = useAuthStore((state) => state.logout);

  const totalCartItems = getTotalItems();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop/all", label: "Shop" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "Our Roots" },
    { path: "/blogs", label: "Wellness Journal" },
    { path: "/evas", label: "Men's Wellness" },
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
        <div className="flex items-center space-x-6">
          {token && (
            <div className="cursor-pointer group" onClick={() => navigate("/profile")}>
              <FaUser className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition" />
            </div>
          )}

          <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition" />
            {totalCartItems > 0 && (
              <motion.span
                key={totalCartItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-[#C17C3A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              >
                {totalCartItems}
              </motion.span>
            )}
          </div>

          {!token && (
            <Link
              to="/login"
              className="hidden sm:block bg-[#2A3B28] text-[#FDFBF7] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#C17C3A] transition-colors duration-300"
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar - Deep Green Theme */}
            <motion.nav
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed inset-y-0 left-0 w-3/4 sm:w-1/2 bg-[#2A3B28] text-[#FDFBF7] flex flex-col px-8 py-8 z-[9999] shadow-2xl overflow-y-auto"
            >
              {/* Header inside sidebar */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-serif tracking-widest text-[#C17C3A]">AYUCAN</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#FDFBF7] text-2xl hover:text-[#C17C3A] transition"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6">
                {navLinks.map(({ path, label }, index) => (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `text-lg font-medium tracking-wide transition-colors ${isActive ? "text-[#C17C3A]" : "text-[#FDFBF7] hover:text-[#C17C3A]"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* User Info & Logout */}
              {token ? (
                <div className="mt-auto border-t border-[#FDFBF7]/20 pt-8">
                  <p className="text-sm text-[#FDFBF7]/70 mb-4">Welcome, {authUser?.firstName || "Wellness Seeker"}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#C17C3A] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#a6662e] transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-auto border-t border-[#FDFBF7]/20 pt-8">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#FDFBF7] text-[#2A3B28] px-4 py-3 rounded-lg font-bold">
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