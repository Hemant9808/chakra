import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { extractIdFromSlug } from "../../utils/slugify";

// Route labels mapping for pretty names
const routeLabels = {
  'about': 'About Us',
  'shop': 'Shop',
  'product': 'Products',
  'blogs': 'Blog',
  'cart': 'Shopping Cart',
  'checkout': 'Checkout',
  'profile': 'My Profile',
  'orders': 'My Orders',
  'gallery': 'Gallery',
  'contact': 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  'refund-policy': 'Refund Policy',
  'terms-and-conditions': 'Terms & Conditions',
  'faqs': 'FAQs',
  'quiz': 'Health Quiz',
  'gym': 'Gym & Fitness',
  'evas': 'Evas Wellness',
  'landing': 'Welcome',
  'learnMore': 'Learn More'
};

const Breadcrumbs = ({ productName, blogTitle, categoryName }) => {
  const location = useLocation();
  const params = useParams();
  const [dynamicNames, setDynamicNames] = useState({});

  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  // Hide breadcrumbs on certain pages
  const hiddenPages = ['login', 'forgot-password', 'reset-password', 'otp-verification', 'instant-reward'];
  if (hiddenPages.some(page => pathnames.includes(page))) return null;

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      position: 1
    }
  ];

  pathnames.forEach((value, index) => {
    const to = "/" + pathnames.slice(0, index + 1).join("/");
    let displayName = routeLabels[value] || value.replace(/-/g, " ");

    // Handle dynamic names
    if (value === 'product' && index < pathnames.length - 1) {
      // Skip the "product" segment, we'll use the product name from slug
      return;
    } else if (params.id && index === pathnames.length - 1) {
      // This is a dynamic ID/slug segment
      if (pathnames.includes('product')) {
        // For product pages, extract name from slug or use productName prop
        if (productName) {
          displayName = productName;
        } else {
          // Extract product name from slug by removing the ID suffix
          const slugParts = params.id.split('-');
          // Remove last part (ID) and join the rest as product name
          const nameFromSlug = slugParts.slice(0, -1).join(' ');
          displayName = nameFromSlug || value.replace(/-/g, " ");
        }
      } else if (pathnames.includes('blogs') && blogTitle) {
        displayName = blogTitle;
      } else if (pathnames.includes('shop') && categoryName) {
        displayName = categoryName;
      } else {
        // For other dynamic routes, convert slug to readable format
        displayName = value.replace(/-/g, " ");
      }
    }

    breadcrumbItems.push({
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      path: to,
      position: index + 2,
      isLast: index === pathnames.length - 1
    });
  });

  // Generate Schema.org JSON-LD markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": `${window.location.origin}${item.path}`
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#FDFBF7] border-b border-[#715036]/10 px-4 md:px-8 lg:px-16 py-3 mt-24"
      >
        <ol
          className="flex items-center gap-2 text-sm flex-wrap"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbItems.map((item, index) => (
            <li
              key={item.path}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <FaChevronRight className="text-[#715036]/40 text-xs" />
              )}

              {item.isLast ? (
                // Current page - not a link
                <span
                  className="text-[#2A3B28] font-semibold flex items-center gap-1"
                  itemProp="name"
                  aria-current="page"
                >
                  {index === 0 && <FaHome className="text-base" />}
                  {item.name}
                </span>
              ) : (
                // Link
                <Link
                  to={item.path}
                  className="text-[#715036] hover:text-[#C17C3A] transition-colors flex items-center gap-1 hover:underline"
                  itemProp="item"
                >
                  {index === 0 && <FaHome className="text-base" />}
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}

              <meta itemProp="position" content={item.position} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
