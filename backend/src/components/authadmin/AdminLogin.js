import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading, selectUser } from '../../features/authadminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const userFromSession = JSON.parse(sessionStorage.getItem('user'));
  const tokenFromSession = sessionStorage.getItem('token');

  useEffect(() => {
    if (userFromSession && tokenFromSession) {
      navigate('/admindashboard');
    }
    if (user.user) {
      navigate('/admindashboard');
    }
  }, [user, navigate, userFromSession, tokenFromSession]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  const handleRegister = () => {
    navigate('/addadmin');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #a1ffce, #faffd1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-4" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="text-center text-primary mb-4">Admin Login</h3>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-end mt-1">
                <a href="/auth-forgot-password" className="small text-decoration-none text-muted">Forgot Password?</a>
              </div>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="remember-me" />
              <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <div className="text-muted mb-2">Login With Social</div>
            <div className="d-flex justify-content-center gap-2">
              <a className="btn btn-outline-primary btn-sm" href="#"><i className="fab fa-facebook me-2"></i>Facebook</a>
              <a className="btn btn-outline-info btn-sm" href="#"><i className="fab fa-twitter me-2"></i>Twitter</a>
            </div>
          </div>

          <div className="text-center mt-4 text-muted">
  Don’t have an account? <a href="/addadmin" className="text-primary text-decoration-none">Create One</a>
</div>

        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
