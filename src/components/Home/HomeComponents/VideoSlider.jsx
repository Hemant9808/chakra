// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const videos = [
//   "https://www.w3schools.com/html/mov_bbb.mp4",
//   "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
//   "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
// ];

// const VideoSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % videos.length);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % videos.length);
//   };

//   return (
//     <div className="relative sm:w-full     h-[500px] overflow-hidden">
//       <AnimatePresence  mode="wait">
//         <motion.video
//           key={currentIndex}
//           src={videos[currentIndex]}
//           autoPlay
//           loop
//           muted
//           className="absolute w-full h-full object-cover"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }}
//         />
//       </AnimatePresence>

//       {/* Navigation Buttons */}
//       <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
//         <ChevronLeft />
//       </button>
//       <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
//         <ChevronRight />
//       </button>
//     </div>
//   );
// };

// export default VideoSlider;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
];

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative sm:ml-20 sm:mr-3.5 w-[90%] flex justify-center items-center py-6">
      <div className="relative w-[90%] md:w-full h-[250px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentIndex}
            src={videos[currentIndex]}
            autoPlay
            loop
            muted
            className="absolute w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default VideoSlider;
