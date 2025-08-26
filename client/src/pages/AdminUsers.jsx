import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, updateUserRole } from '../redux/slices/usersSlice';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);
  const isAdmin = user && user.role === 'admin';

  React.useEffect(() => {
    if (isAdmin) {
      dispatch(getUsers());
    }
  }, [dispatch, isAdmin]);

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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">All Users</h2>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => dispatch(getUsers())}
              >
                Refresh
              </button>
            </div>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Email</th>
                      <th className="py-2 px-3">Role</th>
                      <th className="py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b">
                        <td className="py-2 px-3">{u.name}</td>
                        <td className="py-2 px-3">{u.email}</td>
                        <td className="py-2 px-3 capitalize">
                          <select
                            className="border rounded px-2 py-1"
                            value={u.role}
                            onChange={(e) => {
                              const newRole = e.target.value;
                              if (newRole !== u.role) {
                                dispatch(updateUserRole({ id: u._id, role: newRole }));
                              }
                            }}
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        </td>
                        <td className="py-2 px-3">
                          <button
                            className="text-red-600 hover:underline mr-3 disabled:opacity-50"
                            disabled={u._id === user._id}
                            onClick={() => {
                              if (window.confirm('Delete this user?')) {
                                dispatch(deleteUser(u._id));
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>) )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
