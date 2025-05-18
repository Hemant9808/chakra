import React from "react";
import HeroSection from './HomeComponents/HeroSection'
import LoudAndProud from './HomeComponents/LoudAndProud'
import ProductSlider from './HomeComponents/ProductSlider'
import ProductCarousel from './HomeComponents/ProductCarousel'
import VideoSlider from './HomeComponents/VideoSlider'
import OfficeMap from './HomeComponents/OfficeMap'
import HeroSlider from './HomeComponents/ProductCarousel'
import PromoBanner from "./HomeComponents/PromoBanner";
import Hero from "./HomeComponents/Hero";

function Home(){
    return (
        <div className="">
        <MarqueeBanner />
        <PromoBanner />
        
    
        {/* <HeroSection /> */}
        {/* <Hero/> */}
       
        <HeroSlider />
       
        <VideoSlider />
        <ProductCarousel />
        <ProductSlider />
        
        <LoudAndProud />
        {/* <OfficeMap /> */}
        
        </div>
      )
}

export default Home