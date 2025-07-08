import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCategories = createAsyncThunk('categories/fetchAllCategories', async () => {
  const response = await axios.get('http://localhost:8080/category/all');
  return response.data;
});


export const fetchSingleCategory = createAsyncThunk('categories/fetchSingleCategory', async (categoryId) => {
  const response = await axios.get(`http://localhost:8080/category/${categoryId}`);
 console.log('response',response)
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  await axios.delete(`http://localhost:8080/category/delete/${categoryId}`);
  return categoryId;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
  const response = await axios.post('http://localhost:8080/category/add-category', categoryData);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ categoryId, formData }) => {
  const response = await axios.put(`http://localhost:8080/category/update/${categoryId}`, formData);
  return response.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    error: null,
    categories: [],
    singleCategory: {
      loading: false,
      error: null,
      data: null,
    }, 
  },
  




reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleCategory.pending, (state) => {
        state.singleCategory.loading = true;
        state.singleCategory.error = null;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.singleCategory.loading = false;
        state.singleCategory.error = null;
        console.log('Fulfilled',action.payload)
        state.singleCategory.data = action.payload;
        console.log('Fulfilled2',state.singleCategory.data)
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.singleCategory.loading = false;
        state.singleCategory.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        console.log('Before Filter',state.categories);
        // Filter out the deleted category from the categories array
        state.categories = state.categories.filter(category => category._id !== action.payload);
      
        console.log('After Filter',state.categories);
       // console.log();

      })
      

      
      .addMatcher(
        (action) => [createCategory.pending, updateCategory.pending, deleteCategory.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [createCategory.fulfilled, updateCategory.fulfilled, deleteCategory.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [createCategory.rejected, updateCategory.rejected, deleteCategory.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


  },
});



export default categorySlice.reducer;
