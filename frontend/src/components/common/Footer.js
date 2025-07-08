import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // centers horizontally
        alignItems: 'center',     // centers vertically
        width: '100%',
        height: '60px',           // set a consistent height
        backgroundColor: 'rgb(94, 53, 177)',
        color: 'white',
        fontSize: '14px',
        textAlign: 'center',
      }}
    >
      <p>&copy; 2025 Designed By NOUMAN || All rights reserved.</p>
    </div>
  );
};

export default Footer;
