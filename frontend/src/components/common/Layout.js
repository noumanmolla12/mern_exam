import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storedUser, setStoredUser] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hoveredLink, setHoveredLink] = useState(null); // ✅ Hover state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setStoredUser(user || null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const isMobile = screenWidth <= 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header storedUser={storedUser} handleLogout={handleLogout} isMobile={isMobile} />

      <div style={{ display: 'flex' }}>
        {!isMobile && (
          <aside style={{ width: '240px', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Sidebar
              isMobile={isMobile}
              hoveredLink={hoveredLink}
              setHoveredLink={setHoveredLink}
            />
          </aside>
        )}

        <main style={{ flex: 1, padding: isMobile ? '15px' : '25px' }}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
