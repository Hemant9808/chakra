import React from "react";
import { ShieldCheck, RotateCcw, Truck, Headphones } from "lucide-react";

export default function TrustSection() {
  const trustItems = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure Payment",
      desc: "100% protected transactions",
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Easy Returns",
      desc: "Hassle-free 7-day policy",
    },
    {
      icon: <Truck size={32} />,
      title: "Fast Shipping",
      desc: "Delivery across India",
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      desc: "Expert wellness assistance",
    },
  ];

  return (
    // Background: Cream
    <div className="bg-[#FDFBF7] py-16 border-t border-[#715036]/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {trustItems.map((item, index) => (
            <div
              key={index}
              // Card Style: White with Earthy Border & Shadow
              className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-[#715036]/10 hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="mb-5 p-4 bg-[#FDFBF7] rounded-full text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A3B28] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[#715036]/70 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications - Keeping images but styling the container */}
        <div className="mt-16 text-center">
          <p className="text-[#C17C3A] text-xs font-bold uppercase tracking-widest mb-6">
            Certified Excellence
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
            {/* Ensure these paths exist in your public folder */}
            <img
              src="/icons/fassai.png"
              alt="FSSAI Certified"
              className="h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-110"
            />
            <img
              src="/icons/gmp.png"
              alt="GMP Certified"
              className="h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-110"
            />
            <img
              src="/icons/iso.png"
              alt="ISO Certified"
              className="h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-110"
            />
            {/* Added placeholders for visual balance if images break */}
            <div className="h-10 border-l border-[#715036]/20 mx-4 hidden md:block"></div>
            <span className="text-[#2A3B28] font-serif font-bold text-lg">100% Natural</span>
          </div>
        </div>
      </div>
    </div>
  );
}