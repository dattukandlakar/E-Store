import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus, updateOrderToDelivered } from '../redux/slices/orderSlice';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, page, pages } = useSelector((state) => state.orders);
  const [localStatus, setLocalStatus] = useState({});

  useEffect(() => {
    dispatch(getAllOrders({ pageNumber: 1 }));
  }, [dispatch]);

  const handleStatusChange = (orderId, value) => {
    setLocalStatus((prev) => ({ ...prev, [orderId]: value }));
  };

  const saveStatus = (orderId) => {
    const status = localStatus[orderId];
    if (!status) return;
    dispatch(updateOrderStatus({ id: orderId, statusData: { status } }))
      .then(() => dispatch(getAllOrders({ pageNumber: page })));
  };

  const markDelivered = (orderId) => {
    dispatch(updateOrderToDelivered(orderId))
      .then(() => dispatch(getAllOrders({ pageNumber: page })));
  };

  const nextPage = () => {
    if (page < pages) dispatch(getAllOrders({ pageNumber: page + 1 }));
  };
  const prevPage = () => {
    if (page > 1) dispatch(getAllOrders({ pageNumber: page - 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-semibold">Orders</div>
            <div className="text-sm text-gray-600">Page {page} of {pages}</div>
          </div>
          {loading && orders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="divide-y">
              {orders.map((o) => (
                <div key={o._id} className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold">Order #{o._id.slice(-8).toUpperCase()}</div>
                      <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()} • {o.user?.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={localStatus[o._id] ?? o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className="border rounded p-2 text-sm"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button onClick={() => saveStatus(o._id)} className="px-3 py-2 text-sm rounded bg-blue-600 text-white">Save</button>
                      {o.status !== 'delivered' && (
                        <button onClick={() => markDelivered(o._id)} className="px-3 py-2 text-sm rounded border">Mark Delivered</button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    {o.orderItems?.slice(0,3).map((it, idx) => (
                      <span key={idx} className="inline-block mr-2">{it.name} × {it.quantity}</span>
                    ))}
                    {o.orderItems && o.orderItems.length > 3 && (
                      <span className="text-gray-500">+{o.orderItems.length - 3} more</span>
                    )}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="p-6 text-center text-gray-500">No orders found</div>
              )}
            </div>
          )}
          <div className="p-4 border-t flex items-center justify-between">
            <button onClick={prevPage} className="px-3 py-2 text-sm rounded border" disabled={page <= 1}>Previous</button>
            <button onClick={nextPage} className="px-3 py-2 text-sm rounded border" disabled={page >= pages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
