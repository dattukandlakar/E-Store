import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../redux/slices/productSlice';
import { getProductsByCategoryName, clearProductsByCategory } from '../redux/slices/getProductsByCategoryName';
import { getCategories } from '../redux/slices/categorySlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useSelector((state) => state.products);
  const { products: categoryProducts, loading: categoryLoading } = useSelector((state) => state.getProductsByCategoryName || { products: [], loading: false });
  const { categories } = useSelector((state) => state.categories);

  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      // Use /api/categories/:name/products
      dispatch(getProductsByCategoryName(selectedCategory));
    } else {
      dispatch(clearProductsByCategory());
      dispatch(getProducts({}));
    }
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSearchParams({ category: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <select value={selectedCategory} onChange={handleCategoryChange} className="border rounded p-2">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory ? categoryLoading : loading) ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : (
            (selectedCategory ? categoryProducts : products).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
        {(selectedCategory ? categoryProducts.length === 0 && !categoryLoading : products.length === 0 && !loading) && (
          <div className="text-center text-gray-500 mt-8">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Products;
