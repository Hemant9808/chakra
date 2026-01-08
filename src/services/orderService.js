import axios from 'axios';
import axiosInstance from '../axios';

const orderService = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      console.log("Creating order with data:", orderData);
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
      const response = await axiosInstance.post('/order/verify-payment', paymentData);
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