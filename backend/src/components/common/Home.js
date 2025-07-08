import React from 'react';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const textStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 2s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>Welcome to Home</p>
    </div>
  );
};

export default Home;
