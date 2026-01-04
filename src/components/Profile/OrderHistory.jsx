import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
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
      console.log("error while fetching orders", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order confirmed':
        return 'bg-[#C17C3A]/10 text-[#C17C3A] border border-[#C17C3A]/20'; // Bronze
      case 'ready to ship':
        return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'shipped':
        return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'delivered':
        return 'bg-[#2A3B28]/10 text-[#2A3B28] border border-[#2A3B28]/20'; // Forest Green
      case 'cancelled':
        return 'bg-red-50 text-red-700 border border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const toggleOrder = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        {/* Updated Spinner Color to Bronze */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17C3A]"></div>
      </div>
    );
  }

  return (
    // Container: White with earthy border
    <div className="bg-white rounded-xl shadow-sm border border-[#715036]/10 p-6 md:p-8">
      <h2 className="text-3xl font-serif font-bold text-[#2A3B28] mb-8 border-b border-[#715036]/10 pb-4">
        Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-[#FDFBF7] rounded-lg border border-dashed border-[#715036]/20">
          <p className="text-[#715036] font-medium">No orders found</p>
          <p className="text-sm text-[#715036]/60 mt-1">Your wellness journey awaits.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`rounded-xl overflow-hidden border transition-all duration-300 ${expandedOrderId === order._id
                ? 'border-[#C17C3A] shadow-md'
                : 'border-[#715036]/10 shadow-sm hover:border-[#C17C3A]/50'
                }`}
            >
              {/* Order Header / Summary */}
              <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 cursor-pointer"
                onClick={() => toggleOrder(order._id)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#715036]">Order #</p>
                    <p className="text-sm font-bold text-[#2A3B28] font-serif">{order._id}</p>
                  </div>
                  <p className="text-sm text-[#715036]/80">
                    <span className="font-medium">Placed:</span> {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-sm font-bold text-[#2A3B28]">
                    ₹{order.totalPrice}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 items-start md:items-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOrder(order._id);
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-[#C17C3A] hover:text-[#2A3B28] transition-colors"
                  >
                    {expandedOrderId === order._id ? "Hide Details" : "View Order"}
                    {expandedOrderId === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Details Section */}
              {expandedOrderId === order._id && (
                <div className="p-6 bg-[#FDFBF7] border-t border-[#715036]/10">
                  {/* Items List */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start pb-4 border-b border-[#715036]/5 last:border-0 last:pb-0">
                        {/* Uncomment and ensure image exists if you want to show it
                        <div className="w-16 h-16 rounded-md bg-white border border-[#715036]/10 overflow-hidden flex-shrink-0">
                             <img src={item.productId.image} alt={item.productId.name} className="w-full h-full object-cover" />
                        </div> 
                        */}
                        <div className="flex flex-col justify-between">
                          <p className="font-serif font-bold text-[#2A3B28] text-lg">{item.productId.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-[#715036] font-medium">
                              Qty: {item.quantity}
                            </p>
                            <span className="text-[#715036]/40">|</span>
                            <div className="flex items-center gap-2">
                              {item.productId.price && item.productId.price > item.price ? (
                                <>
                                  <span className="text-sm text-[#715036]/50 line-through">₹{item.productId.price}</span>
                                  <span className="text-sm font-bold text-[#C17C3A]">₹{item.price}</span>
                                </>
                              ) : (
                                <span className="text-sm font-bold text-[#2A3B28]">₹{item.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    {/* Shipping Address */}
                    <div className="bg-white p-4 rounded-lg border border-[#715036]/10">
                      <h3 className="font-bold text-[#2A3B28] mb-2 uppercase tracking-wide text-xs">Shipping Address</h3>
                      <p className="text-[#715036] leading-relaxed">
                        {order.shippingAddress.address}
                        <br />
                        {order.shippingAddress.city && `${order.shippingAddress.city}, `}
                        {order.shippingAddress.postalCode}
                        <br />
                        {order.shippingAddress.country}
                      </p>
                    </div>

                    {/* Payment & Breakdown */}
                    <div className="bg-white p-4 rounded-lg border border-[#715036]/10">
                      <h3 className="font-bold text-[#2A3B28] mb-2 uppercase tracking-wide text-xs">Payment Details</h3>
                      <div className="space-y-1 text-[#715036] mb-4">
                        <p><span className="font-medium">Method:</span> {order.paymentResult.paymentMethod}</p>
                        {order.paymentResult.razorpay_payment_id && (
                          <p><span className="font-medium">Payment ID:</span> <span className="font-mono text-xs">{order.paymentResult.razorpay_payment_id}</span></p>
                        )}
                      </div>

                      <div className="border-t border-[#715036]/10 pt-3 space-y-2">
                        <div className="flex justify-between text-[#715036]">
                          <span>Subtotal:</span>
                          <span>₹{order.totalPrice - order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between text-[#715036]">
                          <span>Shipping:</span>
                          <span>₹{order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#2A3B28] text-base pt-2 border-t border-[#715036]/10 mt-2">
                          <span>Total:</span>
                          <span>₹{order.totalPrice}</span>
                        </div>
                      </div>
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