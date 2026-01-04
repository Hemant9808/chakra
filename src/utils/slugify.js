/**
 * Converts a string into a URL-friendly slug
 * @param {string} text - The text to convert into a slug
 * @returns {string} - URL-friendly slug
 * 
 * Examples:
 * "Neem Face Wash" -> "neem-face-wash"
 * "Ashwagandha 500mg (Premium)" -> "ashwagandha-500mg-premium"
 */
export const slugify = (text) => {
    if (!text) return '';

    return text
        .toString()
        .toLowerCase()
        .trim()
        // Replace spaces with hyphens
        .replace(/\s+/g, '-')
        // Remove special characters except hyphens
        .replace(/[^\w\-]+/g, '')
        // Replace multiple hyphens with single hyphen
        .replace(/\-\-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

/**
 * Generates a unique product slug with ID appended
 * @param {object} product - Product object with name and _id
 * @returns {string} - Slug with full ID suffix for uniqueness
 * 
 * Example: "neem-face-wash-68b73127347290044ac86de"
 */
export const generateProductSlug = (product) => {
    if (!product || !product.name) return '';

    const nameSlug = slugify(product.name);
    const id = product._id || product.id;

    // Use full ObjectID for backend compatibility
    return id ? `${nameSlug}-${id}` : nameSlug;
};

/**
 * Extracts product ID from a slug
 * @param {string} slug - Product slug (e.g., "neem-face-wash-68b73127347290044ac86de")
 * @returns {string|null} - Extracted full MongoDB ObjectID or null
 */
export const extractIdFromSlug = (slug) => {
    if (!slug) return null;

    // Check if it's already a pure MongoDB ObjectID (24 hex chars)
    if (/^[a-f0-9]{24}$/i.test(slug)) {
        return slug;
    }

    // Extract ID from slug (last segment after final hyphen should be the full ObjectID)
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];

    // Check if last part is a valid MongoDB ObjectID (24 hex characters)
    if (/^[a-f0-9]{24}$/i.test(lastPart)) {
        return lastPart;
    }

    return null;
};

/**
 * Checks if a string is a MongoDB ObjectID format
 * @param {string} str - String to check
 * @returns {boolean}
 */
export const isMongoId = (str) => {
    return /^[a-f0-9]{24}$/i.test(str);
};
