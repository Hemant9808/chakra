import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const companyInfo = {
    name: 'Charak Wellness',
    description: 'We are dedicated to providing premium Ayurvedic formulations crafted from rare herbs and ancient recipes for holistic well-being.',
    founded: '2020',
    mission: 'To promote wellness through the wisdom of Ayurveda.',
    vision: 'To be the leading provider of natural wellness solutions globally.'
  };

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 1' },
    { src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 2' },
    { src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 3' },
    { src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 4' },
    { src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 5' },
    { src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80', alt: 'Ayurvedic Product 6' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">Gallery</h1>
      </header>

      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6) contrast(1.2)' }}></div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-bold text-white z-10">Welcome to Our Gallery</motion.h2>
      </section>

      <section className="container mx-auto p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">{companyInfo.name}</h2>
          <p className="text-gray-700 mb-4">{companyInfo.description}</p>
          <p className="text-gray-700 mb-4">Founded: {companyInfo.founded}</p>
          <p className="text-gray-700 mb-4">Mission: {companyInfo.mission}</p>
          <p className="text-gray-700 mb-4">Vision: {companyInfo.vision}</p>
        </motion.div>
      </section>

      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Our Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="overflow-hidden rounded-lg shadow-lg">
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery; 