import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact/Contact.jsx";
import Login from "./components/Login/Login.jsx";
import Quiz from "./components/Quiz/Quiz.jsx";
import Cart from "./components/Cart/Cart.jsx";
import BlogSection from "./components/Blog/BlogSection.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import ProductDetails from "./components/Home/HomeComponents/ProductDetails.jsx";
import ProfilePage from "./components/UserProfile/ProfilePage.jsx";
import ProtectedRoute from "./components/UserProfile/ProtectedRoute.jsx";
import Shop from "./components/Shop/Shop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "quiz", element: <Quiz /> },
      { path: "cart", element: <Cart /> },
      { path: "blogs", element: <BlogSection /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "profile", element: ( <ProtectedRoute> <ProfilePage /> </ProtectedRoute>) },
      {path: "shop", element: <Shop /> }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <CartProvider> {/* Wrap with CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
