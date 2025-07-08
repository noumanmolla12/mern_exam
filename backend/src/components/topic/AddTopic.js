import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopic } from "../../features/topicSlice";
import { fetchAllCategories } from "../../features/categorySlice";

const AddTopic = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    category: "",
    topic_name: "",
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
      const topicData = new FormData();
      topicData.append("category", formData.category);
      topicData.append("topic_name", formData.topic_name);

      await dispatch(addTopic(topicData));
      setSuccessMessage("Topic added successfully!");

      setFormData({
        category: "",
        topic_name: "",
      });
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f7fd",
        padding: "20px",
        paddingLeft:"30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3b5998" }}>
          Add Topic
        </h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="category" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.course_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="topic_name" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Topic Name
            </label>
            <input
              type="text"
              id="topic_name"
              name="topic_name"
              value={formData.topic_name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#3b5998",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && (
            <div style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTopic;
