import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Instagram, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_VIDEOS = [
        { id: 1, title: "Fitness Motivation", username: "@zishanfailure", url: "/ResourseImages/Videos/Zishan.mp4", profileUrl: "https://www.instagram.com/zishanfailure/" },
        { id: 2, title: "Healthy Meal Prep", username: "@monufitness07", url: "/ResourseImages/Videos/Monu1.mp4", profileUrl: "https://www.instagram.com/monufitness07/" },
        { id: 3, title: "Workout Challenge", username: "@paras0602_", url: "/ResourseImages/Videos/Paras.mp4", profileUrl: "https://www.instagram.com/paras0602_/" },
        // { id: 4, title: "Morning Yoga Flow", username: "@crazy_arvind_", url: "/ResourseImages/Videos/Arvind.mp4", profileUrl: "https://www.instagram.com/crazy_arvind_/" },
];

// Helper component for managing a single video element
const VideoCard = ({ video, isActive, onToggleSound, videoRefs, isPlaying, index }) => {
        const videoRef = useRef(null);

        // Store the ref in the parent component's centralized ref object
        useEffect(() => {
                if (videoRef.current) {
                        videoRefs.current[video.id] = videoRef.current;
                        videoRef.current.muted = !isActive;
                        videoRef.current.loop = true;
                        videoRef.current.playsInline = true;
                        videoRef.current.play().catch(e => console.log(`Auto-play blocked for ${video.id}:`, e));
                }
        }, [video.id, isActive, videoRefs]);

        // Handle play/pause sync when the global state changes
        useEffect(() => {
                if (videoRef.current) {
                        if (isPlaying) {
                                setTimeout(() => {
                                        videoRef.current.play().catch(e => console.log(`Play failed for sync ${video.id}:`, e));
                                }, 50);
                        } else {
                                videoRef.current.pause();
                        }
                }
        }, [isPlaying]);

        return (
                <motion.div
                        onClick={() => onToggleSound(video.id)}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 border-2 ${isActive ? 'border-[#C17C3A]' : 'border-transparent'}`}
                >
                        <video
                                ref={videoRef}
                                src={video.url}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                muted={!isActive}
                                poster={`https://placehold.co/400x600/2A3B28/FFFFFF?text=${video.username}`}
                        />

                        {/* Overlay controls and label */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A3B28]/90 via-transparent to-transparent p-5 flex flex-col justify-end">

                                {/* Instagram Profile Link & Username */}
                                <a
                                        href={video.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 hover:text-[#C17C3A] transition"
                                        onClick={(e) => e.stopPropagation()}
                                >
                                        <Instagram size={14} />
                                        {video.username}
                                </a>

                                {/* Video Title */}
                                <h3 className={`font-serif font-bold transition-all duration-300 leading-tight ${isActive ? 'text-2xl text-[#C17C3A]' : 'text-xl text-white'}`}>
                                        {video.title}
                                </h3>

                                {/* Mute/Unmute Button */}
                                <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={(e) => { e.stopPropagation(); onToggleSound(video.id); }}
                                        className={`mt-4 p-3 rounded-full transition-all duration-300 shadow-lg self-start backdrop-blur-sm border border-white/10 ${isActive ? 'bg-[#C17C3A] text-white' : 'bg-black/40 text-white hover:bg-[#2A3B28]'
                                                }`}
                                        aria-label={isActive ? `Mute ${video.title}` : `Unmute ${video.title}`}
                                >
                                        {isActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                </motion.button>
                        </div>
                </motion.div>
        );
};

// Main Component
export default function InfluencerVideoSync() {
        const [activeVideoId, setActiveVideoId] = useState(null);
        const [isPlaying, setIsPlaying] = useState(true);
        const videoRefs = useRef({});

        const syncPlayback = (play) => {
                Object.values(videoRefs.current).forEach(video => {
                        if (video) {
                                if (play) {
                                        video.play().catch(e => console.log("Playback failed for sync:", e));
                                } else {
                                        video.pause();
                                }
                        }
                });
        };

        useEffect(() => {
                syncPlayback(isPlaying);
        }, [isPlaying]);

        const handleToggleSound = (id) => {
                setActiveVideoId(prevId => prevId === id ? null : id);
        };

        const toggleGlobalPlayback = () => {
                setIsPlaying(prev => !prev);
        };

        return (
                // Background: Cream
                <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 font-sans relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                        <header className="max-w-6xl mx-auto text-center mb-12 relative z-10">
                                <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Community</span>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2A3B28] mb-6">
                                        The <span className="italic text-[#C17C3A]">Ayucan</span> Squad
                                </h1>
                                <p className="text-lg text-[#715036]/70 max-w-2xl mx-auto font-medium leading-relaxed">
                                        Real stories, real strength. Tap any video to listen to their wellness journey.
                                </p>
                        </header>

                        {/* Global Play/Pause Control */}
                        <div className="text-center mb-16 relative z-10">
                                <button
                                        onClick={toggleGlobalPlayback}
                                        className="bg-[#2A3B28] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-[#C17C3A] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:shadow-xl"
                                >
                                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                        {isPlaying ? 'Pause All Reels' : 'Play All Reels'}
                                </button>
                        </div>

                        {/* Video Grid */}
                        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                {MOCK_VIDEOS.map((video, index) => (
                                        <VideoCard
                                                key={video.id}
                                                video={video}
                                                isActive={video.id === activeVideoId}
                                                onToggleSound={handleToggleSound}
                                                videoRefs={videoRefs}
                                                isPlaying={isPlaying}
                                                index={index}
                                        />
                                ))}
                        </div>
                </div>
        );
}