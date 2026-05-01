import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect, Suspense, lazy } from 'react';
import ProtectedRoute from './components/UserProfile/ProtectedRoute';
import Layout from './Layout';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuthMiddleware } from './middleware/middleware';

const Home = lazy(() => import('./components/Home/Home'));
const About = lazy(() => import('./components/About/About'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Login = lazy(() => import('./components/Login/Login'));
const ForgotPassword = lazy(() => import('./components/Login/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/Login/ResetPassword'));
const Quiz = lazy(() => import('./components/Quiz/Quiz'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const ProfilePage = lazy(() => import('./components/UserProfile/ProfilePage'));
const Shop = lazy(() => import('./components/Shop/Shop'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const BlogSection = lazy(() => import('./components/Blogs/BlogSection'));
const BlogDetail = lazy(() => import('./components/Blogs/BlogDetail'));
const OrderInfoPage = lazy(() => import('./components/OrdersInfo/OrderInfoPage'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./components/refund/RefundPolicy'));
const TermsAndConditions = lazy(() => import('./components/T&C/TermsAndConditions'));
const Faqs = lazy(() => import('./components/FaQs/Faqs'));
const ProductDetailsById = lazy(() => import('./components/Shop/productDetials'));
const OrderSuccess = lazy(() => import('./components/Shop/ShopComponents/orderSuccess'));
const OtpVerification = lazy(() => import('./pages/Otp-verification'));
const Landing = lazy(() => import('./components/landing/Landing'));
const EvasHomePage = lazy(() => import('./components/EvasHomePage/EvasHomePage'));
const LearnMoreCourse = lazy(() => import('./components/EvasHomePage/EvasHomePageComponents/LearnMoreCourse'));
const Gym = lazy(() => import('./components/Gym/Gym'));
const InstantReward = lazy(() => import('./components/Reward/InstantReward'));

function AppRoutes() {
  useAuthMiddleware();

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
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
            <Route path="product/:id" element={<ProductDetailsById />} />
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
          <Route path="/instant-reward" element={<InstantReward />} />
        </Routes>
      </Suspense>
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

  return (
    <Router>
      {isLoading && (
        <div className="fixed inset-0 z-[10000]">
          <LoadingSpinner />
        </div>
      )}
      <AppRoutes />
    </Router>
  );
}

export default App;

