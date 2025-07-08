import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all questions

export const fetchAllQuestions = createAsyncThunk('questions/fetchAllQuestions', async () => {
  const response = await axios.get('http://localhost:8080/questions/all');
  return response.data;
});

// Async thunk to fetch a question by ID
export const fetchSingleQuestion = createAsyncThunk('questions/fetchSingleQuestion', async (questionId) => {
  const response = await axios.get(`http://localhost:8080/questions/${questionId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a question
export const addQuestion = createAsyncThunk('questions/addQuestion', async (questionData) => {
  const response = await axios.post('http://localhost:8080/questions/add-question', questionData);
  return response.data;
});



// Async thunk to handle updating a question
export const updateQuestion = createAsyncThunk('questions/updateQuestion', async ({ questionId, formData }) => {
  const response = await axios.put(`http://localhost:8080/questions/update/${questionId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a question
export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionId) => {
  await axios.delete(`http://localhost:8080/questions/delete/${questionId}`); // Removed extra slash
  return questionId;
});





// Create slice for question
const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: false,
    error: null,
    questions: [],
    singleQuestion: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleQuestion.pending, (state) => {
        state.singleQuestion.loading = true;
        state.singleQuestion.error = null;
      })
      .addCase(fetchSingleQuestion.fulfilled, (state, action) => {
        state.singleQuestion.loading = false;
        state.singleQuestion.error = null;
        state.singleQuestion.data = action.payload;
      })
      .addCase(fetchSingleQuestion.rejected, (state, action) => {
        state.singleQuestion.loading = false;
        state.singleQuestion.error = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questions = state.questions.filter(question => question._id !== action.payload);
      })
      .addMatcher(
        (action) => [addQuestion.pending, updateQuestion.pending, deleteQuestion.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addQuestion.fulfilled, updateQuestion.fulfilled, deleteQuestion.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addQuestion.rejected, updateQuestion.rejected, deleteQuestion.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default questionSlice.reducer;
