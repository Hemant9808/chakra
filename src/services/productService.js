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