import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/authadmin/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/authadmin/AdminLayout';
import AdminDashboard from './components/authadmin/AdminDashboard';

import AddAdmin from './components/admin/AddAdmin';
import ViewAdmin from './components/admin/ViewAdmin';
import EditAdmin from './components/admin/EditAdmin';

import AddStudent from './components/student/AddStudent';
import ViewStudent from './components/student/ViewStudent';
import EditStudent from './components/student/EditStudent';


import AddCategory from './components/category/AddCategory';
import ViewCategory from './components/category/ViewCategory';
import EditCategory from './components/category/EditCategory';

import AddTopic from './components/topic/AddTopic';
import ViewTopic from './components/topic/ViewTopic';
import EditTopic from './components/topic/EditTopic';

import AddQuestions from './components/questions/AddQuestions';
import ViewQuestions from './components/questions/ViewQuestions';
import EditQuestions from './components/questions/EditQuestions';

import AddAnswers from './components/answers/AddAnswer';
import ViewAnswers from './components/answers/ViewAnswer';
import EditAnswers from './components/answers/EditAnswer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/addadmin" element={<AddAdmin />} />

        {/* Protected Layout with Nested Routes */}
        <Route
          path="/admindashboard"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          {/* Default Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Admin Routes */}
          {/* <Route path="addadmin" element={<AddAdmin />} /> */}
          <Route path="viewadmin" element={<ViewAdmin />} />
          <Route path="edit-admin/:adminId" element={<EditAdmin />} />

          {/* Student Routes */}
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="viewstudent" element={<ViewStudent />} />
          <Route path="edit-student/:studentId" element={<EditStudent />} />

          {/* Category Routes */}
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="viewcategory" element={<ViewCategory />} />
          <Route path="edit-category/:categoryId" element={<EditCategory />} />

          {/* Topic Routes */}
          <Route path="addtopic" element={<AddTopic />} />
          <Route path="viewtopic" element={<ViewTopic />} />
          <Route path="edit-topic/:topicId" element={<EditTopic />} />

          {/* Question Routes */}
          <Route path="addquestion" element={<AddQuestions />} />
          <Route path="viewquestion" element={<ViewQuestions />} />
          <Route path="edit-question/:questionId" element={<EditQuestions />} />

          {/* Answer Routes */}
          <Route path="addanswer" element={<AddAnswers />} />
          <Route path="viewanswer" element={<ViewAnswers />} />
          <Route path="edit-answer/:answerId" element={<EditAnswers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
