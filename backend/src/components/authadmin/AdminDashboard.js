// components/authadmin/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Admin Panel</h1>
      {user ? (
        <>
          <h2 style={styles.subtitle}>Welcome, {user.firstName}</h2>
          <p>Email: {user.email}</p>
          {/* <p>ID: {user._id}</p> */}
        </>
      ) : (
        <p>No admin user found in session.</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.06)",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "32px",
    color: "rgb(44, 62, 80)",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "8px",
  },
};

export default AdminDashboard;
