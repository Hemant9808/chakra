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
import MarqueeBanner from "../Shop/ShopComponents/MarqueeBanner";
import WhyWellvas from "./HomeComponents/WhyWellvas";
import Testimonials from "./HomeComponents/Testimonials.jsx";
import BlogHighlights from "./HomeComponents/BlogPreview.jsx";
import FeaturedProduct from "./HomeComponents/FeaturedProduct.jsx";
import FrequentlyBoughtTogether from "./HomeComponents/FrequentlyBoughtTogether.jsx";

function Home() {
  return (
    <div className="">
      {/* <MarqueeBanner /> */}
      <PromoBanner />

      <ProductCarousel />
      {/* <VideoSlider /> */}

      <FrequentlyBoughtTogether />
      <Testimonials />
      <FeaturedProduct />
      <BlogHighlights />
      <WhyWellvas />
      <LoudAndProud />
    </div>
  );
}

export default Home;
