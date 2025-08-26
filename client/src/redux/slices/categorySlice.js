import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axiosInstance';

const CATEGORY_API_URL = '/api/categories';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Get all categories or by name
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (name, thunkAPI) => {
    try {
      let url = CATEGORY_API_URL;
      if (name) url += `?name=${encodeURIComponent(name)}`;
      const response = await axios.get(url);
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

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
