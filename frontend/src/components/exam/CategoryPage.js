import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../features/categorySlice";
import { Link } from "react-router-dom";

function CategoryPage() {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Array of background colors to cycle through for cards
  const cardColors = ["#d6eaff", "#c1f0f6", "#ffd6d6", "#d6ffd6", "#fff3cc"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f6ff",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#2e86de",
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        Choose a Course to Start Your Exam
      </h2>

      {loading && <div style={{ textAlign: "center", color: "#2e86de" }}>Loading...</div>}
      {error && <div style={{ textAlign: "center", color: "red" }}>{error}</div>}

      {categories && categories.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {categories.map((category, index) => (
            <Link
              to={`/topic-page/${category._id}`}
              key={category._id}
              style={{ textDecoration: "none", width: "280px" }}
            >
              <div
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h5
                  style={{
                    fontSize: "20px",
                    color: "#333",
                    margin: 0,
                  }}
                >
                  {category.course_name}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#555", marginTop: "20px" }}>
          No categories found
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
