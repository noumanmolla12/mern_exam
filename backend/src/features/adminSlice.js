import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all admins

export const fetchAllAdmins = createAsyncThunk('admins/fetchAllAdmins', async () => {
  const response = await axios.get('http://localhost:8080/admin/all');
  return response.data;
});

// Async thunk to fetch a admin by ID
export const fetchSingleAdmin = createAsyncThunk('admins/fetchSingleAdmin', async (adminId) => {
  const response = await axios.get(`http://localhost:8080/admin/${adminId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a admin
export const addAdmin = createAsyncThunk('admins/addAdmin', async (adminData) => {
  const response = await axios.post('http://localhost:8080/admin/add-admin', adminData);
  return response.data;
});



// Async thunk to handle updating a admin
export const updateAdmin = createAsyncThunk('admins/updateAdmin', async ({ adminId, formData }) => {
  const response = await axios.put(`http://localhost:8080/admin/update/${adminId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a admin
export const deleteAdmin = createAsyncThunk('admins/deleteAdmin', async (adminId) => {
  await axios.delete(`http://localhost:8080/admin/delete/${adminId}`);
  return adminId;
});




// Create slice for admin
const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    loading: false,
    error: null,
    admins: [],
    singleAdmin: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admins = action.payload;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleAdmin.pending, (state) => {
        state.singleAdmin.loading = true;
        state.singleAdmin.error = null;
      })
      .addCase(fetchSingleAdmin.fulfilled, (state, action) => {
        state.singleAdmin.loading = false;
        state.singleAdmin.error = null;
        state.singleAdmin.data = action.payload;
      })
      .addCase(fetchSingleAdmin.rejected, (state, action) => {
        state.singleAdmin.loading = false;
        state.singleAdmin.error = action.payload;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.admins = state.admins.filter(admin => admin._id !== action.payload);
      })
      .addMatcher(
        (action) => [addAdmin.pending, updateAdmin.pending, deleteAdmin.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addAdmin.fulfilled, updateAdmin.fulfilled, deleteAdmin.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addAdmin.rejected, updateAdmin.rejected, deleteAdmin.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default adminSlice.reducer;
