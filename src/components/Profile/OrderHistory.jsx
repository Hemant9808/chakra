import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/order/getMyOrders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleOrder = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className=" rounded-lg overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 ">
                <div>
                  <p className="text-sm text-gray-500">Order number</p>
                  <p className="text-sm font-medium">{order._id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date placed: {format(new Date(order.createdAt), 'PPP')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total amount: ₹{order.totalPrice}
                  </p>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                  <span className={`px-3 py-1 rounded-lg shadow-md cursor-pointer text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <button
                    onClick={() => toggleOrder(order._id)}
                    className="text-sm text-indigo-600  flex items-center cursor-pointer shadow-md rounded-lg p-2 "
                  >
                    View Order 
                  </button>
                </div>
              </div>

              {expandedOrderId === order._id && (
                <div className="p-4 space-y-4 bg-white">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      {/* <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      /> */}
                      <div className="flex flex-col justify-between">
                        <p className="font-medium text-gray-800">{item.productId.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-gray-700">
                    <h3 className="font-medium mb-1">Shipping Address</h3>
                    <p>
                      {order.shippingAddress.address}
                      {order.shippingAddress.city && `, ${order.shippingAddress.city}`}
                      {order.shippingAddress.postalCode && `, ${order.shippingAddress.postalCode}`}
                      {order.shippingAddress.country && `, ${order.shippingAddress.country}`}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700">
                    <h3 className="font-medium mb-1">Payment Details</h3>
                    <p>Method: {order.paymentResult.paymentMethod}</p>
                    {order.paymentResult.razorpay_payment_id && (
                      <p>Payment ID: {order.paymentResult.razorpay_payment_id}</p>
                    )}
                  </div>

                  <div className="text-sm text-gray-800 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{order.totalPrice - order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>₹{order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>₹{order.totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
