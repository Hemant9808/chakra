import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { format } from 'date-fns';
import { X, Calendar, CreditCard, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProductUrl } from '../../utils/productNavigation';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [visibleRowsCount, setVisibleRowsCount] = useState(5);
  const navigate = useNavigate();

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

  // Sort orders based on date purchased (Newest to Oldest)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Count orders for status tabs
  const allCount = sortedOrders.length;
  const pendingOrders = sortedOrders.filter(o => {
    const status = o.orderStatus.toLowerCase();
    return status !== 'delivered' && status !== 'cancelled';
  });
  const completedOrders = sortedOrders.filter(o => o.orderStatus.toLowerCase() === 'delivered');
  const cancelledOrders = sortedOrders.filter(o => o.orderStatus.toLowerCase() === 'cancelled');

  // Filter orders by active tab
  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'pending':
        return pendingOrders;
      case 'completed':
        return completedOrders;
      case 'cancelled':
        return cancelledOrders;
      default:
        return sortedOrders;
    }
  };

  const getStatusDisplay = (status) => {
    const s = status.toLowerCase();
    if (s === 'delivered') {
      return (
        <span className="text-[#2A3B28] font-bold text-sm flex items-center md:justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2A3B28] inline-block"></span>
          Delivered
        </span>
      );
    }
    if (s === 'cancelled') {
      return (
        <span className="text-red-600 font-bold text-sm flex items-center md:justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
          Cancelled
        </span>
      );
    }
    return (
      <span className="text-amber-600 font-bold text-sm flex items-center md:justify-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block"></span>
        Pending
      </span>
    );
  };

  // Flat-map active order items to render separate product rows
  const filteredOrders = getFilteredOrders();
  const rows = [];
  filteredOrders.forEach(order => {
    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        rows.push({
          orderId: order._id,
          createdAt: order.createdAt,
          orderStatus: order.orderStatus,
          totalPrice: order.totalPrice,
          item: item,
          parentOrder: order
        });
      });
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17C3A]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#715036]/10 p-6 md:p-8 relative">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2A3B28] mb-6">
        Order History
      </h2>

      {/* Spacing and Tab filters group */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 border-b border-[#715036]/10 pb-4 mb-6 select-none">
        <button
          onClick={() => { setActiveTab('all'); setVisibleRowsCount(5); }}
          className={`pb-2 text-sm font-semibold transition-all relative ${
            activeTab === 'all'
              ? 'text-[#2A3B28] font-bold'
              : 'text-[#715036]/60 hover:text-[#715036]'
          }`}
        >
          All Order({allCount})
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C17C3A]" />
          )}
        </button>
        <button
          onClick={() => { setActiveTab('pending'); setVisibleRowsCount(5); }}
          className={`pb-2 text-sm font-semibold transition-all relative ${
            activeTab === 'pending'
              ? 'text-[#2A3B28] font-bold'
              : 'text-[#715036]/60 hover:text-[#715036]'
          }`}
        >
          Pending({pendingOrders.length})
          {activeTab === 'pending' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C17C3A]" />
          )}
        </button>
        <button
          onClick={() => { setActiveTab('completed'); setVisibleRowsCount(5); }}
          className={`pb-2 text-sm font-semibold transition-all relative ${
            activeTab === 'completed'
              ? 'text-[#2A3B28] font-bold'
              : 'text-[#715036]/60 hover:text-[#715036]'
          }`}
        >
          Completed({completedOrders.length})
          {activeTab === 'completed' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C17C3A]" />
          )}
        </button>
        <button
          onClick={() => { setActiveTab('cancelled'); setVisibleRowsCount(5); }}
          className={`pb-2 text-sm font-semibold transition-all relative ${
            activeTab === 'cancelled'
              ? 'text-[#2A3B28] font-bold'
              : 'text-[#715036]/60 hover:text-[#715036]'
          }`}
        >
          Cancelled({cancelledOrders.length})
          {activeTab === 'cancelled' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C17C3A]" />
          )}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-[#FDFBF7] rounded-lg border border-dashed border-[#715036]/20">
          <p className="text-[#715036] font-medium">No orders found</p>
          <p className="text-sm text-[#715036]/60 mt-1">Your wellness journey awaits.</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-12 bg-[#FDFBF7] rounded-lg border border-dashed border-[#715036]/20">
          <p className="text-[#715036] font-medium">No orders in this status tab</p>
        </div>
      ) : (
        <div className="w-full">
          {/* Table Header Row (Desktop only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-[#FDFBF7] border border-[#715036]/10 rounded-xl p-4 font-bold text-sm text-[#2A3B28] uppercase tracking-wider mb-4">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-2 text-right">Details</div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-[#715036]/10">
            {rows.slice(0, visibleRowsCount).map((row, idx) => {
              const productName = row.item.productId?.name || 'Unknown Product';
              const productImage = row.item.image || row.item.productId?.images?.[0]?.url || '/placeholder.png';
              const resolvedId = row.item.productId?._id?._id || row.item.productId?._id || row.item.productId;
              
              return (
                <div 
                  key={idx} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 hover:bg-[#FDFBF7]/40 px-2 rounded-xl transition-all duration-300"
                >
                  {/* Item Description (cols-6) */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl border border-[#715036]/10 bg-white overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(getProductUrl({ _id: resolvedId, name: productName }))}
                    >
                      <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span 
                        className="font-serif font-bold text-[#2A3B28] text-base hover:text-[#C17C3A] cursor-pointer transition-colors leading-tight line-clamp-1"
                        onClick={() => navigate(getProductUrl({ _id: resolvedId, name: productName }))}
                      >
                        {productName}
                      </span>
                      <span className="text-xs text-[#715036]/60 mt-1 font-semibold">Qty : {row.item.quantity}</span>
                    </div>
                  </div>

                  {/* Status (cols-2) */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center mt-2 md:mt-0 flex items-center md:justify-center">
                    <span className="md:hidden text-xs uppercase tracking-wider font-bold text-[#715036]/50 mr-2">Status:</span>
                    {getStatusDisplay(row.orderStatus)}
                  </div>

                  {/* Total Cost (cols-2) */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center mt-1 md:mt-0 flex items-center md:justify-center">
                    <span className="md:hidden text-xs uppercase tracking-wider font-bold text-[#715036]/50 mr-2">Total:</span>
                    <span className="font-bold text-[#2A3B28] text-base">₹{row.totalPrice}</span>
                  </div>

                  {/* Details Trigger Button (cols-2) */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-right mt-3 md:mt-0">
                    <button
                      onClick={() => setSelectedOrderDetails(row.parentOrder)}
                      className="bg-[#2A3B28] text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#C17C3A] hover:shadow-md transition-all duration-300 w-full md:w-auto text-center"
                    >
                      Order Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {rows.length > visibleRowsCount && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleRowsCount(prev => prev + 5)}
                className="inline-block border-2 border-[#2A3B28] text-[#2A3B28] px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2A3B28] hover:text-white transition-all duration-300 shadow-sm"
              >
                Load More Orders
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- Immersive Order Details Modal --- */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#715036]/10 p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col gap-6 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#715036]/10 pb-4">
              <div className="flex flex-col">
                <h3 className="text-xl font-serif font-bold text-[#2A3B28]">Order Breakdown</h3>
                <span className="text-xs text-[#715036]/60 font-medium font-mono mt-1">ID: {selectedOrderDetails._id}</span>
              </div>
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#715036]/70 hover:text-[#2A3B28]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {/* Shipping Address */}
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#715036]/10 flex gap-3">
                <MapPin size={18} className="text-[#C17C3A] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2A3B28] mb-1.5 uppercase tracking-wide text-xs">Shipping Address</h4>
                  <p className="text-[#715036]/80 leading-relaxed font-medium">
                    {selectedOrderDetails.shippingAddress.address}
                    <br />
                    {selectedOrderDetails.shippingAddress.city && `${selectedOrderDetails.shippingAddress.city}, `}
                    {selectedOrderDetails.shippingAddress.postalCode}
                    <br />
                    {selectedOrderDetails.shippingAddress.country}
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#715036]/10 flex gap-3">
                <CreditCard size={18} className="text-[#C17C3A] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2A3B28] mb-1.5 uppercase tracking-wide text-xs">Payment Information</h4>
                  <div className="space-y-1 text-[#715036]/80 font-medium">
                    <p><span className="text-[#715036]/50">Method:</span> {selectedOrderDetails.paymentResult.paymentMethod}</p>
                    {selectedOrderDetails.paymentResult.razorpay_payment_id && (
                      <p className="line-clamp-1"><span className="text-[#715036]/50">ID:</span> <span className="font-mono text-[11px]">{selectedOrderDetails.paymentResult.razorpay_payment_id}</span></p>
                    )}
                    <p><span className="text-[#715036]/50 font-medium">Placed:</span> {format(new Date(selectedOrderDetails.createdAt), 'MMM dd, yyyy h:mm a')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items inside this specific Order */}
            <div className="space-y-3.5 border-t border-b border-[#715036]/10 py-5">
              <h4 className="font-bold text-[#2A3B28] uppercase tracking-wide text-xs flex items-center gap-2 mb-2">
                <Package size={14} className="text-[#C17C3A]" /> Items in this Order
              </h4>
              <div className="space-y-3">
                {selectedOrderDetails.items.map((item, idx) => {
                  const name = item.productId?.name || 'Unknown Product';
                  const img = item.image || item.productId?.images?.[0]?.url || '/placeholder.png';
                  const resolvedItemId = item.productId?._id?._id || item.productId?._id || item.productId;
                  return (
                    <div 
                      key={idx} 
                      className="flex gap-4 items-center cursor-pointer hover:bg-[#FDFBF7]/60 p-2 -mx-2 rounded-xl transition-all duration-300 group"
                      onClick={() => {
                        setSelectedOrderDetails(null);
                        navigate(getProductUrl({ _id: resolvedItemId, name: name }));
                      }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#715036]/10 overflow-hidden flex-shrink-0">
                        <img src={img} alt={name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex justify-between items-center text-sm">
                        <div>
                          <p className="font-serif font-bold text-[#2A3B28] group-hover:text-[#C17C3A] transition-colors line-clamp-1">{name}</p>
                          <p className="text-xs text-[#715036]/60 mt-0.5">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-[#2A3B28]">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#715036]/10 space-y-2.5 text-sm">
              <div className="flex justify-between text-[#715036] font-medium">
                <span>Subtotal:</span>
                <span>₹{selectedOrderDetails.totalPrice - selectedOrderDetails.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-[#715036] font-medium">
                <span>Shipping:</span>
                <span>₹{selectedOrderDetails.shippingPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-[#2A3B28] text-base pt-2.5 border-t border-[#715036]/10">
                <span>Total Amount Paid:</span>
                <span className="text-[#C17C3A]">₹{selectedOrderDetails.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;