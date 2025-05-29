import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/ResourseImages/1.png",
    button: "Shop Now",
  },
  {
    id: 2,
    image: "/ResourseImages/2.png",
    button:"Shop Now",
  },
  {
    id: 3,
    image: "/ResourseImages/3.png",
    button: "Shop Now",
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
    <div className="relative w-full max-w-7xl mx-auto h-[220px] md:h-[400px] mt-6 md:mt-16 px-2 ">
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={slide.image}
              alt={`slide-${slide.id}`}
              className=" h-full object-cover w-full max-w-7xl rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-4 md:pb-6 px-4 text-white rounded-2xl">
               <Link
               to="/shop"
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
