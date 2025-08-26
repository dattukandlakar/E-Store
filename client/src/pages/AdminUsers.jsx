import React from 'react';
import { useSelector } from 'react-redux';

const AdminUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Users</h1>
        {!isAdmin ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6">
            <div className="font-semibold mb-1">Restricted Access</div>
            <p className="text-sm">Only admins can manage users. If you need a change, contact an administrator.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">User management UI can be implemented here (admin only).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
