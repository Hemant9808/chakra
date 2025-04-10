import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaFacebook, FaPhone, FaEnvelope, FaCheckCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 bg-black">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Products Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Products</h3>
            <ul className="text-sm space-y-2">
              {["Biozyme Performance Whey", "Raw Whey Protein", "Super Gainer XXL", "Creatine", "Protein Bars"].map((item, index) => (
                <li key={index} className="hover:text-yellow-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Categories</h3>
            <ul className="text-sm space-y-2">
              {["Proteins", "Gainers", "Pre/Post Workout", "Fat Loss", "Fitness Accessories"].map((item, index) => (
                <li key={index} className="hover:text-yellow-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Useful Links</h3>
            <ul className="text-sm space-y-2">
              {["About Us", "FAQs", "Blog", "T & C", "Privacy Policy"].map((item, index) => (
                <li key={index} className="hover:text-yellow-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Subscribe to Newsletter</h3>
            <div className="flex items-center border border-white rounded-md overflow-hidden">
              <input type="email" placeholder="Your Email" className="bg-black text-white px-3 py-2 w-full outline-none" />
              <button className="bg-yellow-500 px-4 py-2 font-bold">Submit</button>
            </div>
            <div className="mt-5 text-sm flex items-center space-x-2">
              <FaPhone /> <span>+91 8271442413</span>
            </div>
            <div className="mt-2 text-sm flex items-center space-x-2">
              <FaEnvelope /> <span>info@Charakwellness.com</span>
            </div>
            <div className="mt-4 flex space-x-3">
              {[FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaFacebook].map((Icon, index) => (
                <Icon key={index} className="text-yellow-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
              ))}
            </div>
          </div>
        </div>

        {/* Secure Payment Section */}
        <div className="flex justify-between items-center border-t border-gray-600 mt-10 pt-5 text-sm">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>100% Safe & Secure payments:</span>
          </div>
          <div className="flex space-x-2">
            <img src="https://via.placeholder.com/40" alt="Visa" />
            <img src="https://via.placeholder.com/40" alt="MasterCard" />
            <img src="https://via.placeholder.com/40" alt="UPI" />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center mt-5">
          All Charak Wellness products are manufactured at FSSAI approved facilities and are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
