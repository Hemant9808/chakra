import React from "react";
import { motion } from "framer-motion";
import AyurvedaSection from "./components/AyurvedaSection";
import FeaturedProducts from "./components/FeaturedProducts";
import TestimonialsTimeline from "./components/TestimonialsTimeline";
import SustainabilitySection from "./components/SustainabilitySection";
import WellnessCallToAction from "./components/WellnessCallToAction";

export default function WellvasLandingPage() {
  return (
    <div>
      <AyurvedaSection />
      <FeaturedProducts />
      <TestimonialsTimeline />
      <SustainabilitySection />
      <WellnessCallToAction />
    </div>
  );
}
