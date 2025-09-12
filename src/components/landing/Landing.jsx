import AyurvedaSection from "./AyurvedaSection";
import CTA from "./WellnessCallToAction";
import SustainabilitySection from "./SustainabilitySection";
import TestimonialsTimeline from "./TestimonialsTimeline";
import React from 'react'
import FeaturedProduct from "../Home/HomeComponents/FeaturedProduct";

function Landing() {
  return (
    <div>
        <AyurvedaSection />
        <TestimonialsTimeline />
        <FeaturedProduct />
        <SustainabilitySection />
        <CTA />
    </div>
  )
}

export default Landing
