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
import ScrollToTop from './components/common/ScrollToTop';

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

function AppRoutes() {
  useAuthMiddleware();

  return (
    <>
      <ScrollToTop />
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
          <Route path="/orders" element={<OrderInfoPage/>} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="chat" element={<ChatPage />} /> */}
          <Route path="/order-success" element={<OrderSuccess />} />

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

