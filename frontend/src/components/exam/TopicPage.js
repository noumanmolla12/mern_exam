import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTopics } from "../../features/topicSlice";
import { fetchAllCategories } from "../../features/categorySlice";
import { useParams, Link } from "react-router-dom";

const TopicPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { loading, error, topics } = useSelector((state) => state.topics);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllTopics());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const filteredTopics = topics.filter((topic) => topic.category === categoryId);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.course_name : "Category Not Found";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1rem", color: "#2c3e50", fontSize: "2rem" }}>
        Select a Topic to Give Exam
      </h1>

      <h3 style={{ marginBottom: "2rem", color: "#34495e", fontWeight: "500" }}>
        Course: <span style={{ color: "#2e86de", fontWeight: "bold" }}>{getCategoryName(categoryId)}</span>
      </h3>

      {loading && <div style={{ fontSize: "1.2rem", color: "#555" }}>Loading topics...</div>}
      {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}

      {!loading && filteredTopics.length === 0 && (
        <div style={{ color: "#777", fontStyle: "italic" }}>
          No topics found for this category.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {filteredTopics.map((topic) => (
          <div
            key={topic._id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              padding: "1.5rem",
              transition: "transform 0.2s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h4 style={{ color: "#2e86de", marginBottom: "1rem", fontSize: "1.2rem" }}>
              {topic.topic_name}
            </h4>
            <Link
              to={`/exam-page/${topic._id}`}
              state={{ topicName: topic.topic_name }}
              style={{
                display: "inline-block",
                padding: "0.6rem 1.2rem",
                border: "2px solid #2e86de",
                borderRadius: "6px",
                color: "#2e86de",
                textDecoration: "none",
                fontWeight: "600",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2e86de";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2e86de";
              }}
            >
              Start Exam
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
