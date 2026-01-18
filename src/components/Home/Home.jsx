import React from "react";
import HeroSection from "./HomeComponents/HeroSection";
import LoudAndProud from "./HomeComponents/LoudAndProud";
import ProductSlider from "./HomeComponents/ProductSlider";
import ProductCarousel from "./HomeComponents/ProductCarousel";
import VideoSlider from "./HomeComponents/VideoSlider";
import OfficeMap from "./HomeComponents/OfficeMap";
import HeroSlider from "./HomeComponents/ProductCarousel";
import PromoBanner from "./HomeComponents/PromoBanner";
import Hero from "./HomeComponents/Hero";
import WhyAyucan from "./HomeComponents/WhyAyucan";
import Testimonials from "./HomeComponents/Testimonials.jsx";
import BlogHighlights from "./HomeComponents/BlogPreview.jsx";
import FeaturedProduct from "./HomeComponents/FeaturedProduct.jsx";
import FrequentlyBoughtTogether from "./HomeComponents/FrequentlyBoughtTogether.jsx";
import BenefitsOfAyurveda from "./HomeComponents/BenefitsOfAyurveda.jsx";
import TrustSection from "./HomeComponents/TrustSection.jsx";
import CBDSection from "./HomeComponents/CBDSection.jsx";
import MarqueeBanner from "./HomeComponents/MarqueeBanner.jsx";
import InfluencerVideoSync from "./HomeComponents/InfluencerVideoSync.jsx";
import MensWellnessImage from "./HomeComponents/MensWellnessImage.jsx";
import SelectConcern from "./HomeComponents/SelectConcern.jsx";


function Home() {
  return (
    <div className="">
      {/* <MarqueeBanner /> */}
      <PromoBanner />
      {/* <SelectConcern /> */}
      <ProductCarousel />

      {/* <VideoSlider /> */}
      <BenefitsOfAyurveda />

      <FrequentlyBoughtTogether />
      {/* <MensWellnessImage /> */}
      <FeaturedProduct />
      <MarqueeBanner />
      {/* <CBDSection /> */}
      <Testimonials />
      <InfluencerVideoSync />
      <BlogHighlights />
      <WhyAyucan />
      <LoudAndProud />
      <TrustSection />

    </div>
  );
}

export default Home;
