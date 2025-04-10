import { FaArrowRight } from "react-icons/fa";

const ProfilePage = () => {
  const user = {
    name: "Devashish Raj",
    phone: "8271442413",
    email: "devashishraj8271@gmail.com",
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Section */}
      <div className="bg-blue-100 py-10 px-6 lg:px-20 rounded-b-3xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-700 text-sm">{user.phone} | {user.email}</p>

        <button className="mt-6 bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition">
          Logout
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 lg:px-20 mt-[-40px] z-10 relative">
        <Card title="Account Details" subtitle="Edit Now" />
        <Card title="Address" subtitle="View Saved" />
        <Card title="Orders" subtitle="View History" />
        <Card title="MM Wallet" subtitle="View Balance" />
      </div>

      {/* Footer Logo */}
      <div className="flex justify-center items-center mt-10">
        <img
          src="https://www.manmatters.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0581%2F3550%2F0733%2Ffiles%2Flogo_1_400x.png%3Fv%3D1633934303&w=1920&q=75"
          alt="logo"
          className="w-32 opacity-70"
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow-lg rounded-3xl px-6 py-8 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
        <FaArrowRight className="text-blue-900" />
      </div>
    </div>
  );
};

export default ProfilePage;
