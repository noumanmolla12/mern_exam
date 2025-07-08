import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudents, deleteStudent } from '../../features/studentSlice';
import { Link } from 'react-router-dom';
import { selectImagePath } from '../../features/globalpaths';

const StudentView = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const handleEdit = (studentId) => {
    console.log("Edit student with ID:", studentId);
  };

  const handleDelete = (studentId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this student?');
  
    if (isConfirmed) {
      dispatch(deleteStudent(studentId)); // Proceed with deletion
    }
  };
  

  return (
    <div className="container" style={{ backgroundColor: "#def8fc ", padding: "20px" }}>
      <h2>Student List</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {students && students.length > 0 ? (
        <div className="card" style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.student_name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.student_dob}</td>
                    <td>{student.student_address}</td>

                    <td>
                      {student.student_images.map((image, index) => (
                        <img
                          key={index}
                          src={imagePath + image}
                          alt={`Student ${index + 1}`}
                          style={{ width: '100px', height: 'auto', marginRight: '5px' }}
                        />
                      ))}
                    </td>

                    <td>
                      <Link to={`/admindashboard/edit-student/${student._id}`} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                      <button
  className="btn btn-danger btn-sm ms-2"
  onClick={() => handleDelete(student._id)}
>
  Delete
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No students found</div>
      )}
    </div>
  );
};

export default StudentView;
