import axiosInstance from '../axios';

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/product/getAllProducts');
      console.log("response///////////", response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  getProductById: async (id) => {
    try {
      // Import the helper to extract ID from slug
      const { getProductIdFromParam } = await import('../utils/productNavigation');

      // Extract actual MongoDB ID from slug or use as-is if already an ID
      const productId = getProductIdFromParam(id);

      const response = await axiosInstance.get(`/product/getProductById/${productId}`);
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