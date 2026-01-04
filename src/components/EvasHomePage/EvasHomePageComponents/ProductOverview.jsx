import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProductOverview = () => {
    const products = [
        { month: "01", name: "Evas Neo", subtitle: "Month 1 • Foundation", description: "Foundation & Circulation. Prepares your body for maximum nutrient absorption and flow." },
        { month: "02", name: "Evas Pro", subtitle: "Month 2 • Enhancement", description: "Enhancement & Stamina. Elevates performance, energy, and overall vitality." },
        { month: "03", name: "Evas Max", subtitle: "Month 3 • Peak Performance", description: "Peak Performance & Maintenance. Locks in results for sustained confidence and potency." },
    ];

    return (
        // Background: Cream
        <section id="products" className="py-24 bg-[#FDFBF7] relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                        The Roadmap
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A3B28]">
                        Your Complete <span className="italic text-[#C17C3A]">90-Day Journey</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((p, i) => (
                        <motion.div
                            key={p.month}
                            className="p-8 rounded-3xl bg-white border border-[#715036]/10 shadow-sm hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 group text-left relative overflow-hidden flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            {/* Large Background Number Effect */}
                            <div className="absolute -right-6 -top-6 text-[8rem] font-serif font-bold text-[#FDFBF7] group-hover:text-[#C17C3A]/5 transition-colors duration-300 select-none pointer-events-none leading-none z-0">
                                {i + 1}
                            </div>

                            <div className="relative z-10">
                                <div className="text-4xl mb-4 font-serif font-bold text-[#C17C3A]/60 group-hover:text-[#C17C3A] transition-colors duration-300">
                                    {p.month}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#2A3B28] mb-2">{p.name}</h3>
                                <p className="text-[#C17C3A] text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#715036]/10 pb-4 inline-block w-full">
                                    {p.subtitle}
                                </p>
                                <p className="text-[#715036]/80 leading-relaxed font-medium">
                                    {p.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="/learnMore"
                    className="mt-16 inline-flex items-center gap-2 text-[#2A3B28] border border-[#2A3B28]/20 bg-white hover:bg-[#2A3B28] hover:text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Learn More About the Course <ArrowRight size={16} />
                </motion.a>

            </div>
        </section>
    );
};

export default ProductOverview;