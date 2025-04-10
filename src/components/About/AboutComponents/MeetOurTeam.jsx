import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const teamMembers = [
  { name: "Devashish", role: "CTO & Founder", image: "/images/devashish.png" },
  { name: "Aarav Mehta", role: "Marketing Head", image: "/images/aarav.png" },
  { name: "Ishaan Verma", role: "Lead Developer", image: "/images/ishaan.png" },
  { name: "Neha Sharma", role: "Product Designer", image: "/images/neha.png" },
];

const MeetOurTeam = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}>
          Meet Our Team
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          A passionate team behind **CharakWellness**, dedicated to bringing **natural wellness solutions**.
        </motion.p>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}>
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-green-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
