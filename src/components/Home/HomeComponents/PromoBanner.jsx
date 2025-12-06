import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
//   {
//     id: 1,
//     imageSmall: "/ResourseImages/promo4Mob.jpg", 
//     imageLarge: "/ResourseImages/promo1.jpg", 
//     button: "Explore Now",
//   },
  {
    id: 2,
    imageSmall: "/ResourseImages/promo1Mob.jpg",
    imageLarge: "/ResourseImages/promo2.jpg",
    button: "Explore Now",
  },
  {
    id: 3,
    imageSmall: "/ResourseImages/promo2Mob.jpg",
    imageLarge: "/ResourseImages/promo3.jpg",
    button: "Explore Now",
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
    <div className="relative w-full max-w-7xl mx-auto mt-6 md:mt-16 px-2">
      
      {/* FIX: Adjusting the aspect ratio based on the screen size (and thus the loaded image).
        - aspect-video (16:9) is the mobile default.
        - lg:aspect-[3/1] is an example custom ratio for the large images. 
          You may need to change 3/1 to 2/1, 4/1, 21/9, etc., to perfectly match your imageLarge files.
      */}
      <div className="relative w-full aspect-video lg:aspect-[3/1] overflow-hidden rounded-2xl shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <picture>
              {/* 1. Large Screens (>= 1024px): Use the LARGE image */}
              <source 
                srcSet={slide.imageLarge} 
                media="(min-width: 1024px)" 
              />
                
              {/* 2. Medium Screens (>= 768px): Use the SMALL image */}
              <source 
                srcSet={slide.imageSmall} 
                media="(min-width: 768px)" 
              />
                
              {/* 3. Small Screens (Default Fallback): Use the SMALL image */}
              <img
                src={slide.imageSmall}
                alt={`slide-${slide.id}`}
                className="h-full w-full object-cover rounded-2xl"
              />
            </picture>

            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-4 md:pb-6 px-4 text-white rounded-2xl">
              <Link
                to="/shop/all"
                className="bg-white text-black px-5 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-gray-200 transition inline-block"
              >
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}