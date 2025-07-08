import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logoutAuthAdmin } from '../../features/authadminSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [storedUser, setStoredUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutAuthAdmin());
    sessionStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');

    if (user || userFromSession || tokenFromSession) {
      setStoredUser(user || userFromSession);
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <header className=" text-white p-3 shadow-sm" style={{
    position: "sticky",
    top: 0,
    backgroundColor:"rgb(44, 62, 80)",
    zIndex: 1000,
    width: "100vw",          // full width
    marginLeft: "calc(-50vw + 50%)", // fixes margin from container
  }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Eo_circle_light-blue_letter-n.svg"
            alt="Logo"
            width="40"
            className="me-3"
          />
          <h3 className="m-0">Admin Dashboard</h3>
        </div>

        {storedUser && (
          <div className="d-flex align-items-center">
            <div className="me-4 text-end">
              <h6 className="m-0">Welcome, {storedUser.firstName}</h6>
              <small>{storedUser.email}</small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
