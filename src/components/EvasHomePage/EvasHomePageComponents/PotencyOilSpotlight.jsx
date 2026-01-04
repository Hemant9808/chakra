import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const PotencyOilSpotlight = () => {
    return (
        // Background: Cream
        <section
            id="potency-oil"
            className="py-24 bg-[#FDFBF7] relative overflow-hidden"
            aria-label="Potency Oil - Fast acting performance booster"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                        Instant Vitality
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
                        Immediate <span className="italic text-[#C17C3A]">Enhancement.</span>
                    </h2>
                </motion.div>

                <motion.p
                    className="text-xl text-[#715036]/80 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Experience <strong>Potency Oil</strong> — a fast-acting, topical booster designed
                    for <span className="text-[#2A3B28] font-bold">enhanced sensitivity, confidence,</span> and on-demand performance.
                </motion.p>

                {/* CONTENT GRID */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-16">

                    {/* IMAGE */}
                    <motion.div
                        className="md:w-1/3 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Abstract Backdrop for Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#C17C3A]/20 to-transparent rounded-full blur-2xl scale-90 pointer-events-none"></div>

                        <motion.img
                            loading="lazy"
                            src="https://placehold.co/300x400/2A3B28/ffffff?text=Potency+Oil"
                            alt="Potency Oil by Ayucan — Performance Boosting Topical Formula"
                            className="w-56 mx-auto rounded-3xl shadow-2xl border border-[#715036]/10 relative z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                    "https://placehold.co/300x400/90a4ae/ffffff?text=Oil+Product+Image";
                            }}
                        />
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.div
                        className="md:w-1/2 text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="space-y-6">
                            {[
                                "Boosts sensitivity, arousal, and pleasure within minutes.",
                                "Non-greasy, lightweight, and fast-absorbing formula.",
                                "Works synergistically with the 90-Day Wellness Trio."
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-colors border border-transparent hover:border-[#715036]/10">
                                    <div className="bg-[#2A3B28] rounded-full p-1 text-white mt-1">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-lg text-[#2A3B28] font-medium leading-relaxed">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.a
                            href="#"
                            aria-label="Buy Potency Oil individually"
                            className="mt-12 inline-flex items-center gap-2 bg-[#C17C3A] hover:bg-[#a6662e] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Star size={16} fill="currentColor" /> Shop Potency Oil Separately
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PotencyOilSpotlight;