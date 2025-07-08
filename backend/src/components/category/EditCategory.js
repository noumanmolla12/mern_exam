import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createCategory,
  fetchAllCategories,
  fetchSingleCategory,
  updateCategory,
} from "../../features/categorySlice";

const EditCategory = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { loading, error, categories } = useSelector((state) => state.categories);
  const {
    loading: singleLoading,
    error: singleError,
    data: singleCategory,
  } = useSelector((state) => state.categories.singleCategory);

  const [singleCategories, setSingleCategories] = useState({
    parentCategory: "",
    course_name: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategory = categories.find((category) => category._id === categoryId);
    if (selectedCategory) {
      setSingleCategories({
        parentCategory: selectedCategory.parentCategory || "",
        course_name: selectedCategory.course_name || "",
      });
    }
  }, [categories, categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchSingleCategory(categoryId));
        setSingleCategories({
          parentCategory: response.payload?.parentCategory || "",
          course_name: response.payload?.course_name || "",
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    if (categoryId) {
      fetchData();
    }
  }, [dispatch, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleCategories((prevSingleCategories) => ({
      ...prevSingleCategories,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCategory({ categoryId, formData: singleCategories }));
      setSuccessMessage("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f8fb",
        padding: "20px",
        paddingLeft:"50px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "30px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#2c3e50",
            fontWeight: "600",
          }}
        >
          Edit Category
        </h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="parentCategory" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Parent Category
            </label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              id="parentCategory"
              name="parentCategory"
              value={singleCategories.parentCategory || ""}
              onChange={handleChange}
            >
              <option value="">Select Parent Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.course_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="course_name" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Course Name
            </label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              id="course_name"
              name="course_name"
              value={singleCategories.course_name}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#3498db",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update"}
          </button>

          {error && (
            <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
