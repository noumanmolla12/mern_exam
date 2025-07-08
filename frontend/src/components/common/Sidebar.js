import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isMobile, hoveredLink, setHoveredLink }) => {
  const styles = {
    sidebar: {
      width: isMobile ? '100%' : '200px',
      height: isMobile ? '100%' : '100%',
      background: 'linear-gradient(to bottom, #3f51b5, #5e35b1)',
      color: 'white',
      padding: isMobile ? '15px' : '25px 20px',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      justifyContent: isMobile ? 'space-around' : 'flex-start',
      alignItems: isMobile ? 'center' : 'stretch',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    },
    sidebarTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: isMobile ? '10px' : '30px',
      textAlign: 'center',
    },
    navLink: {
      padding: '12px 20px',
      margin: isMobile ? '0 5px' : '8px 0',
      textDecoration: 'none',
      color: 'white',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transition: '0.2s ease',
      fontSize: '16px',
    },
    navLinkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
  };

  return (
    <div style={styles.sidebar}>
      {!isMobile && <div style={styles.sidebarTitle}>📘 Student Exam Dashboard</div>}

      <Link
        to="/"
        style={{
          ...styles.navLink,
          ...(hoveredLink === 'home' ? styles.navLinkHover : {}),
        }}
        onMouseEnter={() => setHoveredLink('home')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        🏠 Home
      </Link>

      <Link
        to="/category-page"
        style={{
          ...styles.navLink,
          ...(hoveredLink === 'exam' ? styles.navLinkHover : {}),
        }}
        onMouseEnter={() => setHoveredLink('exam')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        📝 Start Exam
      </Link>

      <Link
        to="/result/:userId"
        style={{
          ...styles.navLink,
          ...(hoveredLink === 'results' ? styles.navLinkHover : {}),
        }}
        onMouseEnter={() => setHoveredLink('results')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        📊 View Results
      </Link>

      <Link
        to="/author"
        style={{
          ...styles.navLink,
          ...(hoveredLink === 'author' ? styles.navLinkHover : {}),
        }}
        onMouseEnter={() => setHoveredLink('author')}
        onMouseLeave={() => setHoveredLink(null)}
      >
        🏠 Author
      </Link>
    </div>
  );
};

export default Sidebar;
