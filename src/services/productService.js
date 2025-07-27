import axiosInstance from '../axios';

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/product/getAllProducts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/product/getProductById/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product details' };
    }
  },

  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/product/getAllCategories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch categories' };
    }
  },    
  getProductsByCategory: async (categoryName) => {
    try {
      const response = await axiosInstance.get('/product/getProductByCategories', {
        params: { category: categoryName },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products by category' };
    }
  }
  
}; 

// Utility functions for price calculations
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (!discountedPrice || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const formatPriceDisplay = (product) => {
  if (!product) return { displayPrice: 0, originalPrice: 0, discountPercentage: 0, hasDiscount: false };
  
  const originalPrice = product.price || 0;
  const discountedPrice = product.discountedPrice || 0;
  const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice;
  const discountPercentage = hasDiscount ? calculateDiscountPercentage(originalPrice, discountedPrice) : 0;
  
  return {
    displayPrice: hasDiscount ? discountedPrice : originalPrice,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    hasDiscount: hasDiscount
  };
}; 