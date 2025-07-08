import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleAdmin, updateAdmin } from '../../features/adminSlice';
import { selectImagePath } from '../../features/globalpaths';

const EditAdmin = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, admins } = useSelector((state) => state.admins);
  const { adminId } = useParams();

  const [formData, setFormData] = useState({
    admin_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    admin_dob: '',
    admin_address: '',
    admin_images: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (adminId) {
      const selectedAdmin = admins.find((admin) => admin._id === adminId);
      if (selectedAdmin) {
        setFormData({
          admin_name: selectedAdmin.admin_name,
          admin_dob: selectedAdmin.admin_dob,
          email: selectedAdmin.email,
          phone: selectedAdmin.phone,
          password: selectedAdmin.password,
          confirm_password: selectedAdmin.confirm_password,
          admin_address: selectedAdmin.admin_address,
          admin_images: selectedAdmin.admin_images || [],
        });
      }
    }
  }, [adminId, admins]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, admin_images: [...formData.admin_images, ...files] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      formData.admin_images.forEach((file) => {
        adminData.append('admin_images', file);
      });

      await dispatch(updateAdmin({ adminId, formData: adminData }));
      setSuccessMessage('Admin updated successfully!');
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <div className="container mt-5 px-5">
      <div className="card shadow-lg" style={{ backgroundColor: '#def8fc', borderRadius: '12px' }}>
        <div className="card-header text-center" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Edit Admin
        </div>
        <div className="card-body p-4" style={{ backgroundColor: '#fff', borderRadius: '12px' }}>
          {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Admin Name */}
            <div className="mb-4">
              <label htmlFor="admin_name" className="form-label" style={{ color: '#000' }}>Name</label>
              <input
                type="text"
                className="form-control"
                id="admin_name"
                name="admin_name"
                value={formData.admin_name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ color: '#000' }}>Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
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

            {/* Password */}
            <div className="mb-4">
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

            {/* Confirm Password */}
            <div className="mb-4">
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

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="admin_dob" className="form-label" style={{ color: '#000' }}>DOB</label>
              <input
                type="text"
                className="form-control"
                id="admin_dob"
                name="admin_dob"
                value={formData.admin_dob}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
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

            {/* Images */}
            <div className="mb-4">
              <label htmlFor="admin_images" className="form-label" style={{ color: '#000' }}>Images</label>
              <input
                type="file"
                className="form-control"
                id="admin_images"
                name="admin_images"
                onChange={handleImageChange}
                multiple
              />
              <br />
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {admins.map((admin) => {
                  if (admin._id === adminId) {
                    return admin.admin_images.map((image, index) => (
                      <li key={index} style={{ float: 'left', marginLeft: '15px' }}>
                        <img
                          src={imagePath + image}
                          alt={`Admin Image ${index + 1}`}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </li>
                    ));
                  }
                  return null;
                })}
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-light" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && <div className="text-danger text-center mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default EditAdmin;
