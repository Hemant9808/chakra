import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaHome, FaShoppingBag, FaEnvelope, FaBookOpen, FaCompass, FaHeart, FaDownload, FaMobileAlt, FaShareSquare, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCartStore } from "../../Store/useCartStore";
import useAuthStore from "../../Store/useAuthStore";
import { toast } from "react-hot-toast";
import { clearLocalStorage } from "../../middleware/middleware";
import logo from "../../../public/ResourseImages/logo.png";
import { productService } from "../../services/productService";

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

  // PWA In-App Install Prompt States
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent browser mini-infobar from appearing on mobile automatically
      e.preventDefault();
      // Store the event to be triggered manually
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if user is on iOS/Safari and is NOT already launched in standalone mode
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the browser installation prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    console.log(`[PWA Install] User response to installation: ${outcome}`);
    
    // Clear prompt and close sidebar drawer
    setInstallPrompt(null);
    setIsOpen(false);
  };

  // Fuzzy Search Overlay States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const results = await productService.searchProducts(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle escape key to close search overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

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
      className={`fixed top-0 left-0 right-0 w-full z-[9997] transition-all duration-300`}
    >
      {/* Prepaid Discount Promo Marquee Banner */}
      <div className="w-full bg-[#2A3B28] text-[#FDFBF7] py-1.5 sm:py-2.5 overflow-hidden border-b border-[#C17C3A]/20 transition-all duration-300 relative z-[9999] select-none">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: marquee-scroll 30s linear infinite;
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
        `}} />
        <div className="marquee-container text-[10px] sm:text-xs font-serif font-semibold tracking-wider flex gap-12 items-center">
          {/* Marquee Content Set 1 */}
          <div className="flex items-center gap-12 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <span className="bg-[#C17C3A] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded font-sans uppercase">Prepaid Deal</span>
              <span>⚡ PAY ONLINE & SAVE EXTRA: Save <strong className="text-[#C17C3A]">₹50 - ₹200 Instantly</strong> on Prepaid Orders! (Min. ₹50 guaranteed)</span>
            </span>
            <span className="text-[#C17C3A]">|</span>
            <span>✨ LIMITED TIME PREPAID OFFER: Save <strong className="text-[#C17C3A]">₹50 to ₹200 instantly</strong> on paying online via UPI, Cards, Netbanking, or Wallets! ✨</span>
            <span className="text-[#C17C3A]">|</span>
            <span>🌿 Skip the COD Queue: Get <strong className="text-[#C17C3A]">Express Shipping</strong> & guaranteed instant discounts up to ₹200 on all prepaid checkouts! 🌿</span>
            <span className="text-[#C17C3A]">|</span>
          </div>
          {/* Marquee Content Set 2 (Duplicate for Seamless Loop) */}
          <div className="flex items-center gap-12 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <span className="bg-[#C17C3A] text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded font-sans uppercase">Prepaid Deal</span>
              <span>⚡ PAY ONLINE & SAVE EXTRA: Save <strong className="text-[#C17C3A]">₹50 - ₹200 Instantly</strong> on Prepaid Orders! (Min. ₹50 guaranteed)</span>
            </span>
            <span className="text-[#C17C3A]">|</span>
            <span>✨ LIMITED TIME PREPAID OFFER: Save <strong className="text-[#C17C3A]">₹50 to ₹200 instantly</strong> on paying online via UPI, Cards, Netbanking, or Wallets! ✨</span>
            <span className="text-[#C17C3A]">|</span>
            <span>🌿 Skip the COD Queue: Get <strong className="text-[#C17C3A]">Express Shipping</strong> & guaranteed instant discounts up to ₹200 on all prepaid checkouts! 🌿</span>
            <span className="text-[#C17C3A]">|</span>
          </div>
        </div>
      </div>

      {/* FIX: Added a separate background div. 
          This applies the styles without trapping the fixed sidebar inside a filter context. */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${scrolled
          ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-md"
          : "bg-[#FDFBF7]"
          }`}
      />

      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center text-[#2A3B28] transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
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
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="cursor-pointer group p-1 flex items-center justify-center border-none bg-transparent focus:outline-none"
            title="Search Products"
            aria-label="Search"
          >
            <FaSearch className="text-xl text-[#2A3B28] group-hover:text-[#C17C3A] transition-colors duration-300" />
          </button>

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
              <div className="flex justify-between items-center mb-6 border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xl font-serif tracking-widest text-[#C17C3A] font-bold">AYUCAN</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#FDFBF7] text-2xl hover:text-[#C17C3A] transition p-1"
                >
                  <FaTimes />
                </button>
              </div>

              {/* User Profile Card (Welcome Back User) at the top */}
              {isAuthenticated && (
                <div className="flex items-center gap-3 mb-6 px-3 py-2.5 bg-[#FDFBF7]/5 rounded-2xl border border-[#FDFBF7]/5 shadow-inner">
                  <div className="w-9 h-9 rounded-full bg-[#C17C3A] flex items-center justify-center text-sm font-bold text-white uppercase shadow-inner flex-shrink-0">
                    {authUser?.firstName?.charAt(0) || "W"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#C17C3A] uppercase tracking-wider font-extrabold">Welcome Back</p>
                    <p className="text-sm font-bold truncate text-[#FDFBF7]">{authUser?.firstName || "Wellness Seeker"}</p>
                  </div>
                </div>
              )}

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

              {/* PWA In-App Install Guide & Trigger */}
              {installPrompt && (
                <div className="mt-6 p-4 rounded-2xl bg-[#C17C3A]/15 border border-[#C17C3A]/30 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#C17C3A] text-white">
                      <FaMobileAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-[#C17C3A] font-bold uppercase tracking-wider">Install App</p>
                      <p className="text-xs text-[#FDFBF7]/85">Get the complete Ayucan experience</p>
                    </div>
                  </div>
                  <button
                    onClick={handleInstallClick}
                    className="w-full bg-[#C17C3A] hover:bg-[#a6662e] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <FaDownload />
                    <span>Install Ayucan App</span>
                  </button>
                </div>
              )}

              {isIOS && (
                <div className="mt-6 p-4 rounded-2xl bg-[#C17C3A]/15 border border-[#C17C3A]/30 flex flex-col gap-2 text-[#FDFBF7]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#C17C3A] text-white">
                      <FaMobileAlt className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-[#C17C3A] font-bold uppercase tracking-wider">Install on iPhone</p>
                      <p className="text-xs text-[#FDFBF7]/85">Instant launch from Home Screen</p>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#FDFBF7]/70 mt-1">
                    Tap Safari's <FaShareSquare className="inline text-[#C17C3A] mx-0.5" /> Share icon below, scroll down, and select <span className="font-bold text-[#C17C3A]">"Add to Home Screen"</span>.
                  </p>
                </div>
              )}

              {/* User Logout or Login at the bottom */}
              <div className="mt-auto border-t border-[#FDFBF7]/10 pt-6">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600/90 text-white py-3 rounded-xl text-sm font-bold hover:bg-red-700 active:scale-[0.98] transition-all shadow-md"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)} 
                    className="block w-full text-center bg-[#C17C3A] hover:bg-[#a6662e] text-white py-3.5 rounded-xl font-bold transition active:scale-[0.98] shadow-md"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Visual Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto"
          >
            {/* Centered Spotlight Card */}
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()} // Prevent card click from closing
              className="w-full max-w-2xl bg-[#2A3B28]/95 backdrop-blur-md border border-[#FDFBF7]/15 shadow-[0_0_50px_-12px_rgba(193,124,58,0.25)] rounded-3xl mt-16 sm:mt-24 overflow-hidden flex flex-col max-h-[75vh]"
            >
              {/* Search Input Area */}
              <div className="relative border-b border-[#FDFBF7]/10 p-4 flex items-center">
                <FaSearch className="text-[#C17C3A] text-lg ml-2 mr-4" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search premium ayurveda, organic herbs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[#FDFBF7] placeholder-[#FDFBF7]/40 text-base sm:text-lg focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#FDFBF7]/40 hover:text-white p-1"
                  >
                    <FaTimes />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-[#C17C3A] hover:text-[#e09b53] ml-4 px-2 py-1 transition-all"
                >
                  <span className="hidden sm:inline">ESC</span>
                  <span className="inline sm:hidden">Close</span>
                </button>
              </div>

              {/* Search Body / Results */}
              <div className="flex-1 overflow-y-auto p-4 max-h-[50vh] scrollbar-thin">
                {searchLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 rounded-full border-2 border-[#C17C3A]/20"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-t-[#C17C3A] animate-spin"></div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C17C3A] animate-pulse">Seeking remedies...</span>
                  </div>
                ) : searchQuery && searchResults.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-[#FDFBF7]/60 italic font-serif text-base mb-1">No matching remedies found.</p>
                    <p className="text-[#FDFBF7]/40 text-xs font-sans">Try searching for generic terms like "Shilajit", "Multivitamin", or "Musali".</p>
                  </div>
                ) : searchQuery ? (
                  <div className="flex flex-col gap-2.5">
                    {searchResults.map((prod) => (
                      <Link
                        key={prod._id}
                        to={`/product/${prod._id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] hover:bg-[#C17C3A]/10 hover:border-[#C17C3A]/30 p-3 rounded-2xl transition-all duration-300 group relative pl-5 overflow-hidden"
                      >
                        {/* Hover left accent bar indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C17C3A] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                        {/* Product Thumbnail */}
                        <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex-shrink-0 flex items-center justify-center shadow-inner group-hover:scale-[1.04] transition-transform duration-300">
                          <img
                            src={prod.images?.[0]?.url || "/placeholder.png"}
                            alt={prod.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>

                        {/* Title & Brand */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#C17C3A] font-bold uppercase tracking-widest leading-none">{prod.brand || "Ayucan"}</span>
                            {prod.averageRating > 0 && (
                              <span className="text-[8px] bg-white/10 text-[#FDFBF7]/85 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                ★ {(prod.averageRating || 4.8).toFixed(1)}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-[#FDFBF7] group-hover:text-[#C17C3A] transition-colors truncate mt-1">{prod.name}</h4>
                          <p className="text-[10px] text-[#FDFBF7]/40 truncate mt-0.5">{prod.description}</p>
                        </div>

                        {/* Price & Action Tag */}
                        <div className="text-right flex-shrink-0 flex items-center gap-4">
                          {prod.discountPrice > 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="text-xs sm:text-sm font-bold text-[#C17C3A]">₹{prod.discountPrice}</span>
                              <span className="text-[10px] line-through text-[#FDFBF7]/40">₹{prod.price}</span>
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm font-bold text-[#FDFBF7]">₹{prod.price}</span>
                          )}

                          {/* Action Arrow */}
                          <div className="text-[#FDFBF7]/25 group-hover:text-[#C17C3A] transition-all duration-300 transform group-hover:translate-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  /* Suggestion Helper Panel when search is empty */
                  <div className="py-2">
                    <p className="text-[#C17C3A] font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C17C3A] animate-ping" />
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {["Shilajit", "Multivitamin", "Ashwagandha", "Musali", "Men's Wellness"].map((keyword) => (
                        <button
                          key={keyword}
                          onClick={() => setSearchQuery(keyword)}
                          className="bg-white/[0.03] border border-white/[0.08] hover:bg-[#C17C3A]/20 hover:border-[#C17C3A]/30 text-[#FDFBF7]/80 hover:text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Helper Actions (Hidden on Mobile) */}
              <div className="hidden sm:flex bg-[#2A3B28]/40 border-t border-[#FDFBF7]/10 px-4 py-2.5 items-center justify-between text-[9px] text-[#FDFBF7]/40">
                <div className="flex gap-4">
                  <span><span className="bg-white/10 text-[#FDFBF7]/70 px-1 rounded">↑↓</span> to navigate</span>
                  <span><span className="bg-white/10 text-[#FDFBF7]/70 px-1 rounded">↵</span> to select</span>
                </div>
                <span>Press <span className="bg-white/10 text-[#FDFBF7]/70 px-1 rounded">esc</span> to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;