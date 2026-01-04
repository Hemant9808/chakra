import { Dumbbell, Zap, Activity, Leaf, ShieldCheck } from "lucide-react";
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
                    animation: marquee 25s linear infinite; /* Slowed down slightly for premium feel */
                }
            `;

            document.head.appendChild(style);
        }
    }, []);

    return (
        // Background: Deep Forest Green
        <div className="overflow-hidden bg-[#2A3B28] text-[#FDFBF7] font-bold text-sm uppercase tracking-widest py-4 rounded-full relative max-w-7xl mx-auto shadow-lg border border-[#715036]/20">
            <div className="flex whitespace-nowrap w-max animate-marquee items-center">
                {/* The content array is mapped twice to ensure seamless looping */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center">

                        <span className="flex items-center gap-4 mx-8">
                            Natural Healing <Leaf className="w-4 h-4 text-[#C17C3A]" />
                        </span>

                        <span className="flex items-center gap-4 mx-8">
                            Boost Vitality <Zap className="w-4 h-4 text-[#C17C3A]" />
                        </span>

                        <span className="flex items-center gap-4 mx-8">
                            Everyday Endurance <Activity className="w-4 h-4 text-[#C17C3A]" />
                        </span>

                        <span className="flex items-center gap-4 mx-8">
                            Holistic Recovery <ShieldCheck className="w-4 h-4 text-[#C17C3A]" />
                        </span>

                        <span className="flex items-center gap-4 mx-8">
                            360° Wellness <Dumbbell className="w-4 h-4 text-[#C17C3A]" />
                        </span>

                    </div>
                ))}
            </div>
        </div>
    );
}