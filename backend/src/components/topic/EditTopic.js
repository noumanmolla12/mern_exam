import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleTopic, updateTopic } from "../../features/topicSlice";
import { fetchAllCategories } from "../../features/categorySlice";

const EditTopic = () => {
  const dispatch = useDispatch();
  const { loading, error, topics } = useSelector((state) => state.topics);
  const { categories } = useSelector((state) => state.categories);
  const { topicId } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    topic_name: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllCategories());
    if (topicId) {
      dispatch(fetchSingleTopic(topicId));
    }
  }, [dispatch, topicId]);

  useEffect(() => {
    if (topicId) {
      const selectedTopic = topics.find((topic) => topic._id === topicId);
      if (selectedTopic) {
        setFormData({
          category: selectedTopic.category?._id || selectedTopic.category,
          topic_name: selectedTopic.topic_name,
        });
      }
    }
  }, [topicId, topics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Before Update:", formData);

    try {
      const topicData = new FormData();
      topicData.append("category", formData.category);
      topicData.append("topic_name", formData.topic_name);

      await dispatch(updateTopic({ topicId, formData: topicData }));
      setSuccessMessage("Topic updated successfully!");
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "20px",
        paddingLeft:"30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
          Edit Topic
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
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="category" style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>
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
                borderRadius: "5px",
                border: "1px solid #ccc",
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

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="topic_name" style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>
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
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && (
            <div style={{ color: "red", marginTop: "15px", textAlign: "center" }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditTopic;
