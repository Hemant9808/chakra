import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiUser, FiMail, FiPhone, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../Store/useAuthStore';
import { toast } from 'react-hot-toast';
import OrderHistory from '../Profile/OrderHistory';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  // const { user, updateProfile } = useAuthStore(state => ({
  //   user: state.user,
  //   updateProfile: state.updateProfile
  // }));
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
      console.log("error while updating profile",error);
      toast.error('Failed to update profile');
    }
  };

  const handleDelete = async()=>{
    try{
       await deleteAccount(user?.email);
      toast.success('Account deleted successfully!');
      navigate("/login");
    }catch(error){
      // toast.error('Failed to delete account');
    }
  }

  const handleLogout = ()=>{
    logout();
    navigate("/login");
    toast.success('Logged out successfully!');
  }
// const formaauthtDate = (dateString) => {
  //   return format(new Date(dateString || Date), 'MMMM dd, yyyy');
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-green-600">
                  <FiUser className="h-12 w-12" />
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-white">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <div className='flex items-center gap-2'>
                    <p className="text-green-100">{user?.role}</p>
                    {/* <button onClick={handleLogout} className='bg-red-100 p-2 cursor-pointer rounded-xl mt-2 font-bold text-green-600'>Logout</button> */}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-col sm:flex-row overflow-hidden">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white text-green-600 px-4 py-2 rounded-lg flex items-center hover:bg-green-50 transition-colors"
                >
                  <FiEdit2 className="mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hidden text-white px-4 py-2 rounded-lg md:flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Email cannot be changed
                  </p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              // Profile Display
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={user?.phone}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Sections */}
        <div className="space-y-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <OrderHistory />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
            <p className="text-gray-500">No saved addresses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 text-center rounded-lg shadow-lg"
          >
          {/* delete button */}
          <button onClick={handleDelete} className='bg-red-200 p-3 rounded-xl font-bold text-red-600'>Delete Account</button>
          
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Profile Item Component
const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">
      <span className="text-green-600 text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
