import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    headline: "IGNITE YOUR FITNESS JOURNEY.",
    subtext: "Achieve strength, endurance, and total well-being. Start today!",
    ctaPrimary: "START YOUR FREE TRIAL",
    ctaSecondary: "See Our Class Schedule",
    image: "</ResourseImages/promo3.jpg",
    primaryLink: "/trial",
    secondaryLink: "/schedule",
  },
  {
    id: 2,
    headline: "STATE-OF-THE-ART TRAINING.",
    subtext: "The best equipment and facilities to crush your goals.",
    ctaPrimary: "VIEW MEMBERSHIP PLANS",
    ctaSecondary: "Check Out Our Amenities",
    image: "/ResourseImages/slide2.png",
    primaryLink: "/membership",
    secondaryLink: "/amenities",
  },
  {
    id: 3,
    headline: "YOUR NEW FITNESS FAMILY.",
    subtext: "Join a supportive community dedicated to making you stronger.",
    ctaPrimary: "MEET OUR TRAINERS",
    ctaSecondary: "Read Success Stories",
    image: "/ResourseImages/slide3.png",
    primaryLink: "/trainers",
    secondaryLink: "/stories",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden text-white flex items-center justify-center">

      {/* Background image */}
      <img
        src={current.image}
        alt="Slide"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase">
          {current.headline}
        </h1>
        <p className="text-lg md:text-2xl mb-6">{current.subtext}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={current.primaryLink}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold"
          >
            {current.ctaPrimary}
          </a>

          <a
            href={current.secondaryLink}
            className="text-lg font-semibold border-b border-transparent hover:border-white"
          >
            {current.ctaSecondary} →
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentSlide ? "bg-red-600 w-5" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
