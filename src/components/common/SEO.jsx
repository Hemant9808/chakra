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
  brand = "Ayucan",
  rating,
  reviewCount
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

      {/* JSON-LD Product Schema for Google Search Rich Snippets */}
      {type === "product" && price && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": title ? `${title}` : name,
            "image": image.startsWith('http') ? image : `${window.location.origin}${image}`,
            "description": description,
            "brand": {
              "@type": "Brand",
              "name": brand
            },
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": currency,
              "price": price,
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": rating > 0 && reviewCount > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": rating.toFixed(1),
              "reviewCount": reviewCount.toString()
            } : undefined
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
