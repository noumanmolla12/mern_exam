import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  user: '',
  error: '',
  loading: false,
  token: '', // JWT token state
};


//http://localhost:8080/loginstudent/login

const apiLink = 'http://localhost:8080';

// Async thunk to handle user registration
export const registerUser = createAsyncThunk(
  'userstudent/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/student/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'userstudent/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/loginstudent/login`, userData);
      // Store user and token in sessionStorage after login
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle user logout
export const logoutAuthStudent = createAsyncThunk(
  'userstudent/logoutAuthStudent',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${apiLink}/student/logout`);
      // Clear sessionStorage on logout
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to manage userstudent state
export const userstudentSlice = createSlice({
  name: 'userstudent',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token; // Store JWT token after successful login
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token; // Store JWT token after successful registration
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || 'Registration failed';
      })
      .addCase(logoutAuthStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAuthStudent.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutAuthStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || 'Logout failed';
      });
  },
});

// Selectors
export const selectUser = (state) => state.userstudent.user; // Accessing userstudent slice
export const selectToken = (state) => state.userstudent?.token; // Accessing token from userstudent
export const selectError = (state) => state.userstudent?.error; // Accessing error from userstudent
export const selectLoading = (state) => state.userstudent?.loading; // Accessing loading state from userstudent

// Export clearUserState action creator
export const { clearUserState } = userstudentSlice.actions;

// Reducer export
export default userstudentSlice.reducer;
