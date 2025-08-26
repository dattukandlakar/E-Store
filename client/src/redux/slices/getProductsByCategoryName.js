import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './axiosInstance';

const CATEGORY_API_URL = '/api/categories';

// Get products by category name
export const getProductsByCategoryName = createAsyncThunk(
  'productsByCategory/getProductsByCategoryName',
  async (categoryName, thunkAPI) => {
    try {
      const encoded = encodeURIComponent(categoryName);
      const response = await axios.get(`${CATEGORY_API_URL}/${encoded}/products`);
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsByCategorySlice = createSlice({
  name: 'productsByCategory',
  initialState,
  reducers: {
    clearProductsByCategory: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategoryName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategoryName.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsByCategoryName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductsByCategory } = productsByCategorySlice.actions;
export default productsByCategorySlice.reducer;
