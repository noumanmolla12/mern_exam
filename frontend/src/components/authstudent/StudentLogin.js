import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading, selectUser } from '../../features/authstudentSlice';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ added useLocation

const StudentLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get attempted route

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      const { user, token } = resultAction.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      const redirectTo = location.state?.from?.pathname || '/'; // ✅ redirect back to attempted URL
      navigate(redirectTo, { replace: true });
    }
  };

  const handleRegister = () => {
    navigate('/student-register');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right,rgb(243, 248, 253),rgb(230, 252, 253))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgb(164, 247, 255)',
          padding: '35px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>
          🎓 Student Portal Login
        </h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '25px', fontSize: '14px' }}>
          Access your exams, results, and dashboard
        </p>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Keep me logged in
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#007bff',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              onClick={handleRegister}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#6c757d',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>
          <a href="/auth-forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#777',
            borderTop: '1px solid #eee',
            paddingTop: '15px',
          }}
        >
          Don’t have an account?{' '}
          <a href="/registrationform" style={{ color: '#007bff', textDecoration: 'none' }}>
            Create One
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginForm;
