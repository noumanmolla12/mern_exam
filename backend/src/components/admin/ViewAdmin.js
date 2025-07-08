import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAdmins, deleteAdmin } from '../../features/adminSlice';
import { Link } from 'react-router-dom';
import { selectImagePath } from '../../features/globalpaths';

const AdminView = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, admins } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, [dispatch]);

  const handleDelete = (adminId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this admin?');
  
    if (isConfirmed) {
      dispatch(deleteAdmin(adminId));
    }
  };
  

  return (
    <div className="container mt-5" style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px" }}>
      <div className="card shadow-lg" style={{ backgroundColor: "#def8fc", padding: "20px" }}>
        <h2 className="text-center">Admin List</h2>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        {admins && admins.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.admin_name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td>{admin.admin_dob}</td>
                    <td>{admin.admin_address}</td>
                    <td>
                      {admin.admin_images.map((image, index) => (
                        <img
                          key={index}
                          src={imagePath + image}
                          alt={`Admin ${index + 1}`}
                          style={{ width: '100px', height: 'auto', marginRight: '5px' }}
                        />
                      ))}
                    </td>
                    <td>
                      <Link to={`/admindashboard/edit-admin/${admin._id}`} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                      <button
  className="btn btn-danger btn-sm ms-2"
  onClick={() => handleDelete(admin._id)}
>
  Delete
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No admins found</div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
