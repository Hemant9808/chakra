import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Instagram } from 'lucide-react';
import { motion } from 'framer-motion'; 

// Corrected Mock Data: Ensure all local files start with a leading slash (/)
const MOCK_VIDEOS = [
  // FIX 1: Corrected local path
  { id: 1, title: "Fitness Motivation", username: "@zishanfailure", url: "/ResourseImages/Videos/Zishan.mp4", profileUrl: "https://www.instagram.com/zishanfailure/" },
  // FIX 2: Your original local path was already correct
  { id: 2, title: "Healthy Meal Prep", username: "@monufitness07", url: "/ResourseImages/Videos/Monu1.mp4", profileUrl: "https://www.instagram.com/monufitness07/" },
  // External URLs (These are reliable MP4 streaming links for testing)
  { id: 3, title: "Workout Challenge", username: "@paras0602_", url: "/ResourseImages/Videos/Paras.mp4", profileUrl: "https://www.instagram.com/paras0602_/" },
//   { id: 4, title: "Morning Yoga Flow", username: "@crazy_arvind_", url: "/ResourseImages/Videos/Arvind.mp4", profileUrl: "https://www.instagram.com/crazy_arvind_/" },
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
      // Attempt to auto-play (will be silent because isActive is null initially)
      videoRef.current.play().catch(e => console.log(`Auto-play blocked for ${video.id}:`, e)); 
    }
  }, [video.id, isActive, videoRefs]);

  // Handle play/pause sync when the global state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        // We use a small timeout to try and beat any initial browser throttling
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
        // 🎯 FIX: Added onClick to the main card container
        onClick={() => onToggleSound(video.id)}

        // ENHANCEMENT 1: Card entrance animation
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }} // ENHANCEMENT 2: Subtle hover effect
      className="relative w-full aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300" // Added border hover
    >
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        muted={!isActive}
        poster={`https://placehold.co/400x600/355425/FFFFFF?text=${video.username}`}
        // Removed inline onClick here to prevent double triggering
      />

      {/* Overlay controls and label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
        
        {/* Instagram Profile Link & Username */}
        {/* Note: We must STOP PROPAGATION on this link to prevent it from also triggering onToggleSound */}
        <a 
          href={video.profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white text-sm font-semibold mb-1 flex items-center gap-1 hover:text-yellow-300 transition"
          onClick={(e) => e.stopPropagation()} 
        >
          <Instagram size={14} />
          {video.username}
        </a>

        {/* Video Title */}
        <h3 className={`text-white font-bold transition-all duration-300 ${isActive ? 'text-xl text-yellow-300' : 'text-lg'}`}>
          {video.title}
        </h3>

        {/* Mute/Unmute Button - remains for clarity, but the card click is the main trigger */}
        <motion.button
            // ENHANCEMENT 3: Button click animation
            whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); onToggleSound(video.id); }} // STOP PROPAGATION needed here too
          className={`mt-3 p-3 rounded-full transition-colors duration-300 shadow-xl self-start ${
            isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          aria-label={isActive ? `Mute ${video.title}` : `Unmute ${video.title}`}
        >
          {isActive ? <Volume2 className="w-5 h-5 text-black" /> : <VolumeX className="w-5 h-5 text-white" />}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Component
export default function InfluencerVideoSync() {
  // FIX 1: Start with NO active video ID (all muted initially)
  const [activeVideoId, setActiveVideoId] = useState(null); 
  // FIX 2: Start with isPlaying set to TRUE to ensure playback starts on mount
  const [isPlaying, setIsPlaying] = useState(true); 
  const videoRefs = useRef({});

  const syncPlayback = (play) => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        if (play) {
          // Attempting to play synchronously
          video.play().catch(e => console.log("Playback failed for sync:", e));
        } else {
          video.pause();
        }
      }
    });
  };

  // Effect to re-sync playback when isPlaying state changes
  useEffect(() => {
    syncPlayback(isPlaying);
  }, [isPlaying]);

  // Handle click on any sound button
  const handleToggleSound = (id) => {
    // Toggle the sound source
    setActiveVideoId(prevId => prevId === id ? null : id);
  };

  // Toggle global playback (Play/Pause All)
  const toggleGlobalPlayback = () => {
    setIsPlaying(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-sans">
      <header className="max-w-6xl mx-auto text-center mb-10">
        {/* UPDATED TITLE SECTION CONTENT */}
        <h1 className="text-5xl font-black text-green-800 mb-2 tracking-tighter">
          #Wellvas <span className="text-gray-900">Endurance</span> Squad
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
          All vertical videos play simultaneously and muted by default. Click any volume icon to activate sound.
        </p>
      </header>

      {/* Global Play/Pause Control */}
      <div className="text-center mb-10">
        <button
          onClick={toggleGlobalPlayback}
          className="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-green-600 transition duration-300 uppercase tracking-wide" // Classier button
        >
          {isPlaying ? 'Pause All Reels' : 'Play All Reels'}
        </button>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_VIDEOS.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={video.id === activeVideoId}
            onToggleSound={handleToggleSound}
            videoRefs={videoRefs}
            isPlaying={isPlaying}
            index={index} // Pass index for entrance animation delay
          />
        ))}
        </div>
    </div>
  );
}