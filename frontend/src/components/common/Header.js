import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ storedUser, handleLogout, isMobile }) => {
  const navigate = useNavigate();

  const styles = {
    header: {
      backgroundColor: '#ffffff',
      padding: isMobile ? '10px 20px' : '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    logo: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      border: '2px solid rgb(44, 62, 80)',
    },
    button: {
      padding: '6px 12px',
      backgroundColor: '#3f51b5',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Eo_circle_light-blue_letter-n.svg"
          alt="Logo"
          style={styles.logo}
        />
        <h4 style={{ marginLeft: '15px' }}>Student Dashboard</h4>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {storedUser ? (
          <>
            <span style={{ fontWeight: 'bold' }}>{storedUser.email}</span>
            <button
              onClick={handleLogout}
              style={{ ...styles.button, backgroundColor: '#e74c3c' }}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/studentlogin')} style={styles.button}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
