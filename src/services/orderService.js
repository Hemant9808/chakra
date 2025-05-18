import axios from 'axios';
import axiosInstance from '../axios';

const API_URL = 'http://localhost:4000/order'; // Update with your actual API URL

const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/order/createOrder', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order';
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/order/getOrder/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order details';
    }
  },

  // Get user's orders
  getUserOrders: async () => {
    try {
      const response = await axiosInstance.get('/order/getMyOrders');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch orders';
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/verify-payment`, paymentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to verify payment';
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.post('/order/updateOrderStatus', {
        id: orderId,
        status
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order status';
    }
  }
};

export default orderService; 