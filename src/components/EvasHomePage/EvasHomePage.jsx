import React from "react";
import HeroSection from "./EvasHomePageComponents/HeroSection";
import ProductOverview from "./EvasHomePageComponents/ProductOverview";
import PotencyOilSpotlight from "./EvasHomePageComponents/PotencyOilSpotlight";
import ProductCarousel from "./EvasHomePageComponents/ProductCarousel";
import AyurvedaWithPotencyMerged from "./EvasHomePageComponents/AyurvedaSolutionSection";



function EvasHomePage() {
  return (
    <div className="">
      <HeroSection />
      <ProductOverview />
      <ProductCarousel />
      <AyurvedaWithPotencyMerged />
      {/* <PotencyOilSpotlight /> */}
      
      
    </div>
  );
}

export default EvasHomePage;
