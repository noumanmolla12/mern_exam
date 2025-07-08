import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from '../../features/adminSlice';

const AddAdmin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admins);

  const [formData, setFormData] = useState({
    admin_name: '',
    email: '',
    phone: '',
    admin_dob: '',
    password: '',
    confirm_password: '',
    admin_address: '',
    admin_image: [], // State to store multiple images
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'admin_image') {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, admin_image: files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminData = new FormData();
      adminData.append('admin_name', formData.admin_name);
      adminData.append('email', formData.email);
      adminData.append('phone', formData.phone);
      adminData.append('password', formData.password);
      adminData.append('confirm_password', formData.confirm_password);
      adminData.append('admin_dob', formData.admin_dob);
      adminData.append('admin_address', formData.admin_address);

      formData.admin_image.forEach((file) => {
        adminData.append('admin_image', file);
      });

      await dispatch(addAdmin(adminData));
      setSuccessMessage('Admin added successfully!');
      
      setFormData({
        admin_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        admin_dob: '',
        admin_address: '',
        admin_image: [],
      });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div >
      <div>
        <div >
          Add Admin
        </div>
        <div >
          {successMessage && <div >{successMessage}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="admin_name" className="form-label" >Name</label>
              <input
                type="text"
                className="form-control"
                id="admin_name"
                name="admin_name"
                value={formData.admin_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#000' }}>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label" style={{ color: '#000' }}>Phone</label>
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
              <label htmlFor="admin_dob" className="form-label" style={{ color: '#000' }}>DOB</label>
              <input
                type="date"
                className="form-control"
                id="admin_dob"
                name="admin_dob"
                value={formData.admin_dob}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#000' }}>Password</label>
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
              <label htmlFor="confirm_password" className="form-label" style={{ color: '#000' }}>Confirm Password</label>
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
              <label htmlFor="admin_address" className="form-label" style={{ color: '#000' }}>Address</label>
              <input
                type="text"
                className="form-control"
                id="admin_address"
                name="admin_address"
                value={formData.admin_address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="admin_image" className="form-label" style={{ color: '#000' }}>Images</label>
              <input
                type="file"
                className="form-control"
                id="admin_image"
                name="admin_image"
                onChange={handleChange}
                multiple
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-light" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        {error && <div className="text-danger text-center mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default AddAdmin;
