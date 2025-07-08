import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectLoading, selectError, logoutAuthStudent } from '../../features/authstudentSlice';

const StudentMyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [storedUser, setStoredUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutAuthStudent()); // Dispatch the logout action
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    console.log('USER', user);

    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');

    if (user || userFromSession || tokenFromSession) {
      setStoredUser(user || userFromSession);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      {storedUser && (
        <div>
          <h2>Welcome, {storedUser.firstName}</h2>
          <p>Email: {storedUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default StudentMyAccount;
