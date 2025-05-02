import React from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import "./marquee.css"; // Same custom CSS for animation

const MarqueeBanner = () => {
  const messages = [
    "⚡ Hello from Team WELLVAS!",
    "🎉 Use WELLVAS15 to save 15% instantly!",
    "🧠 Take the Men's Wellness Quiz today!",
    "💪 Boost your energy with Ayurvedic care!",
  ];

  return (
    <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black py-2 overflow-hidden shadow-inner border-t border-b border-gray-700">
      <div className="marquee flex gap-12 items-center whitespace-nowrap text-sm md:text-base font-medium text-white">
        {Array(8)
          .fill(" ")
          .map((_, index) => (
            <React.Fragment key={index}>
              {messages.map((msg, idx) => (
                <span
                  key={`${index}-${idx}`}
                  className="flex items-center gap-2 text-white"
                >
                  <BsLightningChargeFill className="text-green-300" />
                  <span className="bg-gradient-to-r from-white to-green-700 bg-clip-text text-transparent">
                    {msg}
                  </span>
                </span>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
