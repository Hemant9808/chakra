import axios from 'axios';
import axiosInstance from '../axios';

const API_URL = 'http://localhost:4000/payment'; // Update with your actual API URL

const paymentService = {
  // Get Razorpay key
  getRazorpayKey: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/getkey`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get Razorpay key';
    }
  },

  // Create payment order
  createPaymentOrder: async (amount) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/checkout`, { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create payment order';
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/paymentverification`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to verify payment';
    }
  },

   loadRazorpayScript :() => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
  
};

export default paymentService; 