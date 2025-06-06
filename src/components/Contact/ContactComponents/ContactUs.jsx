import { useState } from "react";
import axios from "axios";
import {
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {toast} from "react-hot-toast";
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Server error. Please try again.";
      setStatus({ type: "error", message: errorMsg });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-900">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">
        We'd love to hear from you! Our team is here to help.
      </p>

      {/* Animated Status Message */}
      <AnimatePresence>
        {status && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 mb-4 rounded text-center transition-all duration-300 ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 border rounded-lg w-full bg-gray-100 h-32"
          required
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 font-bold rounded-lg transition-all duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-600">
        <p><strong>Address:</strong> Wellvas HQ, Malviya Nagar, New Delhi</p>
        <p><strong>Email:</strong> support@wellvas.com</p>
        <p><strong>Phone:</strong> +91-8271442413</p>
        <div className="flex justify-center space-x-4 mt-4 text-xl">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaEnvelope /></a>
          <a href="#"><FaPhone /></a>
        </div>
      </div>
    </div>
  );
}
