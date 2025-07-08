import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import {
  selectUser,
  selectLoading,
  selectError,
} from "../../features/authadminSlice";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem("user"));
    const tokenFromSession = sessionStorage.getItem("token");

    if (user || userFromSession || tokenFromSession) {
      setStoredUser(user.user || userFromSession);
    } else {
      navigate("/login");
    }
  }, [user, loading, error, navigate]);

  if (loading) return <p>Loading...</p>; // Loading state while waiting for data

  return (
    <div>
    {/* Header */}
    <div className="fixed-top w-100" style={{ backgroundColor: '#34495e', zIndex: 100 }}>
      <Header />
    </div>

    {/* Main Body Layout */}
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 fixed-left" style={{ position: 'fixed', top: '60px', height: '100vh' }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-10 offset-2" style={{ marginTop: '60px' }}>
          {/* Admin Panel Information */}
          {storedUser && (
            <div className="row" style={{ marginTop: '60px', marginLeft: '160px' }}>
              <div className="col-12">
                <h1>Admin Panel</h1>
              </div>
              <div className="col-12">
                <h2>Welcome to Admin's Account, {storedUser.firstName}</h2>
                <p>Email: {storedUser.email}</p>
                <p>Admin ID: {storedUser._id}</p>
              </div>
            </div>
          )}

          {/* Route Content */}
          <div className="row">
            <Routes>
              {/* Add your route components here */}
              
            </Routes>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
