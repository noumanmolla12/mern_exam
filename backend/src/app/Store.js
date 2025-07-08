
import { configureStore } from '@reduxjs/toolkit';
 import authadminSlice from '../features/authadminSlice';
 import adminSlice from '../features/adminSlice';
import studentSlice from '../features/studentSlice';
import categorySlice from '../features/categorySlice';
import topicSlice from '../features/topicSlice';
import questionSlice from '../features/questionSlice';
import answerSlice from '../features/answerSlice';


 import pathReducer from '../features/globalpaths';



const Store = configureStore({
  reducer: {
    useradmin: authadminSlice,
    //userstudent: authstudentSlice,
     admins: adminSlice,
    students: studentSlice,
     path: pathReducer,
     categories: categorySlice,
     topics: topicSlice,
     questions: questionSlice,
     answers: answerSlice,
    
  },
});


export default Store;
