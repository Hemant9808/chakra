import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBox, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Trigger Icon - Forest Green with Bronze Hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-xl transition-colors duration-300 flex items-center ${isOpen ? "text-[#C17C3A]" : "text-[#2A3B28] hover:text-[#C17C3A]"
          }`}
      >
        <FaUser />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-56 bg-white text-[#2A3B28] shadow-xl rounded-xl border border-[#715036]/10 overflow-hidden transform origin-top-right transition-all">
          <ul className="py-2">

            {/* Profile Link */}
            <li>
              <Link
                to="/profile" // Updated to standard route, ensure matches your router
                className="px-5 py-3 hover:bg-[#FDFBF7] hover:text-[#C17C3A] flex items-center gap-3 transition-colors cursor-pointer group"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle className="text-[#715036]/40 group-hover:text-[#C17C3A]" />
                <span className="font-medium text-sm">My Profile</span>
              </Link>
            </li>

            {/* Orders Link */}
            <li>
              <Link
                to="/orders" // Updated to standard route
                className="px-5 py-3 hover:bg-[#FDFBF7] hover:text-[#C17C3A] flex items-center gap-3 transition-colors cursor-pointer group"
                onClick={() => setIsOpen(false)}
              >
                <FaBox className="text-[#715036]/40 group-hover:text-[#C17C3A]" />
                <span className="font-medium text-sm">My Orders</span>
              </Link>
            </li>

            {/* Divider */}
            <div className="h-px bg-[#715036]/10 my-1 mx-4"></div>

            {/* Logout */}
            <li
              className="px-5 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 cursor-pointer transition-colors"
              onClick={() => {
                alert("Logged Out"); // Replace with actual logout logic
                setIsOpen(false);
              }}
            >
              <FaSignOutAlt className="text-sm" />
              <span className="font-medium text-sm">Logout</span>
            </li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;