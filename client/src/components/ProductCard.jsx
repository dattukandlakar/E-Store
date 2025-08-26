import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      stock: product.stock,
      quantity: 1
    };
    
    dispatch(addToCart(cartItem));
    toast.success('Product added to cart!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {/* <div className="text-sm text-gray-500 mb-2">
          {product.category}
        </div> */}
        
        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderRating(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.numReviews} reviews)
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          {product.discount && product.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatPrice(product.price - (product.price * product.discount / 100))}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
            product.stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
