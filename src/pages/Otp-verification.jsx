import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../Store/useAuthStore";
import { motion } from "framer-motion";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const OtpVerification = () => {
  const { verifySignupOTP, isCheckingAuth } = useAuthStore(); // Assuming isCheckingAuth or loading state exists
  const navigate = useNavigate();
  const { email } = useLocation()?.state || {};

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otp = e.target.otp.value;
      const response = await verifySignupOTP({ otp, email });
      if (response.success) {
        toast.success("Verified successfully! Welcome to Ayucan.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleResend = () => {
    // Placeholder for resend logic
    toast.success("Verification code resent to your email.");
  };

  return (
    // Background: Deep Forest Green
    <div className="flex items-center justify-center min-h-screen bg-[#2A3B28] px-4 relative overflow-hidden font-sans">

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Texture Overlay (Optional) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      {/* Card: Cream with Earthy Border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-[#FDFBF7] shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md relative z-10 border border-[#715036]/10"
      >
        {/* Back Navigation */}
        <Link
          to="/login"
          className="absolute top-6 left-6 text-[#715036]/60 hover:text-[#2A3B28] transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
        >
          <FaArrowLeft size={12} /> Back
        </Link>

        {/* Icon Header */}
        <div className="w-20 h-20 mx-auto bg-[#2A3B28]/5 rounded-full flex items-center justify-center mb-6 text-[#C17C3A]">
          <FaLock size={32} />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2A3B28] mb-2">
            Verify It's You
          </h1>
          <p className="text-sm text-[#715036]/80 leading-relaxed">
            We've sent a 6-digit verification code to<br />
            <span className="font-bold text-[#2A3B28] text-base block mt-1">{email || "your email address"}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-3 text-center">
              Enter Verification Code
            </label>
            <input
              className="w-full p-4 rounded-xl border border-[#715036]/20 bg-white text-[#2A3B28] focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent outline-none text-center tracking-[0.5em] text-3xl font-serif placeholder:text-gray-200 placeholder:tracking-normal transition-all shadow-inner"
              type="text"
              name="otp"
              placeholder="••••••"
              maxLength={6}
              autoFocus
              required
              autoComplete="one-time-code"
            />
          </div>

          <button
            className="w-full py-4 rounded-xl bg-[#2A3B28] text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-[#C17C3A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            type="submit"
          >
            Verify Code
          </button>
        </form>

        {/* Resend Section */}
        <div className="mt-8 text-center border-t border-[#715036]/10 pt-6">
          <p className="text-sm text-[#715036]/70 mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="text-[#C17C3A] font-bold text-sm uppercase tracking-wide hover:underline hover:text-[#a6662e] transition-colors"
          >
            Resend Code
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;