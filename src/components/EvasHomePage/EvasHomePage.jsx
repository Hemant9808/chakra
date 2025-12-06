import React from "react";
import HeroSectionEvas from "./EvasHomePageComponents/HeroSectionEvas";
import ProductOverview from "./EvasHomePageComponents/ProductOverview";
import PotencyOilSpotlight from "./EvasHomePageComponents/PotencyOilSpotlight";
import ProductCarousel from "./EvasHomePageComponents/ProductCarousel";
import AyurvedaWithPotencyMerged from "./EvasHomePageComponents/AyurvedaSolutionSection";




function EvasHomePage() {
  return (
    <div className="">
      <HeroSectionEvas />
      <ProductOverview />
      <ProductCarousel />
      <AyurvedaWithPotencyMerged />
      {/* <PotencyOilSpotlight /> */}
      
      
    </div>
  );
}

export default EvasHomePage;
