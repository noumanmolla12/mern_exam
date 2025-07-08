// features/resultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserResult = createAsyncThunk(
  'result/fetchUserResult',
  async (userId) => {
    const response = await axios.get(`http://localhost:8080/result/result/${userId}`);
    return response.data;
  }
);

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default resultSlice.reducer;
