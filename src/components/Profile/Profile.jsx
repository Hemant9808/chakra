import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaLock, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import useAuthStore from '../../Store/useAuthStore';
import { toast } from 'react-hot-toast';
import { clearLocalStorage } from '../../middleware/middleware';

const Profile = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    clearLocalStorage(navigate);
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'orders', label: 'Orders', icon: <FaHistory /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
  ];

  return (
    // Background: Cream
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#715036]/10">

          {/* Profile Header: Deep Forest Green */}
          <div className="bg-[#2A3B28] p-8 text-[#FDFBF7] relative overflow-hidden">
            {/* Decorative decorative circle (optional) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 relative z-10">
              <div className="w-24 h-24 bg-[#FDFBF7] rounded-full flex items-center justify-center shadow-lg border-4 border-[#C17C3A]/20">
                <FaUser className="text-4xl text-[#715036]" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold tracking-wide">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-[#C17C3A] font-medium mt-1">{user?.email}</p>
                <p className="text-sm text-[#FDFBF7]/60 mt-1">Wellness Member</p>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col md:flex-row min-h-[500px]">

            {/* Sidebar Navigation */}
            <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-[#715036]/10 p-6">
              <nav className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-3 w-full px-5 py-3 rounded-lg transition-all duration-300 font-medium ${activeTab === item.id
                      ? 'bg-[#FDFBF7] text-[#C17C3A] shadow-sm border-l-4 border-[#C17C3A]' // Active State
                      : 'text-[#2A3B28]/70 hover:bg-[#FDFBF7] hover:text-[#2A3B28]' // Inactive State
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="pt-6 mt-6 border-t border-[#715036]/10">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-5 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 md:p-10 bg-white">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center border-b border-[#715036]/10 pb-4">
                    <h2 className="text-2xl font-serif font-bold text-[#2A3B28]">Personal Information</h2>
                    <button className="flex items-center space-x-2 text-[#C17C3A] hover:text-[#8a5624] transition-colors font-medium">
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#715036] uppercase tracking-widest">
                        First Name
                      </label>
                      <div className="p-3 bg-[#FDFBF7] rounded-md border border-[#715036]/10 text-[#2A3B28] font-medium">
                        {user?.firstName}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#715036] uppercase tracking-widest">
                        Last Name
                      </label>
                      <div className="p-3 bg-[#FDFBF7] rounded-md border border-[#715036]/10 text-[#2A3B28] font-medium">
                        {user?.lastName}
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-[#715036] uppercase tracking-widest">
                        Email Address
                      </label>
                      <div className="p-3 bg-[#FDFBF7] rounded-md border border-[#715036]/10 text-[#2A3B28] font-medium">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#715036]/10">
                    <FaHistory className="text-3xl text-[#C17C3A]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-2">Order History</h3>
                  <p className="text-[#715036]/70 mb-8 max-w-sm mx-auto">
                    View your past purchases and track the journey of your wellness products.
                  </p>
                  <button
                    onClick={() => navigate('/orders')}
                    className="inline-flex items-center px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-[#2A3B28] hover:bg-[#C17C3A] transition-colors duration-300 shadow-md"
                  >
                    Go to Orders
                  </button>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="border-b border-[#715036]/10 pb-4">
                    <h2 className="text-2xl font-serif font-bold text-[#2A3B28]">Security Settings</h2>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <div className="bg-[#FDFBF7] p-6 rounded-xl border border-[#715036]/10">
                      <div className="flex items-center space-x-3 mb-4 text-[#715036]">
                        <FaLock />
                        <span className="font-bold uppercase text-xs tracking-wider">Password Management</span>
                      </div>
                      <label className="block text-sm font-medium text-[#2A3B28] mb-4">
                        Change your account password to keep your account secure.
                      </label>
                      <button className="w-full py-3 border border-transparent text-sm font-bold uppercase tracking-wider rounded-lg text-white bg-[#C17C3A] hover:bg-[#8a5624] transition-colors duration-300 shadow-sm">
                        Update Password
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;