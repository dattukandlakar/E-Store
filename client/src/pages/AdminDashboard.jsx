import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import { getAllOrders } from '../redux/slices/orderSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, total } = useSelector((state) => state.products);
  const { total: ordersTotal, loading: ordersLoading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts({ pageNumber: 1 }));
    dispatch(getAllOrders({ pageNumber: 1 }));
  }, [dispatch]);

  const isAdmin = user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{isAdmin ? 'Admin' : 'Manager'} Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Products</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{productsLoading ? '—' : total || products.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Orders</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{ordersLoading ? '—' : ordersTotal || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Role</div>
            <div className="text-3xl font-bold text-gray-900 mt-2 capitalize">{user?.role}</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/products" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Products</h3>
                <p className="text-gray-600 text-sm">Create, update, and delete products</p>
              </div>
              <i className="fas fa-box-open text-3xl text-blue-600"></i>
            </div>
          </Link>

          <Link to="/admin/orders" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Orders</h3>
                <p className="text-gray-600 text-sm">View and update order status</p>
              </div>
              <i className="fas fa-shopping-cart text-3xl text-green-600"></i>
            </div>
          </Link>

          <Link to="/admin/users" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Users</h3>
                <p className="text-gray-600 text-sm">Admin only</p>
              </div>
              <i className="fas fa-users text-3xl text-purple-600"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
