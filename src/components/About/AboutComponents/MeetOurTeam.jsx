import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Zap, Star } from "lucide-react"; 


const teamMembers = [
  { name: "Aman Kumar", role: "Founder & CEO", image: "/ResourseImages/team/Aman.png" },
  { name: "Devashish", role: "Technical Head", image: "/ResourseImages/team/Devashish.png" },
  { name: "Hariom", role: "Marketing Head", image: "/ResourseImages/team/Hariom.png" },
  { name: "Satyam Kumar", role: "Sales Head", image: "/ResourseImages/satyam.png" },
  { name: "Ravi Ranjan", role: "Chief Advisor", image: "/ResourseImages/team/Ravi.png" },
{ name: "Dev Jyoti", role: "Managing Director", image: "/ResourseImages/team/Dev.png" },
{ name: "Akash Kumar", role: "Managing Director", image: "/ResourseImages/team/Rikku.png" },

];

const TeamMemberCard = ({ member, index, isInView }) => (
  <motion.div
    key={member.name} 
    className="bg-white shadow-xl border border-green-100 p-8 rounded-2xl flex flex-col items-center text-center 
              transition transform duration-500 ease-in-out 
              hover:shadow-green-300/50 hover:-translate-y-2 hover:bg-green-50"
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: index * 0.15 }}
  >
    <div className="relative mb-6">
      <img
        src={member.image}
        alt={`Profile image of ${member.name}, ${member.role} at Wellvas Healthcare`}
        className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-500/50"
      />
      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 shadow-md">
        {member.role.includes("Founder") ? <Star size={18} /> : <Briefcase size={18} />}
      </div>
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
    <p className="text-md font-medium text-green-600">{member.role}</p>
  </motion.div>
);


export default function MeetOurTeam() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" }); 

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-8 md:px-12 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* 🎯 STYLING CHANGES APPLIED HERE */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}>
          
          {/* New Style: Italic, slightly less bold, and a custom gold-brown color */}
          <span className="font-semibold italic text-3xl md:text-4xl text-[#7a6449] block mb-2">
            Our Dedicated Team
          </span>
          
          {/* Main Part: Remains bold and uses the primary text color */}
          <span className="text-green-800 block text-5xl md:text-6xl font-black uppercase tracking-tight">
            of Wellness Experts
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}>
          The passionate minds behind **Wellvas Healthcare** are committed to developing effective, **natural wellness solutions** and **quality supplements** for your optimal health journey.
        </motion.p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.name} 
              member={member} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}