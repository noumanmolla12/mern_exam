import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../features/studentSlice';

const AddStudent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    student_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    student_dob: '', // Now as a date input
    student_address: '',
    student_image: [], // State to store multiple images
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'student_image') {
      // Handle multiple image selection
      const files = Array.from(e.target.files);
      setFormData({ ...formData, student_image: files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = new FormData();

      // Add non-image data to FormData
      studentData.append('student_name', formData.student_name);
      studentData.append('email', formData.email);
      studentData.append('phone', formData.phone);
      studentData.append('password', formData.password);
      studentData.append('confirm_password', formData.confirm_password);
      studentData.append('student_dob', formData.student_dob);
      studentData.append('student_address', formData.student_address);

      // Add images under the 'student_image' key
      formData.student_image.forEach((file, index) => {
        studentData.append('student_image', file);
      });

      console.log('Student Data:', studentData);

      await dispatch(addStudent(studentData));
      setSuccessMessage('Student added successfully!');

      // Optionally, reset the form after success
      setFormData({
        student_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        student_dob: '',
        student_address: '',
        student_image: [],
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="container mt-5 px-5">
      <div className="card shadow-lg" style={{ backgroundColor: '#ff6f00', borderRadius: '12px' }}>
        <div className="card-header text-center" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Add Student
        </div>
        <div className="card-body p-4" style={{ backgroundColor: '#f8c8d6', borderRadius: '12px' }}> {/* Pink Background */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="student_name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="student_name"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="student_dob" className="form-label">DOB</label>
              <input
                type="date"
                className="form-control"
                id="student_dob"
                name="student_dob"
                value={formData.student_dob}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="student_address" className="form-label">Student Address</label>
              <input
                type="text"
                className="form-control"
                id="student_address"
                name="student_address"
                value={formData.student_address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="student_image" className="form-label">Images</label>
              <input
                type="file"
                className="form-control"
                id="student_image"
                name="student_image"
                onChange={handleChange}
                multiple // Allow multiple file selection
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <div className="text-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
