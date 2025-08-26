import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../redux/slices/productSlice';
import { getCategories } from '../redux/slices/categorySlice';

const initialForm = { name: '', description: '', price: '', imageUrl: '', stock: '', category: '', brand: '', featured: false, tags: '' };

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [form, setForm] = useState(initialForm);
  const { categories } = useSelector((state) => state.categories);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getProducts({ pageNumber: 1 }));
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
    };
    if (editingId) {
      dispatch(updateProduct({ id: editingId, productData: payload })).then(() => {
        resetForm();
        dispatch(getProducts({ pageNumber: 1 }));
      });
    } else {
      dispatch(createProduct(payload)).then(() => {
        resetForm();
        dispatch(getProducts({ pageNumber: 1 }));
      });
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || '',
      description: p.description || '',
      price: String(p.price ?? ''),
      imageUrl: p.imageUrl || '',
      stock: String(p.stock ?? ''),
      category: p.category || '',
      brand: p.brand || '',
      featured: !!p.featured,
      tags: p.tags ? p.tags.join(', ') : '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(id)).then(() => dispatch(getProducts({ pageNumber: 1 })));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{editingId ? 'Edit Product' : 'Create Product'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded p-2" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded p-2" required />
            <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border rounded p-2" required />
            <select name="category" value={form.category} onChange={handleChange} className="border rounded p-2" required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border rounded p-2" />
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="border rounded p-2" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="border rounded p-2 md:col-span-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded p-2 md:col-span-2" />
            <label className="flex items-center space-x-2 md:col-span-2">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              <span>Featured</span>
            </label>
            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded border">Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Products</h2>
          </div>
          <div className="divide-y">
            {loading && products.length === 0 && (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            )}
            {products.map((p) => (
              <div key={p._id} className="p-4 flex items-center gap-4">
                <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">${p.price} • Stock: {p.stock} • {p.category?.name || ''}</div>
                </div>
                <button onClick={() => handleEdit(p)} className="px-3 py-2 text-sm rounded border">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-2 text-sm rounded bg-red-600 text-white">Delete</button>
              </div>
            ))}
            {products.length === 0 && !loading && (
              <div className="p-6 text-center text-gray-500">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
