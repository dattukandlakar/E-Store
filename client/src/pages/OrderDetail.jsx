import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../redux/slices/orderSlice';

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <Link to="/orders" className="text-blue-600 hover:underline">Back to Orders</Link>
        </div>

        {loading && (
          <div className="bg-white rounded-lg shadow p-6 text-center">Loading...</div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">{error}</div>
        )}

        {!loading && order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Shipping, Payment, Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Meta */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Order #{order._id}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-medium text-gray-900">Status</div>
                    <div className="capitalize">{order.status}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Placed On</div>
                    <div>{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Paid</div>
                    <div>{order.isPaid ? `Yes (${new Date(order.paidAt).toLocaleString()})` : 'No'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Delivered</div>
                    <div>{order.isDelivered ? `Yes (${new Date(order.deliveredAt).toLocaleString()})` : 'No'}</div>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="text-gray-700">
                  <div>{order.shippingAddress.address}</div>
                  <div>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</div>
                  <div>{order.shippingAddress.country}</div>
                </div>
                {order.trackingNumber && (
                  <div className="mt-3 text-sm text-gray-600">Tracking: {order.trackingNumber}</div>
                )}
              </div>

              {/* Payment */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                <div className="text-gray-700">Method: {order.paymentMethod}</div>
                {order.paymentResult?.status && (
                  <div className="text-sm text-gray-600 mt-2">Status: {order.paymentResult.status}</div>
                )}
              </div>

              {/* Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Items</h2>
                <div className="divide-y">
                  {order.orderItems.map((item) => (
                    <div key={item.product} className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice.toFixed(2)}</span></div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-gray-900"><span>Total</span><span>${order.totalPrice.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
