import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTopics, deleteTopic } from "../../features/topicSlice";
import { fetchAllCategories } from "../../features/categorySlice";
import { Link } from "react-router-dom";
import { selectImagePath } from "../../features/globalpaths";

const TopicView = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);

  const { loading, error, topics } = useSelector((state) => state.topics);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllTopics());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleDelete = (topicId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic?");
    if (confirmDelete) {
      dispatch(deleteTopic(topicId));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.course_name : "Category Not Found";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f9f9fb",
        minHeight: "80vh",
        paddingLeft:"30px",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          Topic List
        </h2>

        {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
        {error && (
          <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {topics && topics.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                backgroundColor: "#fff",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f0f4ff", color: "#333" }}>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Category
                  </th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Topic Name
                  </th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px" }}>{getCategoryName(topic.category)}</td>
                    <td style={{ padding: "10px" }}>{topic.topic_name}</td>
                    <td style={{ padding: "10px" }}>
                      <Link
                        to={`/admindashboard/edit-topic/${topic._id}`}
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          fontSize: "14px",
                          marginRight: "10px",
                          display: "inline-block",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(topic._id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "14px",
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
          <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
            No topics found
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicView;
