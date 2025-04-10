import React from "react";
import HeroSection from "./AboutComponents/HeroSection";
import MissionVision from "./AboutComponents/MissionVision";
import WhatWeOffer from "./AboutComponents/WhatWeOffer";
import MeetOurTeam from "./AboutComponents/MeetOurTeam";
import WhyChooseUs from "./AboutComponents/WhyChooseUs";
import ContactSocialMedia from "./AboutComponents/ContactSocialMedia";

function About(){
    return (
        <>
        <HeroSection />
        <MissionVision />
        <WhatWeOffer />
        {/* <MeetOurTeam /> */}
        <WhyChooseUs />
        <ContactSocialMedia />
        </>
    )
}

export default About