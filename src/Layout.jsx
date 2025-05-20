import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import FabButton from './components/Chat/FabButton'

function Layout() {
  
  const location = useLocation();
  const hideFab = location.pathname === '/chat';
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {!hideFab && <FabButton />}
     {!hideFab && <Footer />}
    </div>
  )
}

export default Layout