import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroSection from './components/Home/HomeComponents/HeroSection'
import Header from './components/Header/Header'
import LoudAndProud from './components/Home/HomeComponents/LoudAndProud'
import ProductSlider from './components/Home/HomeComponents/ProductSlider'
import Footer from './components/Footer/Footer'
import ProductCarousel from './components/Home/HomeComponents/ProductCarousel'
import VideoSlider from './components/Home/HomeComponents/VideoSlider'
import OfficeMap from './components/Home/HomeComponents/OfficeMap'
import HeroSlider from './components/Home/HomeComponents/ProductCarousel'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />

    <HeroSlider />
    <HeroSection />
    <LoudAndProud />
    <VideoSlider />
    <ProductSlider />
    <ProductCarousel />
    <OfficeMap />
    
    <Footer />
    </>
  )
}

export default App
