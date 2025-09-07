import { useState } from "react";
import axios from "axios";
import {
  FaFacebook, FaInstagram, FaEnvelope, FaPhone,
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

      {/* Status Messages */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 mb-6 rounded-lg ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full bg-gray-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full bg-gray-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
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
        </div>
      </form>

      <div className="mt-8 text-center text-gray-600">
        <p><strong>Address:</strong> E-46/3, Mohan Baba Nagar, Nearby - S K Payal Public School, Badarpur, New Delhi 110044</p>
        <p><strong>Email:</strong> support@wellvas.com</p>
        <p><strong>Phone:</strong> +91-8799722636</p>
        <div className="flex justify-center space-x-4 mt-4 text-xl">
          <a href="https://www.facebook.com/share/16dWmZixuF/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.instagram.com/wellvashealthcare/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          {/* <a href="mailto:support@wellvas.com"><FaEnvelope /></a>
          <a href="tel:+918271442413"><FaPhone /></a> */}
        </div>
      </div>
    </div>
  );
}
