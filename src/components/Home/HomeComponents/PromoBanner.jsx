import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  // {
  //   id: 1,
  //   imageSmall: "/ResourseImages/promo4Mob.jpg", 
  //   imageLarge: "/ResourseImages/promo1.jpg", 
  //   button: "Explore Now",
  // },
  {
    id: 2,
    imageSmall: "/ResourseImages/promo1Mob.jpg",
    imageLarge: "/ResourseImages/promo2.jpg",
    button: "Shop Wellness",
  },
  {
    id: 3,
    imageSmall: "/ResourseImages/promo2Mob.jpg",
    imageLarge: "/ResourseImages/promo3.jpg",
    button: "Discover Ayurveda",
  },
];

export default function PromoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Container: Adjusts margin for header height
    <div className="relative w-full mt-20 md:mt-24 group">

      {/* ASPECT RATIO:
         - Mobile: aspect-[16/9] (Standard Horizontal Landscape)
         - Medium & Up: aspect-[3/1] (Wide Panoramic)
      */}
      <div className="relative w-full aspect-[16/9] md:aspect-[3/1] overflow-hidden bg-[#2A3B28]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
          >
            <picture key={slide.id}>
              {/* LOGIC UPDATE:
                 1. Medium (Tablet) & Large Screens (>= 768px): Load 'imageLarge'
                 2. Small Screens (< 768px): Load 'imageSmall' via <img> tag
              */}
              <source
                srcSet={slide.imageLarge}
                media="(min-width: 768px)"
              />

              {/* Fallback for Mobile (< 768px) */}
              <img
                src={slide.imageSmall}
                alt={`Ayucan Promo ${slide.id}`}
                className="h-full w-full object-cover object-center"
              />
            </picture>

            {/* Gradient Overlay & Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A3B28]/90 via-transparent to-transparent flex flex-col justify-end items-center pb-8 md:pb-16 px-4">
              <div
                className={`transition-all duration-700 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
              >
                <Link
                  to="/shop/all"
                  className="inline-flex items-center gap-2 bg-[#C17C3A] text-white px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#2A3B28] hover:shadow-[0_0_20px_rgba(193,124,58,0.3)] transition-all duration-300 border border-white/10"
                >
                  {slide.button}
                  <FaArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-0 right-0 z-30 flex justify-center gap-2 md:gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${idx === current
                  ? "w-6 md:w-8 bg-[#C17C3A]"
                  : "w-1.5 md:w-2 bg-white/50 hover:bg-white"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}