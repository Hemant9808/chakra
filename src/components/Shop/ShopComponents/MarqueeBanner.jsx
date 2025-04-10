import React from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import "./marquee.css"; // Import custom CSS for animation

const MarqueeBanner = () => {
  const items = [
    "WELLVAS15 : Apply this code and get 15% off",
    "Don’t know what to buy? Take the Male Wellness Test!",
  ];

  return (
    <div className="w-full bg-black overflow-hidden py-2">
      <div className="marquee whitespace-nowrap flex gap-10">
        {Array(10)
          .fill(" ")
          .map((_, index) => (
            <React.Fragment key={index}>
              {items.map((text, idx) => (
                <span
                  key={`${index}-${idx}`}
                  className="text-white text-sm md:text-base flex items-center gap-2"
                >
                  <FaRegHandPointRight className="text-[#d6ab83]" />
                  {text}
                </span>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
