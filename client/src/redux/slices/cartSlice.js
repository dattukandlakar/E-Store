import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  items: cartItemsFromStorage,
  totalPrice: cartItemsFromStorage.reduce((acc, item) => acc + item.price * item.quantity, 0),
  totalQuantity: cartItemsFromStorage.reduce((acc, item) => acc + item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product === newItem.product);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Update totals
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product !== productId);

      // Update totals
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product !== productId);
        } else {
          item.quantity = quantity;
        }

        // Update totals
        state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cartItems');
    },

    updateCartItemPrice: (state, action) => {
      const { productId, newPrice } = action.payload;
      const item = state.items.find(item => item.product === productId);

      if (item) {
        item.price = newPrice;
        
        // Update totals
        state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateCartItemPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
