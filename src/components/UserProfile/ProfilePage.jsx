import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiUser, FiMail, FiPhone, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../Store/useAuthStore';
import { toast } from 'react-hot-toast';
import OrderHistory from '../Profile/OrderHistory';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const deleteAccount = useAuthStore(state => state.deleteAccount);
  const logout = useAuthStore(state => state.logout);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: ''
  });

  // 🛠️ Update form data only when user is loaded or edit mode toggled on
  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        userName: user.userName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.log("error while updating profile", error);
      toast.error('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount(user?.email);
      toast.success('Account deleted successfully!');
      navigate("/login");
    } catch (error) {
      // toast.error('Failed to delete account');
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success('Logged out successfully!');
  }

  return (
    // Background: Cream
    <div className="pt-30 min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-[#715036]/10"
        >
          {/* Profile Header: Deep Forest Green */}
          <div className="bg-[#2A3B28] px-8 py-10 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17C3A]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="h-24 w-24 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#715036] border-4 border-[#C17C3A]/20 shadow-lg mb-4 md:mb-0">
                  <FiUser className="h-10 w-10" />
                </div>
                <div className="md:ml-6 text-[#FDFBF7]">
                  <h1 className="text-3xl font-serif font-bold tracking-wide">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <div className='flex flex-col md:flex-row items-center gap-2 mt-2'>
                    <span className="bg-[#C17C3A]/20 text-[#C17C3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C17C3A]/30">
                      {user?.role || "Member"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-[#FDFBF7]/10 text-[#FDFBF7] border border-[#FDFBF7]/30 px-5 py-2 rounded-full flex items-center hover:bg-[#FDFBF7] hover:text-[#2A3B28] transition-all duration-300 font-medium text-sm backdrop-blur-sm"
                >
                  <FiEdit2 className="mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#C17C3A] text-white px-5 py-2 rounded-full flex items-center hover:bg-[#a6662e] transition-all duration-300 font-medium text-sm shadow-md"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-[#715036]/20 shadow-sm focus:border-[#C17C3A] focus:ring-[#C17C3A] bg-[#FDFBF7] py-3 px-4 text-[#2A3B28]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-[#715036]/20 shadow-sm focus:border-[#C17C3A] focus:ring-[#C17C3A] bg-[#FDFBF7] py-3 px-4 text-[#2A3B28]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-[#715036]/20 shadow-sm focus:border-[#C17C3A] focus:ring-[#C17C3A] bg-[#FDFBF7] py-3 px-4 text-[#2A3B28]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-[#715036]/20 shadow-sm focus:border-[#C17C3A] focus:ring-[#C17C3A] bg-[#FDFBF7] py-3 px-4 text-[#2A3B28]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="block w-full rounded-lg border-[#715036]/10 bg-gray-50 py-3 px-4 text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-[#715036]/60 italic">
                    Note: Email address cannot be changed for security reasons.
                  </p>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t border-[#715036]/10">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 border border-[#715036]/20 rounded-full text-[#715036] hover:bg-[#FDFBF7] transition-colors font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2A3B28] text-white rounded-full hover:bg-[#C17C3A] transition-colors font-medium text-sm shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              // Profile Display
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileItem
                    icon={<FiUser />}
                    label="Full Name"
                    value={`${user?.firstName} ${user?.lastName}`}
                  />
                  <ProfileItem
                    icon={<FiUser />}
                    label="Username"
                    value={user?.userName}
                  />
                  <ProfileItem
                    icon={<FiMail />}
                    label="Email"
                    value={user?.email}
                  />
                  <ProfileItem
                    icon={<FiPhone />}
                    label="Phone"
                    value={user?.phone || "Not provided"}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Orders Section */}
        <div className="space-y-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          // Keeping OrderHistory clean; it likely has its own styling, 
          // but wrapping it here provides consistency.
          >
            {/* OrderHistory component should handle its own container, 
                 but we remove the wrapper styling here to let it breathe 
                 if it has the cards we designed earlier. 
             */}
            <OrderHistory />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Profile Item Component - Styled
const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start p-4 rounded-xl bg-[#FDFBF7] border border-[#715036]/10">
    <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-full text-[#C17C3A] shadow-sm">
      <span className="text-lg">{icon}</span>
    </div>
    <div className="ml-4">
      <p className="text-xs font-bold text-[#715036] uppercase tracking-wider">{label}</p>
      <p className="text-lg font-medium text-[#2A3B28] mt-1 font-serif">{value}</p>
    </div>
  </div>
);

export default ProfilePage;