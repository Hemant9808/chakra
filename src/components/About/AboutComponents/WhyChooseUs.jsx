import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaThumbsUp, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const fadeIn = (direction = "up", delay = 0) => ({
    hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", 0)}
          className="text-4xl md:text-5xl font-bold mb-6">
          Why Choose Us?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", 0.3)}
          className="text-lg md:text-xl text-gray-600 mb-10">
          We prioritize quality, security, and customer satisfaction to ensure the best experience for you.
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4 hover:shadow-xl transition transform hover:-translate-y-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.2)}>
            <FaShippingFast className="text-blue-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold">Fast & Reliable Delivery</h3>
              <p className="text-gray-600 text-sm">We ensure quick and hassle-free delivery to your doorstep.</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4 hover:shadow-xl transition transform hover:-translate-y-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.4)}>
            <FaShieldAlt className="text-green-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold">100% Secure Transactions</h3>
              <p className="text-gray-600 text-sm">We use encrypted payment gateways for a secure shopping experience.</p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4 hover:shadow-xl transition transform hover:-translate-y-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.6)}>
            <FaThumbsUp className="text-yellow-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold">Premium Quality Products</h3>
              <p className="text-gray-600 text-sm">Our products are tested and certified for top-notch quality.</p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4 hover:shadow-xl transition transform hover:-translate-y-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.8)}>
            <FaHeadset className="text-red-500 text-5xl" />
            <div>
              <h3 className="text-2xl font-semibold">24/7 Customer Support</h3>
              <p className="text-gray-600 text-sm">We are always available to assist you with any queries.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
