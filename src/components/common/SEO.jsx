import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO & OpenGraph component
 * Injects metadata, social cards, and schema properties dynamically into the document head.
 */
const SEO = ({ 
  title, 
  description, 
  name = "Ayucan Healthcare", 
  type = "website", 
  image = "/favicon.ico", 
  url = window.location.href,
  price,
  currency = "INR",
  brand = "Ayucan"
}) => {
  const fullTitle = title ? `${title} | ${name}` : name;
  const canonicalUrl = url;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph / Facebook / Instagram */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={name} />
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `${window.location.origin}${image}`} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image.startsWith('http') ? image : `${window.location.origin}${image}`} />}

      {/* Structured Google Search Metadata for Products */}
      {price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:brand" content={brand} />
        </>
      )}
    </Helmet>
  );
};

export default SEO;
