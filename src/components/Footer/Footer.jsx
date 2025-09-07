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

  //get all categories from the database
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const [ categoriesData] = await Promise.all([
     
      productService.getAllCategories()
    ]);
    setCategories(categoriesData);
  };


  useEffect(() => {
    fetchCategories();
  }, []);
console.log("categories.........", categories);
  return (
    <footer
      className="relative bg-[#0c0c0c] text-white pt-12 pb-8"
      style={{
        backgroundImage: `url('/ResourseImages/bg.png')`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Products Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f4e9da]">Products</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {[
                { name: "Ashwazen Max", path: "/products/ashwazen-max" },
                { name: "EVAS Pro", path: "/products/evas-pro" },
                { name: "Liver Detox Bolts", path: "/products/liver-detox" },
                { name: "Multivitamin CMC", path: "/products/multivitamin-cmc" },
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:text-yellow-400 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}

         
              <div className="flex flex-col gap-4">
              <h3 className="font-bold  text-lg  text-[#f4e9da]">Categories</h3>
              {categories.map((category) => (
            <div key={category._id}>
             
              <ul className="text-sm space-y-2 text-gray-300">
                
                  <li key={category._id}>
                    <Link to={`/shop/${category.name}`} className="hover:text-yellow-400 transition">
                      {category.name}
                    </Link>
                  </li>
               
              </ul>
            </div>
          ))}
                
              </div>
         

          {/* <div>
            <h3 className="font-bold text-lg mb-4 text-[#f4e9da]">Categories</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {[
                { name: "Men's Wellness", path: "/shop#nutrition" },
                { name: "Immunity Boosters", path: "/shop#combo" },
                { name: "Liver Health", path: "/category/liver-health" },
                { name: "Daily Essentials", path: "/category/daily-essentials" },
                { name: "Anti Addiction", path: "/category/anti-addiction" },
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:text-yellow-400 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Useful Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f4e9da]">Useful Links</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {[
                { name: "About Us", path: "/about" },
                { name: "FAQs", path: "/faqs" },
                { name: "Blog", path: "/blogs" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Refund Policy", path: "/refund-policy" },
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:text-yellow-400 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f4e9da]">Subscribe</h3>
            <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent text-white px-3 py-2 w-full outline-none text-sm placeholder:text-gray-400"
              />
              <button className="bg-yellow-500 text-black px-4 py-2 text-sm font-bold hover:bg-yellow-400 transition">
                Submit
              </button>
            </div>
            <div className="mt-4 text-sm flex items-center space-x-2 text-gray-300">
              <FaPhone /> <span>+91 8799722636</span>
            </div>
            <div className="mt-2 text-sm flex items-center space-x-2 text-gray-300">
              <FaEnvelope /> <span>support@wellvas.com</span>
            </div>
            <div className="mt-5 flex space-x-3">
              <a href="https://www.instagram.com/wellvashealthcare/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-yellow-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/share/16dWmZixuF/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-yellow-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Secure Payment Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-10 pt-5 text-sm text-gray-400">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FaCheckCircle className="text-green-500" />
            <span>100% Safe & Secure Payments</span>
          </div>
          <div className="flex space-x-4">
            <img src="/ResourseImages/visa.png" alt="Visa" className="h-15 w-auto" />
            <img src="/ResourseImages/mastercard.png" alt="MasterCard" className="h-15 w-auto" />
            <img src="/ResourseImages/upi.png" alt="UPI" className="h-15 w-auto" />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          All Wellvas products are manufactured at FSSAI-approved facilities. Products are not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
