import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../features/studentSlice';
import { Link } from 'react-router-dom'; 

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    student_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    student_dob: '',
    student_address: '',
    student_image: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'student_image') {
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
      studentData.append('student_name', formData.student_name);
      studentData.append('email', formData.email);
      studentData.append('phone', formData.phone);
      studentData.append('password', formData.password);
      studentData.append('confirm_password', formData.confirm_password);
      studentData.append('student_dob', formData.student_dob);
      studentData.append('student_address', formData.student_address);

      formData.student_image.forEach((file) => {
        studentData.append('student_image', file);
      });

      await dispatch(addStudent(studentData));
      setSuccessMessage('Student registered successfully!');
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
      console.error('Error registering student:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right,rgb(243, 248, 253),rgb(230, 252, 253))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgb(164, 247, 255)',
          padding: '35px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '550px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>
          📝 Student Registration
        </h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '25px', fontSize: '14px' }}>
          Fill in the details to create your account
        </p>

        {successMessage && <div style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{successMessage}</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {[
            { label: 'Name', name: 'student_name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone', name: 'phone', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
            { label: 'DOB', name: 'student_dob', type: 'date' },
            { label: 'Address', name: 'student_address', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                  fontSize: '14px',
                }}
                required
              />
            </div>
          ))}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Profile Image(s)</label>
            <input
              type="file"
              name="student_image"
              onChange={handleChange}
              multiple
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '14px',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
            }}
          >
            {loading ? 'Submitting...' : 'Register'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
    Already have an account?{' '}
    <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
      Login here
    </Link>
  </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
