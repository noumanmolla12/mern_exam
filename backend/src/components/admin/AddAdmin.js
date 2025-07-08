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
    admin_image: [],
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
    } catch (err) {
      console.error('Error adding admin:', err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #a1ffce, #faffd1)',
        fontFamily: 'Segoe UI, sans-serif',padding: '20px',
      }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-4" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="text-center text-primary mb-4">Add New Admin</h3>

          {successMessage && (
            <div className="alert alert-success text-center">{successMessage}</div>
          )}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="admin_name" className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                id="admin_name"
                name="admin_name"
                value={formData.admin_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
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
              <label htmlFor="admin_dob" className="form-label fw-semibold">Date of Birth</label>
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
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="admin_address" className="form-label fw-semibold">Address</label>
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
              <label htmlFor="admin_image" className="form-label fw-semibold">Upload Image(s)</label>
              <input
                type="file"
                className="form-control"
                id="admin_image"
                name="admin_image"
                onChange={handleChange}
                multiple
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-muted">
  Already have an account? <a href="/" className="text-primary text-decoration-none">Login</a>
</div>

        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
