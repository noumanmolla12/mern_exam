import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all topics

export const fetchAllTopics = createAsyncThunk('topics/fetchAllTopics', async () => {
  const response = await axios.get('http://localhost:8080/topic/all');
  return response.data;
});

// Async thunk to fetch a topic by ID
export const fetchSingleTopic = createAsyncThunk('topics/fetchSingleTopic', async (topicId) => {
  const response = await axios.get(`http://localhost:8080/topic/${topicId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a topic
export const addTopic = createAsyncThunk('topics/addTopic', async (topicData) => {
  const response = await axios.post('http://localhost:8080/topic/add-topic', topicData);
  return response.data;
});



// Async thunk to handle updating a topic
export const updateTopic = createAsyncThunk('topics/updateTopic', async ({ topicId, formData }) => {
  const response = await axios.put(`http://localhost:8080/topic/update/${topicId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a topic
export const deleteTopic = createAsyncThunk('topics/deleteTopic', async (topicId) => {
  await axios.delete(`http://localhost:8080/topic/delete/${topicId}`); // Removed extra slash
  return topicId;
});





// Create slice for topic
const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    loading: false,
    error: null,
    topics: [],
    singleTopic: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.topics = action.payload;
      })
      .addCase(fetchAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleTopic.pending, (state) => {
        state.singleTopic.loading = true;
        state.singleTopic.error = null;
      })
      .addCase(fetchSingleTopic.fulfilled, (state, action) => {
        state.singleTopic.loading = false;
        state.singleTopic.error = null;
        state.singleTopic.data = action.payload;
      })
      .addCase(fetchSingleTopic.rejected, (state, action) => {
        state.singleTopic.loading = false;
        state.singleTopic.error = action.payload;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.topics = state.topics.filter(topic => topic._id !== action.payload);
      })
      .addMatcher(
        (action) => [addTopic.pending, updateTopic.pending, deleteTopic.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addTopic.fulfilled, updateTopic.fulfilled, deleteTopic.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addTopic.rejected, updateTopic.rejected, deleteTopic.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default topicSlice.reducer;
