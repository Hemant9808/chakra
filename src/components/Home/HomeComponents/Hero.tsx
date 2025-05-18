import React, { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-black/30 mix-blend-multiply"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6) contrast(1.2)"
          }}
        ></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between py-20">
        <div className={`max-w-2xl transition-all duration-1000 delay-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Ancient Wisdom for 
            <span className="block gold-gradient-text">
              Modern Wellness
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            Discover our premium Ayurvedic formulations crafted from rare herbs and ancient recipes for holistic well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <Button size="lg" className="bg-ayurveda-gold hover:bg-ayurveda-gold/90 text-ayurveda-darkpurple font-medium text-lg px-8">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white">
              Learn About Ayurveda
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
          </div>
        </div>

        <div className={`mt-12 md:mt-0 transition-all duration-1000 delay-500 transform ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-ayurveda-gold/20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80" 
              alt="Ayurvedic Products" 
              className="relative rounded-full h-64 w-64 md:h-80 md:w-80 object-cover border-2 border-ayurveda-gold/50"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-1 h-12 rounded-full bg-ayurveda-gold/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-ayurveda-gold animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;