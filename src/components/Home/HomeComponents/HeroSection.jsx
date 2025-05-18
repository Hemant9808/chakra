import { FaLeaf, FaFlask, FaBoxOpen, FaWhatsapp, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-100 p-10 md:p-16">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] bg-red-100 opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] bg-yellow-100 opacity-20 rounded-full blur-3xl -z-10"></div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-10">
        {/* Left: Video with Branding */}
        <div className="relative w-full md:w-1/2">
          <iframe
            className="w-full h-64 md:h-80 rounded-xl shadow-xl"
            src="https://www.youtube.com/embed/6t1xRzKjRBU"
            title="Wellvas Overview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute bottom-3 left-3 px-4 py-1 bg-black bg-opacity-60 text-white rounded-lg font-semibold">
            WELLVAS
          </div>
        </div>

        {/* Right: Text & Benefits */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Elevate Your Wellness with <span className="text-green-700">Ayurvedic Precision</span>
          </h1>
          <p className="text-gray-800 mb-4 text-lg">
            Discover the power of time-tested Ayurvedic herbs like Ashwagandha, Shilajit, and Safed Musli—expertly formulated and clinically validated for modern well-being.
          </p>
          <p className="text-gray-700 mb-6">
            At Wellvas, we go beyond just supplements—our mission is to restore balance, enhance performance, and help you feel unstoppable.
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <FaLeaf className="text-green-500 text-xl" />
              <span>100% Ayurvedic Formulas</span>
            </div>
            <div className="flex items-center gap-3">
              <FaFlask className="text-blue-500 text-xl" />
              <span>Lab-Tested & Verified</span>
            </div>
            <div className="flex items-center gap-3">
              <FaBoxOpen className="text-yellow-500 text-xl" />
              <span>Discreet & Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <FaStar className="text-orange-400 text-xl" />
              <span>Rated 4.9★ by 10k+ Users</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/shop"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Shop Wellness →
          </Link>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918271442413"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-50"
      >
        <FaWhatsapp className="text-xl" />
        <span className="hidden md:inline font-medium">Need Help?</span>
      </a>
    </section>
  );
};

export default HeroSection;
