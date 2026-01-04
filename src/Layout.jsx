import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
// import FabButton from './components/Chat/FabButton'
import { FaWhatsapp } from 'react-icons/fa';
import Breadcrumbs from './components/common/Breadcrumbs';
import { BreadcrumbProvider, useBreadcrumb } from './context/BreadcrumbContext';


function LayoutContent() {
  const location = useLocation();
  const hideFab = location.pathname === '/chat';
  const { breadcrumbData } = useBreadcrumb();

  return (
    <>
      {/* Floating WhatsApp Button - Ayucan Theme */}
      <a
        href="https://wa.me/918799722636?text=Hi%20Ayucan%20Healthcare%2C%20I%20am%20interested%20in%20your%20Medical%20services"
        target="_blank"
        rel="noopener noreferrer"
        // Style: Deep Forest Green bg, White Text, Bronze Border, Hover effect
        className="fixed bottom-6 right-6 bg-[#2A3B28] hover:bg-[#C17C3A] text-white rounded-full p-4 shadow-[0_8px_30px_rgba(42,59,40,0.3)] z-50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-[#C17C3A]"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-[32px]" />
      </a>

      {/* Main Wrapper - Cream Background */}
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Header />
        <div className="flex-1 flex flex-col">
          <Breadcrumbs
            productName={breadcrumbData.productName}
            blogTitle={breadcrumbData.blogTitle}
            categoryName={breadcrumbData.categoryName}
          />
          <Outlet />
        </div>
        {/* {!hideFab && <FabButton />} */}
        {!hideFab && <Footer />}
      </div>
    </>
  )
}

function Layout() {
  return (
    <BreadcrumbProvider>
      <LayoutContent />
    </BreadcrumbProvider>
  );
}

export default Layout