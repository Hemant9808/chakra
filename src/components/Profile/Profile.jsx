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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-4xl text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-green-100">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 w-full px-4 py-2 rounded-md ${
                      activeTab === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <button className="text-green-600 hover:text-green-700">
                      <FaEdit />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <p className="mt-1 text-gray-900">{user?.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <p className="mt-1 text-gray-900">{user?.lastName}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="mt-1 text-gray-900">{user?.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500">View your order history</p>
                  <button
                    onClick={() => navigate('/orders')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Go to Orders
                  </button>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Change Password
                      </label>
                      <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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