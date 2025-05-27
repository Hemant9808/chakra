import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaShoppingBag, FaCog, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls profile visibility
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Devashish",
    email: "devashish@example.com",
    avatar: "https://i.pravatar.cc/150?img=56", // Dummy avatar
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="relative">
        {/* Menu List */}
        <ul className="bg-gray-800 text-white shadow-lg rounded-md p-4">
          <li
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            Profile
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Orders</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>

        {/* Profile Section - Opens When Profile is Clicked */}
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setIsProfileOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <motion.img
                src={user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-[#e5dac3]"
                whileHover={{ scale: 1.1 }}
              />
              <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>

            {/* Tabs Section */}
            <div className="mt-6 flex justify-around border-b border-gray-700 pb-2">
              {[
                { id: "profile", icon: <FaUserEdit />, label: "Profile" },
                { id: "orders", icon: <FaShoppingBag />, label: "Orders" },
                { id: "settings", icon: <FaCog />, label: "Settings" },
              ].map((tab) => (
                <motion.div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center cursor-pointer ${
                    activeTab === tab.id ? "text-[#e5dac3]" : "text-gray-400"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm mt-1">{tab.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-gray-300"
            >
              {activeTab === "profile" && <p>Your profile details go here.</p>}
              {activeTab === "orders" && <p>Your past orders will be displayed here.</p>}
              {activeTab === "settings" && <p>Settings options will be available here.</p>}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
