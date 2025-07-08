import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading, selectUser } from '../../features/authadminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select state from Redux
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Check if user and token are present in session storage
  const userFromSession = JSON.parse(sessionStorage.getItem('user'));
  const tokenFromSession = sessionStorage.getItem('token');

  // Redirect to dashboard if session exists or user is already logged in
  useEffect(() => {
    if (userFromSession && tokenFromSession) {
      navigate('/admindashboard');
    }
    if (user.user) {
      navigate('/admindashboard');
    }
  }, [user, navigate, userFromSession, tokenFromSession]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  // Handle register button click
  const handleRegister = () => {
    navigate('/registrationform');
  };

  return (
    <div className="container">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="card card-primary" style={{ backgroundColor: "#73c6b6 " }}>
                <div className="card-header">
                  <h4>Login</h4>
                </div>
                <div className="card-body">
                  {error && <p className="text-danger">{error}</p>}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <div className="d-block">
                        <label htmlFor="password" className="control-label">Password</label>
                        <div className="float-right">
                          <a href="/auth-forgot-password" className="text-small">Forgot Password?</a>
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="remember"
                          className="custom-control-input"
                          id="remember-me"
                        />
                        <label className="custom-control-label" htmlFor="remember-me">
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                      <button type="button" className="btn btn-secondary ms-3" onClick={handleRegister}>
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4 mb-3">
                    <div className="text-job text-muted">Login With Social</div>
                  </div>
                  <div className="row sm-gutters">
                    <div className="col-6">
                      <a className="btn btn-block btn-social btn-facebook">
                        <span className="fab fa-facebook" /> Facebook
                      </a>
                    </div>
                    <div className="col-6">
                      <a className="btn btn-block btn-social btn-twitter">
                        <span className="fab fa-twitter" /> Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-muted text-center">
                Don't have an account? <a href="/addadmin">Create One</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLoginForm;
