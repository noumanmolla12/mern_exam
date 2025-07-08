// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Author from './components/common/Author';
import Home from './components/common/Home';
import CategoryPage from './components/exam/CategoryPage';
import TopicPage from './components/exam/TopicPage';
import ExamPage from './components/exam/ExamPage';
import Result from './components/exam/Result';

import StudentDashboard from './components/authstudent/StudentDashboard';
import StudentLogin from './components/authstudent/StudentLogin';
import Register from './components/authstudent/Register';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/common/Layout'; // 👈 import the Layout

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with shared layout (Header) */}
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/student-register" element={<Register />} />
          <Route path="/author" element={<Author />} />
          <Route path="/category-page" element={<CategoryPage />} />
          <Route path="/topic-page/:categoryId" element={<TopicPage />} />

          {/* Protected */}
          <Route
            path="/exam-page/:topicId"
            element={
              <PrivateRoute>
                <ExamPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/result/:userId"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
