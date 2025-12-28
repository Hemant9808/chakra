// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/UserProfile/ProtectedRoute';
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import Quiz from './components/Quiz/Quiz';
import Cart from './components/Cart/Cart';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';

// import ProductDetails from './components/Home/HomeComponents/ProductDetails';
import ProfilePage from './components/UserProfile/ProfilePage';
import Shop from './components/Shop/Shop';
import { useAuthMiddleware } from './middleware/middleware';
import Orders from './components/Orders/Orders';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import Gallery from './components/Gallery/Gallery';
import BlogSection from './components/Blogs/BlogSection';
import BlogDetail from './components/Blogs/BlogDetail';
// import ChatPage from './pages/ChatPage';
import OrderInfoPage from './components/OrdersInfo/OrderInfoPage';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import RefundPolicy from './components/refund/RefundPolicy';
import TermsAndConditions from './components/T&C/TermsAndConditions';
import Faqs from './components/FaQs/Faqs';
import ProductDetailsById from './components/Shop/productDetials';
import OrderSuccess from './components/Shop/ShopComponents/orderSuccess';
import OtpVerification from './pages/Otp-verification';
import Landing from './components/landing/Landing';
import EvasHomePage from './components/EvasHomePage/EvasHomePage';
import LearnMoreCourse from './components/EvasHomePage/EvasHomePageComponents/LearnMoreCourse';
import Gym from './components/Gym/Gym';
import InstantReward from './components/Reward/InstantReward';

function AppRoutes() {
  useAuthMiddleware();

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/instant-reward" element={<InstantReward />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="blogs" element={<BlogSection />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
          {/* <Route path="product/:id" element={<ProductDetails />} /> */}
          <Route path="ProductDetailsById/:id" element={<ProductDetailsById />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<Faqs />} />
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
          <Route path="/orders" element={<OrderInfoPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="chat" element={<ChatPage />} /> */}
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/evas" element={<EvasHomePage />} />
          <Route path="/learnMore" element={<LearnMoreCourse />} />
          <Route path="/gym" element={<Gym />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2 seconds on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

