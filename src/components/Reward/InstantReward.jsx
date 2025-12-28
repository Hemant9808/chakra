import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2, Camera, Copy, Lock, LogIn } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAuthStore from "../../Store/useAuthStore";
// yo yo reward
// --- Sub-component: Confetti Particle ---
const ConfettiPiece = ({ delay }) => {
  const randomColor = ["#C17C3A", "#2A3B28", "#FFD700", "#FDFBF7"];
  const color = randomColor[Math.floor(Math.random() * randomColor.length)];
  const xStart = Math.random() * 100;

  return (
    <motion.div
      initial={{ y: -20, x: `${xStart}vw`, opacity: 1, rotate: 0 }}
      animate={{
        y: "110vh",
        rotate: 360,
        x: `${xStart + (Math.random() * 20 - 10)}vw`
      }}
      transition={{
        duration: Math.random() * 2 + 3,
        delay: delay,
        ease: "linear",
        repeat: Infinity
      }}
      style={{
        position: "absolute",
        top: 0,
        width: "10px",
        height: "20px",
        backgroundColor: color,
        borderRadius: "4px",
      }}
    />
  );
};

// --- Sub-component: Sparkling Star ---
const SparkleIcon = ({ className }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    <Sparkles size={24} fill="currentColor" />
  </motion.div>
);

