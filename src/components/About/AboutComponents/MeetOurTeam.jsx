import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Zap, Star, Linkedin } from "lucide-react";


const teamMembers = [
    { name: "Aman Kumar", role: "Founder & CEO", image: "/ResourseImages/team/Aman.png" },
    { name: "Devashish", role: "Technical Head", image: "/ResourseImages/team/Devashish.png" },
    { name: "Hariom", role: "Marketing Head", image: "/ResourseImages/team/Hariom.png" },
    { name: "Satyam Kumar", role: "Sales Head", image: "/ResourseImages/satyam.png" },
    { name: "Ravi Ranjan", role: "Chief Advisor", image: "/ResourseImages/team/Ravi.png" },
    { name: "Dev Jyoti", role: "Managing Director", image: "/ResourseImages/team/Dev.png" },
    { name: "Akash Sinha", role: "Managing Director", image: "/ResourseImages/team/Rikku.png" },
];

const TeamMemberCard = ({ member, index, isInView }) => (
    <motion.div
        key={member.name}
        className="bg-white shadow-sm border border-[#715036]/10 p-8 rounded-3xl flex flex-col items-center text-center 
              transition-all duration-500 ease-in-out group
              hover:shadow-xl hover:-translate-y-2 hover:border-[#C17C3A]/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 }}
    >
        {/* Decorative background hover effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C17C3A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative mb-6">
            <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-[#2A3B28] to-[#C17C3A]">
                <img
                    src={member.image}
                    alt={`Profile of ${member.name}`}
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#2A3B28] text-white rounded-full p-2 shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300">
                {member.role.includes("Founder") ? <Star size={16} fill="#C17C3A" stroke="#C17C3A" /> : <Briefcase size={16} />}
            </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-1 group-hover:text-[#C17C3A] transition-colors">{member.name}</h3>
        <p className="text-sm font-bold text-[#715036]/70 uppercase tracking-wider">{member.role}</p>

        {/* Optional: Social Icon placeholder */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Linkedin size={20} className="text-[#C17C3A] hover:text-[#2A3B28] cursor-pointer" />
        </div>
    </motion.div>
);


export default function MeetOurTeam() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

    return (
        // Background: Cream
        <section ref={sectionRef} className="py-20 px-4 sm:px-8 md:px-12 bg-[#FDFBF7] relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2A3B28]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                        Visionaries
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
                        Meet The <span className="italic text-[#C17C3A]">Experts</span>
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="text-lg md:text-xl text-[#715036]/80 mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    The passionate minds behind <span className="text-[#2A3B28] font-bold">Ayucan</span> are committed to developing effective, natural wellness solutions and quality supplements for your optimal health journey.
                </motion.p>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
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