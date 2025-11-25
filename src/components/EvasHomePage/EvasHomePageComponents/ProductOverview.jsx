import { motion } from "framer-motion";

const ProductOverview = () => {
    const products = [
        { month: 1, name: "Evas Neo (Month 1)", description: "Foundation & Circulation. Prepares your body for maximum nutrient absorption and flow." },
        { month: 2, name: "Evas Pro (Month 2)", description: "Enhancement & Stamina. Elevates performance, energy, and overall vitality." },
        { month: 3, name: "Evas Max (Month 3)", description: "Peak Performance & Maintenance. Locks in results for sustained confidence and potency." },
    ];

    return (
        <section id="products" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                    Your Complete 90-Day Performance Journey
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((p, i) => (
                        <motion.div
                            key={p.month}
                            className="p-6 rounded-xl bg-white shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            <div className="text-4xl mb-3 text-[#1565c0] font-extrabold">
                                {p.month}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                            <p className="text-gray-600">{p.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="/learnMore"
                    className="mt-12 inline-block text-[#0d47a1] border border-[#0d47a1] hover:bg-[#0d47a1] hover:text-white px-10 py-3 rounded-full font-semibold transition"
                    whileHover={{ scale: 1.05 }}
                >
                    Learn More About the Course
                </motion.a>

            </div>
        </section>
    );
};

export default ProductOverview;
