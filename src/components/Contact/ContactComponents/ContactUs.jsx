import { useState } from "react";
import {
  FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type, message }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await axiosInstance.post("contact/saveMessage", formData);
      setStatus({ type: "success", message: res.data.message });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Server error. Please try again.";
      setStatus({ type: "error", message: errorMsg });
    }

    setLoading(false);
  };

  // Styles for inputs to keep JSX clean
  const inputClasses = "w-full p-4 rounded-lg bg-[#FDFBF7] border border-[#715036]/20 text-[#2A3B28] placeholder:text-[#715036]/40 focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all duration-300";
  const labelClasses = "block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2";

  return (
    // Background: Cream
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 sm:px-6 relative overflow-hidden">

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C17C3A]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2A3B28]/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-4">We're Here to Help</h2>
          <p className="text-[#715036]/80 text-lg max-w-2xl mx-auto font-medium">
            Have questions about our products or your wellness journey? Send us a message and we'll get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left: Contact Form Card */}
          <div className="w-full lg:w-2/3 bg-white shadow-xl rounded-3xl p-8 md:p-10 border border-[#715036]/10 relative">
            {/* Status Messages */}
            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 mb-8 rounded-lg text-sm font-medium ${status.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="How can we help?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Message *</label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} h-40 resize-none`}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white uppercase tracking-widest text-sm shadow-lg transition-all duration-300 ${loading
                  ? "bg-[#715036]/50 cursor-not-allowed"
                  : "bg-[#2A3B28] hover:bg-[#C17C3A] hover:shadow-xl hover:-translate-y-1"
                  }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right: Contact Info Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">

            {/* Info Card */}
            <div className="bg-[#2A3B28] rounded-3xl p-8 text-[#FDFBF7] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17C3A]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

              <h3 className="text-xl font-serif font-bold mb-8 text-white">Contact Information</h3>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FDFBF7]/10 rounded-full text-[#C17C3A]">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#C17C3A] uppercase tracking-wider mb-1">Our Office</p>
                    <p className="text-sm leading-relaxed text-[#FDFBF7]/80">
                      E-46/3, Mohan Baba Nagar,<br />
                      Nearby S K Payal Public School,<br />
                      Badarpur, New Delhi 110044
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FDFBF7]/10 rounded-full text-[#C17C3A]">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#C17C3A] uppercase tracking-wider mb-1">Email Us</p>
                    <a href="mailto:support@ayucan.com" className="text-sm text-[#FDFBF7]/80 hover:text-white transition-colors">
                      support@ayucan.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#FDFBF7]/10 rounded-full text-[#C17C3A]">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#C17C3A] uppercase tracking-wider mb-1">Call Us</p>
                    <a href="tel:+918799722636" className="text-sm text-[#FDFBF7]/80 hover:text-white transition-colors">
                      +91-8799722636
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-10 pt-8 border-t border-[#FDFBF7]/10 flex gap-4">
                <a
                  href="https://www.facebook.com/share/16dWmZixuF/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center text-[#C17C3A] hover:bg-[#C17C3A] hover:text-white transition-all duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/wellvashealthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center text-[#C17C3A] hover:bg-[#C17C3A] hover:text-white transition-all duration-300"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Optional: Map Placeholder or Image */}
            <div className="bg-[#EADDCF] rounded-3xl h-48 w-full flex items-center justify-center border border-[#715036]/10 overflow-hidden">
              {/* You could embed a real map here, using an image for now to match style */}
              <p className="text-[#715036] font-bold opacity-50 uppercase tracking-widest text-sm">[ Map View ]</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}