/**
 * Utility function to append Cloudinary transformations to an image URL.
 * Automatically adds format auto, quality auto, and a max width for optimal rendering.
 * 
 * @param {string} url - The original image URL (Cloudinary or otherwise).
 * @param {number} width - The maximum width the image should be scaled to.
 * @returns {string} - The optimized image URL.
 */
export const optimizeImageUrl = (url, width = 800) => {
  if (!url) return "/placeholder.png";

  // Check if it is a Cloudinary URL
  if (url.includes("res.cloudinary.com")) {
    // If it already has some transformations, try to append ours or just replace the upload part
    // The standard structure is https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<public_id>
    // We want to insert `f_auto,q_auto,w_${width},c_scale` right after `upload/`
    
    // Check if it already has transformations
    if (url.includes("/upload/v") || url.match(/\/upload\/[a-z0-9_]+\/v/i) == null) {
      // Basic substitution if it matches the standard format
      return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_scale/`);
    }
  }

  // Fallback for non-cloudinary images or malformed URLs
  return url;
};
