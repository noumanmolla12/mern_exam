// features/exam/examSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitAnswer = createAsyncThunk(
  'exam/submitAnswer',
  async (submissionData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/exam/submit', submissionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitAnswer.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitAnswer.fulfilled, state => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default examSlice.reducer;
