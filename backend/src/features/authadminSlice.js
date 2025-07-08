import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  user: '',
  error: '',
  loading: false,
  token: '', // JWT token state
};


//http://localhost:8080/loginadmin/login

const apiLink = 'http://localhost:8080';

// Async thunk to handle user registration
export const registerUser = createAsyncThunk(
  'useradmin/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/admin/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'useradmin/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/loginadmin/login`, userData);
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
export const logoutAuthAdmin = createAsyncThunk(
  'useradmin/logoutAuthAdmin',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${apiLink}/admin/logout`);
      // Clear sessionStorage on logout
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to manage useradmin state
export const useradminSlice = createSlice({
  name: 'useradmin',
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
      .addCase(logoutAuthAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAuthAdmin.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutAuthAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || 'Logout failed';
      });
  },
});

// Selectors
export const selectUser = (state) => state.useradmin.user; // Accessing useradmin slice
export const selectToken = (state) => state.useradmin?.token; // Accessing token from useradmin
export const selectError = (state) => state.useradmin?.error; // Accessing error from useradmin
export const selectLoading = (state) => state.useradmin?.loading; // Accessing loading state from useradmin

// Export clearUserState action creator
export const { clearUserState } = useradminSlice.actions;

// Reducer export
export default useradminSlice.reducer;
