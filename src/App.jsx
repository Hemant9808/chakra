// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/UserProfile/ProtectedRoute';
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Quiz from './components/Quiz/Quiz';
import Cart from './components/Cart/Cart';

import ProductDetails from './components/Home/HomeComponents/ProductDetails';
import ProfilePage from './components/UserProfile/ProfilePage';
import Shop from './components/Shop/Shop';
import ProductDetailsById from './components/Shop/ProductDetails';
import { useAuthMiddleware } from './middleware/middleware';
import Orders from './components/Orders/Orders';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import Gallery from './components/Gallery/Gallery';
import BlogSection from './components/Blogs/BlogSection';
import BlogDetail from './components/Blogs/BlogDetail';
import ChatPage from './pages/ChatPage';
import OrderInfoPage from './components/OrdersInfo/OrderInfoPage';


function AppRoutes() {
  useAuthMiddleware();

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="blogs" element={<BlogSection />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="ProductDetailsById/:id" element={<ProductDetailsById />} />
          <Route path="shop" element={<Shop />} />
          <Route path="gallery" element={<Gallery />} />
          <Route
            path="profile"
            element={
              // <ProtectedRoute>
                <ProfilePage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              // <ProtectedRoute>
                <Cart />
              // </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              // <ProtectedRoute>-
                <Checkout />
              // </ProtectedRoute>
            }
          />
          <Route path="/orders" element={<OrderInfoPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;



// // App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import ProtectedRoute from './components/UserProfile/ProtectedRoute';
//  // Adjust if needed

// import Layout from './Layout';
// import Home from './components/Home/Home';
// import About from './components/About/About';
// import Contact from './components/Contact/Contact';
// import Login from './components/Login/Login';
// import Quiz from './components/Quiz/Quiz';
// import Cart from './components/Cart/Cart';
// import BlogSection from './components/Blog/BlogSection';
// import BlogDetail from './components/Blog/BlogDetail';
// import ProductDetails from './components/Home/HomeComponents/ProductDetails';
// import ProfilePage from './components/UserProfile/ProfilePage';
// import Shop from './components/Shop/Shop';
// import ProductDetailsById from './components/Shop/ProductDetails';
// import { useAuthMiddleware } from '../../../server/api/middlewares/authMiddleware';

// function App() {
//   useAuthMiddleware()
//   return (
//     <Router>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="login" element={<Login />} />
//           <Route path="quiz" element={<Quiz />} />
//           <Route path="blogs" element={<BlogSection />} />
//           <Route path="blogs/:id" element={<BlogDetail />} />
//           <Route path="product/:id" element={<ProductDetails />} />
//           <Route path="ProductDetailsById/:id" element={<ProductDetailsById />} />
//           <Route path="shop" element={<Shop />} />

//           {/* Protected Routes */}
//           <Route
//             path="profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="cart"
//             element={
//               <ProtectedRoute>
//                 <Cart />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;



















// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { ProtectedRoute, PublicRoute } from './middleware/AuthMiddleware';
// import AuthForm from './components/Login/AuthForm';
// import Header from './components/Header/Header';
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import HeroSection from './components/Home/HomeComponents/HeroSection'
// import HeroSlider from './components/Home/HomeComponents/ProductCarousel'
// import ProductDetails from './components/Shop/ProductDetails'
// import ProductDetailsById from './components/Shop/ProductDetails';
// import Cart from './components/Cart/Cart'
// import Home from './components/Home/Home'
// import Shop from './components/Shop/Shop'
// import ProfilePage from './components/UserProfile/ProfilePage';
// import { useAuthMiddleware } from '../../../server/api/middlewares/authMiddleware';


// function App() {
//   const [count, setCount] = useState(0)
//   useAuthMiddleware();

//   return (
//     <Router>
//       <Toaster position="top-right" />
//       <Header />
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <AuthForm />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <ProfilePage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
