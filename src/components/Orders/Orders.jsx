import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';
import orderService from '../../services/orderService';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders();
        setOrders(response.data.orders);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-[#C17C3A]'; // Bronze
      case 'Shipped':
        return 'text-blue-700';
      case 'Delivered':
        return 'text-[#2A3B28]'; // Forest Green
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaBox className="text-[#C17C3A]" />;
      case 'Shipped':
        return <FaTruck className="text-blue-700" />;
      case 'Delivered':
        return <FaCheckCircle className="text-[#2A3B28]" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaBox className="text-gray-600" />;
    }
  };

  return (
    // Background: Cream/Off-White
    <div className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          // Typography: Serif, Forest Green
          className="text-4xl font-serif font-bold mb-10 text-[#2A3B28] border-b border-[#715036]/20 pb-4"
        >
          Your Orders
        </motion.h1>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-[#715036]/10"
          >
            <div className="bg-[#FDFBF7] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaBox className="h-8 w-8 text-[#C17C3A]" />
            </div>
            <h3 className="mt-2 text-xl font-serif font-medium text-[#2A3B28]">No orders yet</h3>
            <p className="mt-2 text-[#715036]/70">
              Your wellness journey hasn't started yet.
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/shop')}
                // Button: Forest Green with Bronze Hover
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-bold uppercase tracking-wider rounded-full shadow-md text-white bg-[#2A3B28] hover:bg-[#C17C3A] transition-colors duration-300 focus:outline-none"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // Card: White with subtle earth border
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#715036]/10 overflow-hidden"
              >
                {/* Header Section of Card */}
                <div className="p-6 bg-[#FDFBF7] border-b border-[#715036]/10 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#2A3B28] tracking-wide">
                      ORDER <span className="font-serif text-[#715036]">#{order._id.slice(-6).toUpperCase()}</span>
                    </h3>
                    <p className="text-sm text-[#715036]/70 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-[#715036]/10 shadow-sm">
                    {getStatusIcon(order.status)}
                    <span className={`font-bold text-sm uppercase tracking-wide ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="p-6">
                  <h4 className="text-sm font-bold text-[#2A3B28] uppercase tracking-wider mb-4 border-b border-[#715036]/10 pb-2 w-fit">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-start md:items-center justify-between group">
                        <div className="flex items-center space-x-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#715036]/10 bg-[#FDFBF7]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <p className="text-base font-serif font-bold text-[#2A3B28]">{item.name}</p>
                            <p className="text-sm text-[#715036]/70 mt-1">
                              Quantity: <span className="font-medium text-[#2A3B28]">{item.quantity}</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-base font-bold text-[#C17C3A]">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section of Card */}
                <div className="px-6 py-4 bg-[#2A3B28] text-[#FDFBF7] flex justify-between items-center">
                  <p className="text-sm font-medium opacity-80">Total Amount</p>
                  <p className="text-xl font-bold tracking-wide">₹{order.totalAmount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;