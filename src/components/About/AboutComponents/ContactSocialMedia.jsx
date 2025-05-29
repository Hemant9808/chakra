import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactSocialMedia = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}>
          Contact & Social Media
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          Stay connected with us through our social media channels and contact details.
        </motion.p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <motion.div
            className="bg-gray-100 shadow-md p-6 rounded-xl text-center hover:shadow-xl transition transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold mb-3">📞 Contact Us</h3>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <FaPhone className="text-blue-500" /> +91-8271442413
            </p>
            <p className="text-gray-600 flex items-center justify-center gap-2 mt-2">
              <FaEnvelope className="text-red-500" /> support@wellvas.com
            </p>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="bg-gray-100 shadow-md p-6 rounded-xl text-center hover:shadow-xl transition transform hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <h3 className="text-2xl font-semibold mb-3">🌍 Follow Us</h3>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl hover:scale-110 transition">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl hover:scale-110 transition">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl hover:scale-110 transition">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-3xl hover:scale-110 transition">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSocialMedia;
