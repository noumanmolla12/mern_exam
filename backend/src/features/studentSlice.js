import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all students

export const fetchAllStudents = createAsyncThunk('students/fetchAllStudents', async () => {
  const response = await axios.get('http://localhost:8080/student/all');
  return response.data;
});

// Async thunk to fetch a student by ID
export const fetchSingleStudent = createAsyncThunk('students/fetchSingleStudent', async (studentId) => {
  const response = await axios.get(`http://localhost:8080/student/${studentId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a student
export const addStudent = createAsyncThunk('students/addStudent', async (studentData) => {
  const response = await axios.post('http://localhost:8080/student/add-student', studentData);
  return response.data;
});



// Async thunk to handle updating a student
export const updateStudent = createAsyncThunk('students/updateStudent', async ({ studentId, formData }) => {
  const response = await axios.put(`http://localhost:8080/student/update/${studentId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (studentId) => {
  await axios.delete(`http://localhost:8080/student/delete/${studentId}`);
  return studentId;
});




// Create slice for student
const studentSlice = createSlice({
  name: 'students',
  initialState: {
    loading: false,
    error: null,
    students: [],
    singleStudent: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleStudent.pending, (state) => {
        state.singleStudent.loading = true;
        state.singleStudent.error = null;
      })
      .addCase(fetchSingleStudent.fulfilled, (state, action) => {
        state.singleStudent.loading = false;
        state.singleStudent.error = null;
        state.singleStudent.data = action.payload;
      })
      .addCase(fetchSingleStudent.rejected, (state, action) => {
        state.singleStudent.loading = false;
        state.singleStudent.error = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = state.students.filter(student => student._id !== action.payload);
      })
      .addMatcher(
        (action) => [addStudent.pending, updateStudent.pending, deleteStudent.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addStudent.fulfilled, updateStudent.fulfilled, deleteStudent.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addStudent.rejected, updateStudent.rejected, deleteStudent.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default studentSlice.reducer;
