import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchAllCategories } from "../../features/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    parentCategory: "",
    course_name: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCategory(formData));
      setSuccessMessage("Category added successfully!");
      setFormData({
        parentCategory: "",
        course_name: "",
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
      backgroundColor: "#f0f4fa",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#4e73df",
          marginBottom: "20px"
        }}>Add Category</h2>

        {successMessage && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "5px",
            padding: "10px",
            textAlign: "center",
            marginBottom: "15px"
          }}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="parentCategory" style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px"
            }}>
              Parent Category
            </label>
            <select
              id="parentCategory"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            >
              <option value="">Select Parent Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.course_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="course_name" style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px"
            }}>
              Course Name
            </label>
            <input
              type="text"
              id="course_name"
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#4e73df",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2e59d9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4e73df"}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && (
            <div style={{
              marginTop: "15px",
              color: "#dc3545",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
