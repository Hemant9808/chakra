import { motion } from "framer-motion";
import { Truck, ShieldCheck, Star, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const fadeIn = (direction = "up", delay = 0) => ({
    hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

  const features = [
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: "Fast & Reliable Delivery",
      desc: "We ensure quick and hassle-free delivery to your doorstep, nationwide.",
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "100% Secure Transactions",
      desc: "We use encrypted payment gateways for a safe and secure shopping experience.",
    },
    {
      icon: <Star size={32} strokeWidth={1.5} />,
      title: "Premium Quality Products",
      desc: "Our formulations are lab-tested and FSSAI certified for top-notch quality.",
    },
    {
      icon: <Headphones size={32} strokeWidth={1.5} />,
      title: "24/7 Customer Support",
      desc: "Our wellness experts are always available to assist you with any queries.",
    },
  ];

  return (
    // Background: Cream
    <section className="py-20 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", 0)}
        >
          <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
            Why Choose <span className="italic text-[#C17C3A]">Ayucan?</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", 0.3)}
          className="text-lg md:text-xl text-[#715036]/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          We prioritize <span className="text-[#2A3B28] font-bold">quality, security,</span> and <span className="text-[#2A3B28] font-bold">satisfaction</span> to ensure the best wellness experience for you.
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-[#715036]/10 shadow-sm p-8 rounded-3xl flex items-start md:items-center gap-6 hover:shadow-xl hover:border-[#C17C3A]/30 transition-all duration-300 transform hover:-translate-y-2 group text-left"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn("up", 0.2 + index * 0.2)}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#FDFBF7] rounded-2xl flex items-center justify-center text-[#C17C3A] group-hover:bg-[#C17C3A] group-hover:text-white transition-colors duration-300 shadow-inner">
                {feature.icon}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-2 group-hover:text-[#C17C3A] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#715036]/70 text-sm leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;