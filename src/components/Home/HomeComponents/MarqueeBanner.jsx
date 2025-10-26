import { Dumbbell, Zap, Activity } from "lucide-react"; 
import React, { useEffect } from "react";

// Define the unique ID for the style tag we will inject
const MARQUEE_STYLE_ID = "marquee-animation-style";

export default function MarqueeBanner() {
    
    useEffect(() => {
        // Only inject the style tag if it doesn't already exist
        if (!document.getElementById(MARQUEE_STYLE_ID)) {
            const style = document.createElement('style');
            style.id = MARQUEE_STYLE_ID;
            
            // Define the CSS animation rules
            style.textContent = `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-marquee {
                    display: flex;
                    animation: marquee 18s linear infinite;
                }
            `;
            
            document.head.appendChild(style);
        }

        // Clean-up function (optional but good practice)
        return () => {
            // You might choose to leave the style in the head after unmount
            // For a component used only once, this cleanup is useful:
            // const styleElement = document.getElementById(MARQUEE_STYLE_ID);
            // if (styleElement) {
            //     document.head.removeChild(styleElement);
            // }
        };
    }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className="overflow-hidden bg-[#35796D] text-white font-semibold text-lg py-3 rounded-3xl relative max-w-7xl mx-auto">
      <div className="flex whitespace-nowrap w-max animate-marquee">
        {/* The content array is mapped twice to ensure seamless looping */}
        {[...Array(2)].map((_, i) => (
          <span key={i} className="flex items-center gap-3 mx-6">
            Boost Performance <Dumbbell className="w-5 h-5 text-yellow-400" />
            Fuel Your Active Lifestyle <Zap className="w-5 h-5 text-yellow-400" />
            Everyday Endurance <Activity className="w-5 h-5 text-yellow-400" />
            Optimize Recovery <Dumbbell className="w-5 h-5 text-yellow-400" />
            360° Wellness Support <Zap className="w-5 h-5 text-yellow-400" />
          </span>
        ))}
      </div>
    </div>
  );
}