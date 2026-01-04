import { generateProductSlug, extractIdFromSlug, isMongoId } from './slugify';

/**
 * Generates a product URL path with SEO-friendly slug
 * @param {object} product - Product object with at least _id/id and name
 * @returns {string} - Product URL path (e.g., "/product/neem-face-wash-68b731273")
 */
export const getProductUrl = (product) => {
    if (!product) return '/';

    // Generate slug from product name and ID
    const slug = generateProductSlug(product);

    return `/product/${slug}`;
};

/**
 * Extracts the product identifier (ID) from a URL parameter
 * This handles both old format (pure ID) and new format (slug-with-id)
 * 
 * @param {string} urlParam - The URL parameter (slug or ID)
 * @returns {string} - The product ID to use for API calls
 */
export const getProductIdFromParam = (urlParam) => {
    if (!urlParam) return null;

    // If it's already a MongoDB ObjectID, return as-is
    if (isMongoId(urlParam)) {
        return urlParam;
    }

    // Try to extract ID from slug
    const extractedId = extractIdFromSlug(urlParam);

    // If we found an ID fragment, we need to fetch products and match
    // For now, return the fragment and let the service handle it
    return extractedId || urlParam;
};

/**
 * Determines if a URL parameter is a slug or pure ID
 * @param {string} param - URL parameter
 * @returns {object} - { type: 'id' | 'slug', value: string }
 */
export const identifyUrlParam = (param) => {
    if (!param) {
        return { type: 'unknown', value: param };
    }

    if (isMongoId(param)) {
        return { type: 'id', value: param };
    }

    return { type: 'slug', value: param };
};
