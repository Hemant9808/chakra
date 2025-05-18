// import { FaShieldAlt, FaBox, FaWhatsapp } from "react-icons/fa";

// const HeroSection = () => {
//   return (
//     <div className="flex flex-col md:flex-row items-center bg-white text-black p-8 md:p-16">
//       {/* Left Section (Video/Image) */}
//       <div className="relative w-full md:w-1/2">
//   <iframe
//     className="w-full h-64 md:h-80 rounded-lg"
//     src="https://www.youtube.com/embed/6t1xRzKjRBU"
//     title="YouTube video"
//     frameBorder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowFullScreen
//   ></iframe>
//   <div className="absolute top-4 left-4 text-white text-xl font-bold">
//     Bold Care
//   </div>
// </div>

//       {/* Right Section (Text & CTA) */}
//       <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8">
//         <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//           Redefining men's sexual health in India
//         </h1>
//         <p className="text-gray-900 mt-4">
//           The key to fulfilling, passionate and long-lasting experiences lies in
//           confidence. To boost this, Bold Care helps you with everything – from
//           your sex life to your looks.
//         </p>
//         <p className="text-gray-900 mt-4">
//           After years of dodgy experts & unverified solutions, we bring the
//           power of science and natural ingredients to provide expert-backed
//           wellness products.
//         </p>

//         {/* Icons and Benefits */}
//         <div className="mt-6 space-y-3">
//           <div className="flex items-center gap-3">
//             <FaShieldAlt className="text-blue-400 text-lg" />
//             <span className="font-semibold">Clinically Validated</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <FaShieldAlt className="text-green-400 text-lg" />
//             <span className="font-semibold">Safe & Effective</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <FaBox className="text-yellow-400 text-lg" />
//             <span className="font-semibold">Discreet Delivery</span>
//           </div>
//         </div>

//         {/* CTA Button */}
//         <button className="mt-6 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg">
//           Shop Now →
//         </button>
//       </div>

//       {/* Floating WhatsApp Button */}
//       <a
//         href="https://wa.me/your-number"
//         className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600"
//       >
//         <FaWhatsapp className="text-2xl" />
//         <span className="hidden md:inline">Hey, Let's chat!</span>
//       </a>
//     </div>
//   );
// };

// export default HeroSection;




// import Image from "next/image";
// import heroImg from "@/public/your-hero-image.png"; // Replace with your imported image
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  
  return (
    <section className="relative min-h-[41.5rem] flex flex-col md:flex-row items-center justify-between px-6 lg:px-[8rem] py-12 bg-gradient-to-b from-[#1A1F2C] via-[#403E43] to-[#1A1F2C] text-white">
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-12 z-10">
        <span className="text-4xl lg:text-[3.5rem] font-playfair font-bold leading-tight">
          Ancient Wisdom for <br />
          <span className="  gold-gradient-text block">Modern Wellness</span>
        </span>
        <p className="text-lg text-gray-300 max-w-lg mt-5">
          Discover our premium Ayurvedic formulations crafted from rare herbs
          and ancient recipes for holistic well-being.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
        <Link to="/shop">
          <button to="/shop" className="bg-[#D4AF37] cursor-pointer  hover:bg-yellow-600 text-black font-semibold py-4 px-9 rounded-lg">
           <span className="text-[1.2rem]">Explore Collection</span>  
          </button>
          </Link>
          <button className="bg-black hover:bg-gray-900 cursor-pointer text-white  py-3 px-6 rounded-lg flex items-center gap-2">
          <span className="text-[1.2rem]">Learn About Ayurveda</span>   <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2  mt-10 md:mt-0 flex justify-center relative z-10">
        <div className="rounded-full border- border-[#D4AF37]  shadow-lg shadow-yellow-50">
          <img
            src="https://cdn.pixabay.com/photo/2024/01/07/01/05/ayurveda-8492240_1280.jpg"
            alt="Herbal Product"
            className="rounded-full sm:w-[20rem] sm:h-[20rem] md:w-[20rem] md:h-[20rem] lg:w-[27rem] lg:h-[27rem]  object-cover"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-300">
        Scroll to explore
        <div className="w-1 h-6 mx-auto mt-1 bg-[#D4AF37] rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;
