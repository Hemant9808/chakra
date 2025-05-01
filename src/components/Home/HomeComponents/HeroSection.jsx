import { FaShieldAlt, FaBox, FaWhatsapp } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-black text-black p-8 md:p-16">
      {/* Left Section (Video/Image) */}
      <div className="relative w-full md:w-1/2">
  <iframe
    className="w-full h-64 md:h-80 rounded-lg"
    src="https://www.youtube.com/embed/6t1xRzKjRBU"
    title="YouTube video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <div className="absolute top-4 left-4 text-white text-xl font-bold">
    Bold Care
  </div>
</div>

      {/* Right Section (Text & CTA) */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Redefining men's sexual health in India
        </h1>
        <p className="text-gray-900 mt-4">
          The key to fulfilling, passionate and long-lasting experiences lies in
          confidence. To boost this, Bold Care helps you with everything – from
          your sex life to your looks.
        </p>
        <p className="text-gray-900 mt-4">
          After years of dodgy experts & unverified solutions, we bring the
          power of science and natural ingredients to provide expert-backed
          wellness products.
        </p>

        {/* Icons and Benefits */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-blue-400 text-lg" />
            <span className="font-semibold">Clinically Validated</span>
          </div>
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-green-400 text-lg" />
            <span className="font-semibold">Safe & Effective</span>
          </div>
          <div className="flex items-center gap-3">
            <FaBox className="text-yellow-400 text-lg" />
            <span className="font-semibold">Discreet Delivery</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-6 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg">
          Shop Now →
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/your-number"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="hidden md:inline">Hey, Let's chat!</span>
      </a>
    </div>
  );
};

export default HeroSection;
