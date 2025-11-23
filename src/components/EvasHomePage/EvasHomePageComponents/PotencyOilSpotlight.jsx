import { motion } from "framer-motion";

const PotencyOilSpotlight = () => {
    return (
        <section 
            id="potency-oil"
            className="py-20 bg-[#e3f2fd]"
            aria-label="Potency Oil - Fast acting performance booster"
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">

                {/* Heading */}
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-[#0d47a1] mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Immediate Enhancement.
                </motion.h2>

                <motion.p
                    className="text-xl text-gray-700 max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Experience <strong>Potency Oil</strong> — a fast-acting, topical booster designed 
                    for enhanced sensitivity, confidence, and on-demand performance.
                </motion.p>

                {/* CONTENT GRID */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">

                    {/* IMAGE */}
                    <motion.div
                        className="md:w-1/3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.img
                            loading="lazy"
                            src="https://placehold.co/300x400/1e88e5/ffffff?text=Potency+Oil"
                            alt="Potency Oil by Wellvas — Performance Boosting Topical Formula"
                            className="w-48 mx-auto rounded-xl shadow-xl"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                    "https://placehold.co/300x400/90a4ae/ffffff?text=Oil+Product+Image";
                            }}
                        />
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.div
                        className="md:w-2/3 text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ul className="space-y-5 text-lg text-gray-700 leading-relaxed">
                            <li className="flex items-start">
                                <span className="text-green-500 font-bold mr-3 text-2xl">•</span>
                                Boosts sensitivity, arousal, and pleasure within minutes.
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 font-bold mr-3 text-2xl">•</span>
                                Non-greasy, lightweight, and fast-absorbing formula.
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 font-bold mr-3 text-2xl">•</span>
                                Works synergistically with the 90-Day Wellness Trio.
                            </li>
                        </ul>

                        {/* CTA Button */}
                        <motion.a
                            href="#"
                            aria-label="Buy Potency Oil individually"
                            className="mt-10 inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Shop Potency Oil Separately
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PotencyOilSpotlight;
