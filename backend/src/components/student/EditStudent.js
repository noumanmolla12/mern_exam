import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleStudent, updateStudent } from '../../features/studentSlice';
import { selectImagePath } from  '../../features/globalpaths';

const EditStudent = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, students } = useSelector((state) => state.students);
  const { studentId } = useParams();

  const [formData, setFormData] = useState({
    student_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    student_dob: '',
    student_address: '',
    student_images: [], // State to store multiple images
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (studentId) {
      const selectedStudent = students.find((student) => student._id === studentId);
      if (selectedStudent) {
        setFormData({
          student_name: selectedStudent.student_name,
          email: selectedStudent.email,
          phone: selectedStudent.phone,
          password: selectedStudent.password,
          confirm_password: selectedStudent.confirm_password,
          student_dob: selectedStudent.student_dob,
          student_address: selectedStudent.student_address,
          student_images: selectedStudent.student_images || [],
        });
      }
    }
  }, [studentId, students]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, student_images: [...formData.student_images, ...files] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = new FormData();
      studentData.append('student_name', formData.student_name);
      studentData.append('email', formData.email);
      studentData.append('phone', formData.phone);
      studentData.append('password', formData.password);
      studentData.append('confirm_password', formData.confirm_password);
      studentData.append('student_dob', formData.student_dob);
      studentData.append('student_address', formData.student_address);

      formData.student_images.forEach((file, index) => {
        studentData.append('student_images', file);
      });

      await dispatch(updateStudent({ studentId, formData: studentData }));
      setSuccessMessage('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container mt-5 px-5">
      <div className="card shadow-lg" style={{ backgroundColor: '#298391', borderRadius: '12px' }}>
        <div className="card-header text-center" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Edit Student
        </div>
        <div className="card-body p-4" style={{ backgroundColor: '#def8fc', borderRadius: '12px' }}> {/* Pink Background */}
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
              <label htmlFor="student_address" className="form-label">Address</label>
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
              <label htmlFor="student_images" className="form-label">Images</label>
              <input
                type="file"
                className="form-control"
                id="student_images"
                name="student_images"
                onChange={handleImageChange}
                multiple
              />
              <br />
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {students.map((student) => {
                  if (student._id === studentId) {
                    return student.student_images.map((image, index) => (
                      <li key={index} style={{ float: 'left', marginLeft: '15px' }}>
                        <img
                          src={imagePath + image}
                          alt={`Student Image ${index + 1}`}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </li>
                    ));
                  }
                  return null;
                })}
              </ul>
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

export default EditStudent;
