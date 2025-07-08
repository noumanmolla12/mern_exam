import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all answers

export const fetchAllAnswers = createAsyncThunk('answers/fetchAllAnswers', async () => {
  const response = await axios.get('http://localhost:8080/answers/all');
  return response.data;
});

// Async thunk to fetch a answer by ID
export const fetchSingleAnswer = createAsyncThunk('answers/fetchSingleAnswer', async (answerId) => {
  const response = await axios.get(`http://localhost:8080/answers/${answerId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a answer
export const addAnswer = createAsyncThunk('answers/addAnswer', async (answerData) => {
  const response = await axios.post('http://localhost:8080/answers/add-answer', answerData);
  return response.data;
});



// Async thunk to handle updating a answer
export const updateAnswer = createAsyncThunk('answers/updateAnswer', async ({ answerId, formData }) => {
  const response = await axios.put(`http://localhost:8080/answers/update/${answerId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a answer
export const deleteAnswer = createAsyncThunk('answers/deleteAnswer', async (answerId) => {
  await axios.delete(`http://localhost:8080/answers/delete/${answerId}`); // Removed extra slash
  return answerId;
});





// Create slice for answer
const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    loading: false,
    error: null,
    answers: [],
    singleAnswer: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.answers = action.payload;
      })
      .addCase(fetchAllAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleAnswer.pending, (state) => {
        state.singleAnswer.loading = true;
        state.singleAnswer.error = null;
      })
      .addCase(fetchSingleAnswer.fulfilled, (state, action) => {
        state.singleAnswer.loading = false;
        state.singleAnswer.error = null;
        state.singleAnswer.data = action.payload;
      })
      .addCase(fetchSingleAnswer.rejected, (state, action) => {
        state.singleAnswer.loading = false;
        state.singleAnswer.error = action.payload;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.answers = state.answers.filter(answer => answer._id !== action.payload);
      })
      .addMatcher(
        (action) => [addAnswer.pending, updateAnswer.pending, deleteAnswer.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addAnswer.fulfilled, updateAnswer.fulfilled, deleteAnswer.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addAnswer.rejected, updateAnswer.rejected, deleteAnswer.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default answerSlice.reducer;
