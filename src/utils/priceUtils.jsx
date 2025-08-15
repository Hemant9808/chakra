// Utility functions for handling discounted prices

/**
 * Get the effective price (discounted if available, otherwise original)
 * @param {Object} product - Product object with price and discountedPrice
 * @returns {number} - The effective price to use
 */
export const getEffectivePrice = (product) => {
  if (!product) return 0;
  
  // If discountedPrice exists and is not null/undefined, use it
  if (product.discountedPrice && product.discountedPrice > 0) {
    return product.discountedPrice;
  }
  
  // Otherwise use original price
  return product.price || 0;
};

/**
 * Get the original price (always the base price)
 * @param {Object} product - Product object with price
 * @returns {number} - The original price
 */
export const getOriginalPrice = (product) => {
  if (!product) return 0;
  return product.price || 0;
};

/**
 * Calculate discount percentage
 * @param {Object} product - Product object with price and discountedPrice
 * @returns {number} - Discount percentage (0 if no discount)
 */
export const getDiscountPercentage = (product) => {
  if (!product || !product.discountedPrice || product.discountedPrice <= 0) {
    return 0;
  }
  
  const originalPrice = product.price || 0;
  const discountedPrice = product.discountedPrice;
  
  if (originalPrice <= 0) return 0;
  
  const discount = originalPrice - discountedPrice;
  const percentage = Math.round((discount / originalPrice) * 100);
  
  return percentage;
};

/**
 * Check if product has a discount
 * @param {Object} product - Product object with price and discountedPrice
 * @returns {boolean} - True if product has discount
 */
export const hasDiscount = (product) => {
  if (!product) return false;
  return product.discountedPrice && product.discountedPrice > 0 && product.discountedPrice < product.price;
};

/**
 * Format price with Indian Rupee symbol
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return `₹${price}`;
};

/**
 * Get price display component with discount styling
 * @param {Object} product - Product object
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} - Price display component
 */
export const PriceDisplay = ({ product, className = "" }) => {
 

  const calculateDiscount = (price, discountPrice) => {
    //deciaml to 2 decimal places
    const discount = ((price - discountPrice) / price) * 100;
    return discount.toFixed(0);
  }

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
       {
                    product.discountPrice ? (
                      <div className="flex justify-center mb-3  flex-col items-center ">
                        
                        <span className="text-green-600  font-bold text-lg">
                        
                        ₹{product.discountPrice}
                        </span>
                        <span className=" text-gray-500 line-through">₹{product.price}</span>

                        <span className="text-green-600 text-sm">
                          {calculateDiscount(product.price, product.discountPrice)}% off
                        </span>

                        {/* <span className="text-gray-500 text-sm">`{calculateDiscount(price,discountPrice)"% off"}`</span> */}

                      </div>
                    ) : (
                      <span className="font-bold">₹{product.price}</span>
                    )
                  }
    </div>
  );
};
