import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import UserProfile from "./UserProfile";

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-xl hover:text-gray-400 flex items-center"
      >
        <FaUser />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" ><Link to="/UserProfile">Profile</Link></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Orders</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-t" onClick={() => alert("Logged Out")}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
