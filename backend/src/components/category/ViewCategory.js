import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, deleteCategory } from "../../features/categorySlice";
import { Link } from "react-router-dom";

function CategoryView() {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f7fc",
        padding: "40px",
        paddingLeft:"30px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#4a6fa5",
            marginBottom: "25px",
            fontWeight: "bold",
          }}
        >
          Category List
        </h2>

        {loading && <div style={{ textAlign: "center", color: "#007bff" }}>Loading...</div>}
        {error && <div style={{ textAlign: "center", color: "red" }}>{error}</div>}

        {categories && categories.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "16px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#e9f1ff", color: "#333" }}>
                  <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Name</th>
                  <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px" }}>{category.course_name}</td>
                    <td style={{ padding: "10px" }}>
                      <Link
                        to={`/admindashboard/edit-category/${category._id}`}
                        style={{
                          marginRight: "10px",
                          textDecoration: "none",
                          backgroundColor: "#4a6fa5",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category._id)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
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
          <div style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
            No categories found
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryView;
