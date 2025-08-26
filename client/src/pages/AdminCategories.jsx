import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, createCategory } from '../redux/slices/categorySlice';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(createCategory(trimmed)).then((action) => {
      if (!action.error) setName('');
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <form onSubmit={onSubmit} className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Saving...' : 'Add Category'}
        </button>
      </form>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Categories</h2>
        {loading && categories.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-disc pl-5">
            {categories.map((c) => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


