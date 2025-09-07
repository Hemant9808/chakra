import AyurvedaSection from "./AyurvedaSection";
import FeaturedProducts from "./FeaturedProducts";
import CTA from "./WellnessCallToAction";
import SustainabilitySection from "./SustainabilitySection";
import TestimonialsTimeline from "./TestimonialsTimeline";

import React from 'react'

function Landing() {
  return (
    <div>
        <AyurvedaSection />
        <TestimonialsTimeline />
        <FeaturedProducts />
        <SustainabilitySection />
        <CTA />
    </div>
  )
}

export default Landing
