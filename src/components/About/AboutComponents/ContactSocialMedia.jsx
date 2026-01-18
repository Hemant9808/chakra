import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactSocialMedia = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    // Background: Cream
    <section ref={sectionRef} className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C17C3A]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Community & Support
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
            Let's Stay Connected
          </h2>

          <p className="text-lg text-[#715036]/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Whether you have a question about our products or just want to say hello, we are here for you.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Details Card */}
          <motion.div
            className="bg-white border border-[#715036]/10 shadow-sm p-8 rounded-3xl text-center hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-1 group"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300">
              <FaPhone />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-6">Get in Touch</h3>

            <div className="space-y-4">
              <a href="tel:+918799722636" className="flex items-center justify-center gap-3 text-[#715036] hover:text-[#C17C3A] transition-colors font-medium">
                <span>+91-8799722636</span>
              </a>
              <a href="mailto:support@ayucan.com" className="flex items-center justify-center gap-3 text-[#715036] hover:text-[#C17C3A] transition-colors font-medium">
                <span>support@ayucan.com</span>
              </a>
            </div>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            className="bg-white border border-[#715036]/10 shadow-sm p-8 rounded-3xl text-center hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-1 group"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300">
              <FaInstagram />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-6">Follow Our Journey</h3>

            <div className="flex justify-center gap-6 mt-4">
              <a
                href="https://www.facebook.com/share/16dWmZixuF/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#715036]/20 flex items-center justify-center text-[#2A3B28] hover:bg-[#C17C3A] hover:text-white hover:border-[#C17C3A] transition-all duration-300 text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/ayucanhealthcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#715036]/20 flex items-center justify-center text-[#2A3B28] hover:bg-[#C17C3A] hover:text-white hover:border-[#C17C3A] transition-all duration-300 text-xl"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSocialMedia;