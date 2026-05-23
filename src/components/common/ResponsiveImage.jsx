import React from "react";

/**
 * Reusable high-performance Responsive Image component.
 * Standardizes sizes, lazy loading, and dynamic Cloudinary WebP/AVIF formatting.
 */
const ResponsiveImage = ({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false, // Set to true to disable lazy loading for above-the-fold images (LCP)
  ...props
}) => {
  if (!src) return null;

  // 1. Detect if the image is a Cloudinary hosted asset
  const isCloudinary = src.includes("cloudinary.com");

  if (isCloudinary) {
    // Locate the "/upload/" part of the Cloudinary URL
    const uploadMatch = src.match(/(.*\/upload\/)(.*)/);

    if (uploadMatch) {
      const urlPrefix = uploadMatch[1];
      const urlSuffix = uploadMatch[2];

      // Define standard responsive width breakpoints
      const widths = [300, 600, 1000, 1500];

      // Construct a high-performance responsive srcset
      // f_auto,q_auto dynamically delivers optimized formats (WebP/AVIF) and quality on the fly!
      const srcset = widths
        .map((w) => `${urlPrefix}w_${w},c_scale,f_auto,q_auto/${urlSuffix} ${w}w`)
        .join(", ");

      // Base src gets a default auto-formatting and compression block
      const defaultSrc = `${urlPrefix}f_auto,q_auto/${urlSuffix}`;

      return (
        <img
          src={defaultSrc}
          srcSet={srcset}
          sizes={sizes}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      );
    }
  }

  // 2. Graceful fallback for local or non-Cloudinary images
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
};

export default ResponsiveImage;
