import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBox, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaReceipt
} from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import orderService from '../../services/orderService';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast } from 'react-hot-toast';

const OrderInfoPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders();
        console.log("response",response)
        setOrders(response);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default: // pending
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <GiProcessor className="text-yellow-600" />;
      case 'shipped':
        return <FaTruck className="text-blue-600" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-600" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-600" />;
      default: // pending
        return <FaBox className="text-gray-600" />;
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { id: 'pending', label: 'Order Placed', completed: true },
      { id: 'processing', label: 'Processing', completed: status !== 'pending' },
      { id: 'shipped', label: 'Shipped', completed: ['shipped', 'delivered', 'cancelled'].includes(status) },
      { id: 'delivered', label: 'Delivered', completed: status === 'delivered' },
    ];

    if (status === 'cancelled') {
      steps.push({ id: 'cancelled', label: 'Cancelled', completed: true });
    }

    return steps;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
        <p className="text-gray-600 mt-2">View and manage your orders</p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-lg shadow-sm"
        >
          <FaBox className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by shopping our products.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Shopping
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              <div 
                className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleOrderExpand(order._id)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.orderStatus)}
                      <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                    <div className="flex justify-between">
                      {getStatusSteps(order.orderStatus).map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {step.completed ? (
                              <FaCheckCircle className="w-4 h-4" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          <span className={`text-xs mt-2 text-center ${step.completed ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <FaBox className="mr-2" /> Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item._id} className="flex items-start gap-4">
                            <img
                              src={item.productId.image || 'https://via.placeholder.com/80'}
                              alt={item.productId.name}
                              className="h-16 w-16 object-cover rounded border border-gray-200"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.productId.name}</p>
                              <p className="text-xs text-gray-500">Brand: {item.productId.brand || 'N/A'}</p>
                              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <FaMapMarkerAlt className="mr-2" /> Shipping Address
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-900">{order.shippingAddress.address}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <FaCreditCard className="mr-2" /> Payment Information
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Method:</span>
                            <span className="text-gray-900 capitalize">{order.paymentResult.paymentMethod.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-medium ${order.paymentResult.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                              {order.paymentResult.paymentStatus === 'paid' ? 'Paid' : 'Not Paid'}
                            </span>
                          </div>
                          {order.paymentResult.razorpay_payment_id && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Transaction ID:</span>
                              <span className="text-gray-900 font-mono text-xs truncate max-w-[120px]">
                                {order.paymentResult.razorpay_payment_id}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <FaReceipt className="mr-2" /> Order Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-900">₹{(order.totalPrice - order.shippingPrice).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-gray-900">₹{order.shippingPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="font-medium text-gray-900">Total:</span>
                            <span className="font-bold text-gray-900">₹{order.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 flex justify-end gap-3">
                    {order.orderStatus === 'pending' && (
                      <button 
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => toast('Cancellation request sent')}
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.orderStatus === 'delivered' && (
                      <button 
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => toast('Return request sent')}
                      >
                        Return Item
                      </button>
                    )}
                    <button 
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => toast('Invoice downloaded')}
                    >
                      Download Invoice
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderInfoPage;