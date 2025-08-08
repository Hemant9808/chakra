import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
// import FabButton from './components/Chat/FabButton'
import { FaWhatsapp } from 'react-icons/fa';

function Layout() {
  
  const location = useLocation();
  const hideFab = location.pathname === '/chat';
  return (
    <>
    {/* Floating WhatsApp Button - Dark Theme */}
      <a
        href="https://wa.me/918271442413?text=Hi%20Wellvas%20Healthcare%2C%20I%20am%20interested%20in%20your%20Medical%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#111827] hover:bg-[#1f2937] text-green-400 rounded-full p-5 shadow-xl z-50 transition-transform transform hover:scale-110 border border-green-500"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-[30px]" />
      </a>
    
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {/* {!hideFab && <FabButton />} */}
     {!hideFab && <Footer />}
    </div>
    </>
  )
}

export default Layout