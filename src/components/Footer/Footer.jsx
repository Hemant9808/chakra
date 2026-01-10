import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { productService } from "../../services/productService";

const Footer = () => {
  // Get all categories from the database
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const [categoriesData] = await Promise.all([
        productService.getAllCategories()
      ]);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories for footer:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer
      // Base color Deep Forest Green, Text Cream
      className="relative bg-[#2A3B28] text-[#FDFBF7] pt-16 pb-8 overflow-hidden"
      style={{
        backgroundImage: `url('/ResourseImages/bgOrignal.png')`, // Ensure this path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Brand Color Overlay - Using Deep Forest Green with opacity for branding and readability */}
      <div className="absolute inset-0 bg-[#2A3B28] opacity-80 z-0" />

      {/* Decorative Background Element (Bronze Blur) sits on top of overlay */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-10"></div>

      {/* Content wrapper - higher z-index to sit above overlays */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Products Section */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-[#C17C3A] uppercase tracking-widest">
              Products
            </h3>
            <ul className="text-sm space-y-3 text-[#FDFBF7]/80">
              {[
                { name: "AshwaZen X", path: "/product/68bdc188f56e1a004b70616d" },
                { name: "Evas Neo", path: "/product/68bdc4d9f56e1a004b7061a1" },
                { name: "Anti Addiction Drops", path: "/product/68b73127347f29004bac86de" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-[#C17C3A] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-[#C17C3A] uppercase tracking-widest">
              Categories
            </h3>
            <ul className="text-sm space-y-3 text-[#FDFBF7]/80">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/shop/${category.name}`}
                    className="hover:text-[#C17C3A] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-[#C17C3A] uppercase tracking-widest">
              Support
            </h3>
            <ul className="text-sm space-y-3 text-[#FDFBF7]/80">
              {[
                { name: "About Us", path: "/about" },
                { name: "FAQs", path: "/faqs" },
                { name: "Wellness Journal", path: "/blogs" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Refund Policy", path: "/refund-policy" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-[#C17C3A] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Section */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-[#C17C3A] uppercase tracking-widest">
              Join the Family
            </h3>
            <p className="text-xs text-[#FDFBF7]/60 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>

            <div className="flex items-center bg-[#FDFBF7]/5 border border-[#FDFBF7]/20 rounded-lg overflow-hidden focus-within:border-[#C17C3A] transition-colors">
              <input
                type="email"
                placeholder="Your Email Address"
                className="bg-transparent text-white px-4 py-3 w-full outline-none text-sm placeholder:text-[#FDFBF7]/30"
              />
              <button className="bg-[#C17C3A] text-white px-5 py-3 text-sm font-bold hover:bg-[#a6662e] transition-colors uppercase tracking-wider">
                Join
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-[#FDFBF7]/80 group">
                <div className="p-2 bg-[#FDFBF7]/5 rounded-full group-hover:bg-[#C17C3A] transition-colors">
                  <FaPhone className="text-[#C17C3A] group-hover:text-white" />
                </div>
                <span>+91 8799722636</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[#FDFBF7]/80 group">
                <div className="p-2 bg-[#FDFBF7]/5 rounded-full group-hover:bg-[#C17C3A] transition-colors">
                  <FaEnvelope className="text-[#C17C3A] group-hover:text-white" />
                </div>
                <span>support@ayucan.com</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <a href="https://www.instagram.com/ayucanhealthcare/" target="_blank" rel="noopener noreferrer" className="bg-[#FDFBF7]/5 p-3 rounded-full hover:bg-[#C17C3A] transition-all duration-300 group">
                <FaInstagram className="text-[#C17C3A] text-lg group-hover:text-white" />
              </a>
              <a href="https://www.facebook.com/share/16dWmZixuF/" target="_blank" rel="noopener noreferrer" className="bg-[#FDFBF7]/5 p-3 rounded-full hover:bg-[#C17C3A] transition-all duration-300 group">
                <FaFacebook className="text-[#C17C3A] text-lg group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Secure Payment Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#FDFBF7]/10 mt-12 pt-8 text-sm text-[#FDFBF7]/50">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FaCheckCircle className="text-[#C17C3A]" />
            <span>100% Safe & Secure Payments</span>
          </div>
          <div className="flex items-center space-x-6 transition-all duration-500">
            {/* Ensure images exist in public folder */}
            <img src="/ResourseImages/visa.png" alt="Visa" className="h-8 w-auto" />
            <img src="/ResourseImages/mastercard.png" alt="MasterCard" className="h-8 w-auto" />
            <img src="/ResourseImages/upi.png" alt="UPI" className="h-8 w-auto" />
          </div>
        </div>

        {/* Brand Tagline Statement */}
        <div className="mt-8 pt-8 border-t border-[#FDFBF7]/5 text-center">
          <p className="text-3xl md:text-4xl font-serif font-bold text-[#FDFBF7] mb-6 tracking-tight">
            Ayurveda <span className="italic text-[#F7941D]">Can.</span>
          </p>
          <p className="text-[10px] text-[#FDFBF7]/30 leading-relaxed max-w-4xl mx-auto">
            © {new Date().getFullYear()} Ayucan. All rights reserved. <br />
            All products are manufactured at FSSAI-approved facilities. These statements have not been evaluated by the FDA.
            This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use if you are pregnant, nursing, or taking medication.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;