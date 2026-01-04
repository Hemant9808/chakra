import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const HeroSectionEvas = () => {
    return (
        // Background: Cream
        <section className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12 relative z-10">

                {/* TEXT SECTION */}
                <motion.div
                    className="lg:w-1/2 text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Bold Tagline Statement */}
                    <div className="mb-6">
                        <p className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28] tracking-tight">
                            Ayurveda <span className="italic text-[#C17C3A]">Can.</span>
                        </p>
                    </div>

                    <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                        Ayucan Wellness Series
                    </span>

                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2A3B28] leading-tight">
                        Unlock Your <br />
                        <span className="text-[#C17C3A] italic">Peak Performance</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl font-medium text-[#715036] mt-6 border-l-4 border-[#C17C3A] pl-4 bg-white/50 py-2 rounded-r-lg inline-block lg:block">
                        The Ultimate 90-Day Wellness Transformation
                    </h2>

                    <p className="text-lg text-[#715036]/80 mt-6 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                        Natural, clinically-backed formulations designed to elevate stamina, vitality,
                        and confidence — the safe way.
                    </p>

                    {/* CTA */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <motion.a
                            href="/product/68fb2ee93021eca611493cac"
                            aria-label="Buy the 90-day wellness transformation trio"
                            className="inline-flex items-center justify-center px-10 py-5 mt-10 text-lg font-bold uppercase tracking-widest text-white bg-[#2A3B28] rounded-full shadow-xl hover:bg-[#C17C3A] transition-all duration-300 transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get the 90-Day Trio
                        </motion.a>

                        <p className="mt-4 text-sm font-bold text-[#715036] tracking-wide bg-[#C17C3A]/10 px-4 py-2 rounded-lg border border-[#C17C3A]/20">
                            Use Code <span className="font-extrabold text-[#C17C3A] text-lg mx-1">“EVAS”</span> for 10% Instant Off
                        </p>
                    </motion.div>

                    {/* TRUST SIGNALS */}
                    <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-bold text-[#2A3B28]">
                        <TrustSignal text="Backed by Clinical Research" />
                        <TrustSignal text="Discreet Shipping" />
                        <TrustSignal text="100% Natural Ingredients" />
                    </div>
                </motion.div>

                {/* PRODUCT IMAGE */}
                <motion.div
                    className="lg:w-1/2 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    {/* Abstract Backdrop for Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C17C3A]/20 to-transparent rounded-full blur-2xl scale-90 pointer-events-none"></div>

                    <motion.img
                        loading="lazy"
                        src="./ResourseImages/evas.jpg"
                        alt="Evas Neo, Evas Pro, Evas Max wellness trio product"
                        className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-[#715036]/10 relative z-10"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

const TrustSignal = ({ text }) => (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#715036]/10">
        <div className="bg-[#2A3B28] rounded-full p-0.5 text-white">
            <Check size={12} strokeWidth={3} />
        </div>
        <span className="uppercase tracking-wide text-xs">{text}</span>
    </div>
);

export default HeroSectionEvas;