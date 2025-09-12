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
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cartItems, getTotalItems, getTotalPrice } = useCartStore();
  const { getUserDetails } = useAuthStore();

  const userStorage = localStorage.getItem("auth-storage");
  const token = JSON.parse(userStorage)?.state?.token;

  const authUser = useAuthStore((state) => state.user);
  const authLogout = useAuthStore((state) => state.logout);

  console.log("authUser in header ....................",authUser);

  const totalCartItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop/all", label: "Shop" },
    // { path: "/quiz", label: "Wellness Test" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
    { path: "/blogs", label: "Blogs" },
  ];

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



  // useEffect(() => {
  //   if(token){
  //     const userDetails = getUserDetails(authUser.id);

  //     if(!userDetails.success){
  //       handleLogout();
  //       navigate("/login");
  //     }
      
  //   }
  // }, [token]);



  return (
    <header
      className="md:pt-3 md:h-25 shadow sticky top-0 z-50 text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/ResourseImages/bg.png')",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "darken",
      }}
    >
      <nav className="px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Left: Hamburger Icon (Mobile Only) */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-white">
            <FaBars />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ">
          <img
            src={logo}
            alt="Wellvas Logo"
            className="h-8 sm:h-10 w-auto object-contain"
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

        {/* Right-side Icons */}
        <div className="flex items-center space-x-4">
          {token && (
            <div className="cursor-pointer" onClick={() => navigate("/profile")}>
              <FaUser className="text-xl hover:text-gray-400" />
            </div>
          )}
          {token && (
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
          )}
          {!token && (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <motion.nav
  ref={sidebarRef}
  initial={{ x: "-100%" }}
  animate={{ x: 0 }}
  exit={{ x: "-100%" }}
  transition={{ duration: 0.3 }}
  className="fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-black text-white flex flex-col justify-start px-6 py-6 z-50"
>
  {/* Close Icon */}
  <div className="flex justify-end mb-6">
    <button
      onClick={() => setIsOpen(false)}
      className="text-white text-2xl"
    >
      <FaTimes />
    </button>
  </div>

  {/* Navigation Links */}
  <div className="flex flex-col gap-5">
    {navLinks.map(({ path, label }, index) => (
      <NavLink
        key={index}
        to={path}
        className="text-base font-medium hover:text-gray-400"
        onClick={() => setIsOpen(false)}
      >
        {label}
      </NavLink>
    ))}
  </div>

  {/* User Info & Logout - Just below links */}
  {token && (
    <div className="mt-8 flex flex-col items-center gap-2">
      <p className="text-sm text-gray-300">Hi, {authUser?.firstName || "User"}</p>
      <button
        onClick={handleLogout}
        className="bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-300 transition"
      >
        Logout
      </button>
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
