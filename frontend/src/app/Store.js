
import { configureStore } from '@reduxjs/toolkit';
// import authadminSlice from '../features/authadminSlice';
 import authstudentSlice from '../features/authstudentSlice'; 
// import adminSlice from '../features/adminSlice';
import studentSlice from '../features/studentSlice';

import categorySlice from '../features/categorySlice';
import topicSlice from '../features/topicSlice';

import answerSlice from '../features/answerSlice';
import questionSlice from '../features/questionSlice';

import examSlice from '../features/examSlice';
import resultSlice from '../features/resultSlice';

// import pathReducer from '../features/globalpaths';



const Store = configureStore({
  reducer: {
    // useradmin: authadminSlice,
    userstudent: authstudentSlice,
    // admins: adminSlice,
    students: studentSlice,
    // path: pathReducer,
    categories: categorySlice,
    topics: topicSlice,
    questions: questionSlice,
    answers: answerSlice,
    exam: examSlice,
    result: resultSlice,
  },
});


export default Store;
