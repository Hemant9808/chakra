import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserEdit, FaShoppingBag, FaCog, FaTimes, FaChevronRight } from "react-icons/fa";

const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls profile visibility
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Devashish Raj",
    email: "devashish@example.com",
    avatar: "https://i.pravatar.cc/150?img=11", // Updated dummy avatar
  };

  return (
    // Background: Cream
    <div className="min-h-screen flex justify-center items-center bg-[#FDFBF7] text-[#2A3B28] font-sans">
      <div className="relative">

        {/* Trigger Menu List (Simulated Header Dropdown) */}
        {!isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-[#2A3B28] shadow-xl rounded-2xl p-2 w-64 border border-[#715036]/10"
          >
            <ul className="space-y-1">
              <li
                className="group flex items-center justify-between px-4 py-3 hover:bg-[#FDFBF7] rounded-xl cursor-pointer transition-colors"
                onClick={() => setIsProfileOpen(true)}
              >
                <span className="font-medium group-hover:text-[#C17C3A] transition-colors">My Profile</span>
                <FaChevronRight className="text-xs text-[#715036]/40 group-hover:text-[#C17C3A]" />
              </li>
              <li className="group flex items-center justify-between px-4 py-3 hover:bg-[#FDFBF7] rounded-xl cursor-pointer transition-colors">
                <span className="font-medium group-hover:text-[#C17C3A] transition-colors">Orders</span>
                <FaChevronRight className="text-xs text-[#715036]/40 group-hover:text-[#C17C3A]" />
              </li>
              <li className="group flex items-center justify-between px-4 py-3 hover:bg-[#FDFBF7] rounded-xl cursor-pointer transition-colors">
                <span className="font-medium group-hover:text-[#C17C3A] transition-colors">Settings</span>
                <FaChevronRight className="text-xs text-[#715036]/40 group-hover:text-[#C17C3A]" />
              </li>
            </ul>
          </motion.div>
        )}

        {/* Profile Overlay & Modal */}
        <AnimatePresence>
          {isProfileOpen && (
            <>
              {/* Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProfileOpen(false)}
                className="fixed inset-0 bg-[#2A3B28]/20 backdrop-blur-sm z-40"
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border border-[#715036]/10"
              >
                {/* Header Background */}
                <div className="relative h-32 bg-[#2A3B28]">
                  {/* Decorative Circle */}
                  <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-[#C17C3A]/10 rounded-full blur-2xl"></div>

                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Profile Info - Overlapping Header */}
                <div className="relative px-6 pb-6 -mt-16 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-1.5 bg-white rounded-full shadow-lg"
                  >
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-28 h-28 rounded-full object-cover border-4 border-[#FDFBF7]"
                    />
                  </motion.div>

                  <h2 className="text-2xl font-serif font-bold mt-4 text-[#2A3B28]">{user.name}</h2>
                  <p className="text-[#C17C3A] font-medium text-sm">{user.email}</p>
                </div>

                {/* Tabs Section */}
                <div className="px-6">
                  <div className="flex justify-between border-b border-[#715036]/10">
                    {[
                      { id: "profile", icon: <FaUserEdit />, label: "Profile" },
                      { id: "orders", icon: <FaShoppingBag />, label: "Orders" },
                      { id: "settings", icon: <FaCog />, label: "Settings" },
                    ].map((tab) => (
                      <motion.div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center pb-3 px-4 cursor-pointer relative transition-colors ${activeTab === tab.id ? "text-[#C17C3A]" : "text-[#715036]/50 hover:text-[#715036]"
                          }`}
                      >
                        <span className="text-lg mb-1">{tab.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>

                        {/* Active Indicator Line */}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C17C3A]"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-6 min-h-[150px] text-center"
                  >
                    {activeTab === "profile" && (
                      <div className="space-y-3 text-sm">
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#715036]/10 text-left">
                          <p className="text-[#715036]/60 text-xs uppercase font-bold">Member Since</p>
                          <p className="text-[#2A3B28] font-medium">October 2025</p>
                        </div>
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#715036]/10 text-left">
                          <p className="text-[#715036]/60 text-xs uppercase font-bold">Wellness Goal</p>
                          <p className="text-[#2A3B28] font-medium">Vitality & Strength</p>
                        </div>
                      </div>
                    )}
                    {activeTab === "orders" && (
                      <div className="flex flex-col items-center justify-center h-full text-[#715036]/60">
                        <FaShoppingBag className="text-3xl mb-2 opacity-30" />
                        <p>No recent orders found.</p>
                        <button className="mt-4 text-[#C17C3A] text-sm font-bold hover:underline">Start Shopping</button>
                      </div>
                    )}
                    {activeTab === "settings" && (
                      <div className="flex flex-col items-center justify-center h-full text-[#715036]/60">
                        <FaCog className="text-3xl mb-2 opacity-30" />
                        <p>Settings are up to date.</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;