import React from "react";
import { motion } from "framer-motion";

const HeroSectionEvas = () => {
    return (
        <section 
            className="py-20 md:py-28 bg-gradient-to-b from-[#e3f2fd] to-white"
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

                {/* TEXT SECTION */}
                <motion.div 
                    className="lg:w-1/2 text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d47a1] leading-tight">
                        Unlock Your Peak Performance
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
                        The Ultimate 90-Day Wellness Transformation
                    </h2>

                    <p className="text-lg text-gray-600 mt-6 max-w-lg mx-auto lg:mx-0">
                        Natural, clinically-backed formulations designed to elevate stamina, vitality, 
                        and confidence — the safe way.
                    </p>

                    {/* CTA */}
                    <motion.a
                        href="/ProductDetailsById/68fb2ee93021eca611493cac"
                        aria-label="Buy the 90-day wellness transformation trio"
                        className="inline-block px-12 py-4 mt-8 text-xl font-bold text-white bg-[#0d47a1] rounded-full shadow-xl"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Get the 90-Day Trio — Save 10% Extra
                    </motion.a>
                    <motion.div
  className="mt-4 flex flex-col"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <motion.p
    className="text-lg py-2 font-semibold text-[#0d47a1] tracking-wide"
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.97 }}
  >
    Use Code <span className="font-bold text-[#e91e63]">“EVAS”</span> for 10% Instant Off
  </motion.p>
</motion.div>


                    {/* TRUST SIGNALS */}
                    <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600">
                        <TrustSignal text="Backed by Clinical Research" />
                        <TrustSignal text="Discreet Shipping" />
                        <TrustSignal text="100% Natural Ingredients" />
                    </div>
                </motion.div>

                {/* PRODUCT IMAGE */}
                <motion.div 
                    className="lg:w-1/2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    <motion.img
                        loading="lazy"
                        src="./ResourseImages/evas.jpg"
                        alt="Evas Neo, Evas Pro, Evas Max wellness trio product"
                        className="w-full max-w-md mx-auto rounded-xl shadow-2xl ring-4 ring-[#1565c0] ring-offset-2"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

const TrustSignal = ({ text }) => (
    <div className="flex items-center space-x-2">
        <span className="text-green-600 text-lg font-bold">✔</span>
        <span>{text}</span>
    </div>
);

export default HeroSectionEvas;