const InstantReward = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const [rewardCode, setRewardCode] = useState("");
  const [cashbackAmount, setCashbackAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- CLAIM LIMIT LOGIC ---
  const MAX_CLAIMS = 5;
  const [canClaim, setCanClaim] = useState(true);

  useEffect(() => {
    // 1. Check if user is logged in and has reached the limit
    if (user) {
      const storageKey = `ayucan_claims_${user._id || user.id}`;
      const currentClaims = parseInt(localStorage.getItem(storageKey) || "0");

      if (currentClaims >= MAX_CLAIMS) {
        setCanClaim(false);
        toast.error("You have reached the maximum limit of 5 rewards!");
        navigate("/shop/all"); // Redirect away immediately if limit reached
      } else {
        // Generate Reward Data ONLY if under limit
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 5; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setRewardCode(code);

        const randomAmount = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
        setCashbackAmount(randomAmount);

        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 6000);
        return () => clearTimeout(timer);
      }
    } else {
      setShowConfetti(false);
    }
  }, [user, navigate]);

  const handleLoginRedirect = () => {
    // Pass current location in state so Login page can redirect back here
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleWhatsAppClaim = () => {
    const phoneNumber = "918799722636";
    const message = `Woohoo! I just scanned the QR code and won *₹${cashbackAmount} Cashback* from Ayucan!

*Reward Code:* ${rewardCode}

*User Details:*
Email: ${user?.email || "N/A"}
User ID: ${user?._id || user?.id || "N/A"}

I am attaching the screenshot of my reward.

Please transfer the amount to my UPI ID:

[Enter your UPI ID here]`;

    // 1. Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

    // 2. Increment Claim Count in LocalStorage
    if (user) {
      const storageKey = `ayucan_claims_${user._id || user.id}`;
      const currentClaims = parseInt(localStorage.getItem(storageKey) || "0");
      localStorage.setItem(storageKey, (currentClaims + 1).toString());
    }

    // 3. Make page "disappear" (Redirect away)
    toast.success("Reward claimed! Redirecting...");
    setTimeout(() => {
      navigate("/shop/all");
    }, 1000); // Short delay to allow WhatsApp tab to open
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewardCode);
    toast.success("Reward code copied!");
  };

  // Prevent rendering if user is blocked (limit reached)
  if (!canClaim && user) return null;

  return (
    // Background: Deep Green for high contrast celebration
    <div className="min-h-screen bg-[#2A3B28] flex items-center justify-center px-4 relative overflow-hidden font-sans">

      {/* --- Confetti Layer (Only if logged in) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {showConfetti && Array.from({ length: 30 }).map((_, i) => (
          <ConfettiPiece key={i} delay={Math.random() * 5} />
        ))}
      </div>

      {/* --- Glow Effects --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C17C3A]/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <AnimatePresence mode="wait">

        {/* =========================================
            STATE 1: NOT LOGGED IN (Locked View) 
           ========================================= */}
        {!user ? (
          <motion.div
            key="login-prompt"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FDFBF7] w-full max-w-md rounded-3xl p-8 md:p-12 text-center relative z-10 shadow-2xl border border-[#C17C3A]/30"
          >
            <div className="w-20 h-20 bg-[#EADDCF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
              <Lock size={32} className="text-[#C17C3A]" />
            </div>

            <h1 className="text-[#C17C3A] font-bold text-sm uppercase tracking-[0.2em] mb-2">
              Reward Detected
            </h1>
            <h2 className="text-3xl font-serif font-bold text-[#2A3B28] leading-tight mb-4">
              Login to Reveal
            </h2>
            <p className="text-[#715036]/80 text-sm mb-8 leading-relaxed font-medium">
              You have scanned a winning QR code! Please log in to your Ayucan account to unlock your instant cashback reward.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoginRedirect}
              className="w-full bg-[#2A3B28] hover:bg-[#C17C3A] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl flex items-center justify-center gap-3 transition-all duration-300"
            >
              <LogIn size={20} /> Login to Claim
            </motion.button>
            <p className="mt-6 text-xs text-[#715036]/50">
              Don't have an account? <span onClick={() => navigate('/signup')} className="font-bold cursor-pointer hover:underline text-[#C17C3A]">Sign Up</span>
            </p>
          </motion.div>
        ) : (

          /* =========================================
              STATE 2: LOGGED IN (Reward View) 
             ========================================= */
          <motion.div
            key="reward-view"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-[#FDFBF7] w-full max-w-md rounded-3xl p-8 md:p-12 text-center relative z-10 shadow-2xl border border-[#C17C3A]/30"
          >

            {/* Success Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 bg-[#2A3B28] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-[#C17C3A]"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>

            {/* Text Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-[#C17C3A] font-bold text-sm uppercase tracking-[0.2em] mb-2">
                Congratulations, {user.name ? user.name.split(' ')[0] : 'User'}!
              </h1>
              <h2 className="text-3xl font-serif font-bold text-[#2A3B28] leading-tight">
                You Won Cashback
              </h2>
            </motion.div>

            {/* Amount Display */}
            <motion.div
              className="my-8 relative inline-block"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <div className="absolute -top-6 -left-8 text-[#C17C3A]"><SparkleIcon /></div>
              <div className="absolute -bottom-4 -right-8 text-[#C17C3A]"><SparkleIcon /></div>

              <div className="text-6xl md:text-7xl font-serif font-extrabold text-[#2A3B28] tracking-tight drop-shadow-sm">
                ₹{cashbackAmount}
              </div>
              <div className="text-sm font-bold text-[#715036]/60 mt-2 uppercase tracking-wide">
                Instant Reward
              </div>
            </motion.div>

            {/* Unique Reward Code Section */}
            <div className="mb-8">
              <p className="text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">Your Unique Code</p>
              <div
                onClick={copyToClipboard}
                className="bg-[#EADDCF]/50 border-2 border-dashed border-[#C17C3A] rounded-xl py-3 px-6 inline-flex items-center gap-3 cursor-pointer hover:bg-[#EADDCF] transition-colors group"
              >
                <span className="text-2xl font-mono font-bold text-[#2A3B28] tracking-widest">
                  {rewardCode}
                </span>
                <Copy size={16} className="text-[#C17C3A] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Instructions Box */}
            <div className="bg-[#EADDCF]/30 p-5 rounded-2xl mb-8 border border-[#C17C3A]/10 text-left">
              <h3 className="text-[#2A3B28] font-bold text-sm mb-3 flex items-center gap-2">
                <Camera size={16} className="text-[#C17C3A]" /> How to Claim:
              </h3>
              <ul className="text-[#715036]/90 text-sm leading-relaxed font-medium space-y-2 list-decimal pl-4">
                <li><span className="font-bold text-[#2A3B28] decoration-[#C17C3A] underline decoration-2 underline-offset-2">Take a screenshot</span> of this screen.</li>
                <li>Click the button below to open WhatsApp.</li>
                <li>Send the <strong>Screenshot + your UPI ID</strong>.</li>
              </ul>
            </div>

            {/* Actions */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppClaim}
              className="w-full bg-[#C17C3A] hover:bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl flex items-center justify-center gap-3 mb-4 transition-all duration-300"
            >
              <FaWhatsapp size={22} /> Send Screenshot & Claim
            </motion.button>

            <button
              onClick={() => navigate('/shop/all')}
              className="text-[#2A3B28] font-bold text-sm hover:text-[#C17C3A] transition-colors flex items-center justify-center gap-1 mx-auto group mt-4"
            >
              Continue Shopping <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstantReward;