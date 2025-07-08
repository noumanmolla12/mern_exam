import React from 'react';

const Author = () => {
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f7f9fc',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '30px',
    },
    leftColumn: {
      flex: '1 1 300px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      textAlign: 'center',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '15px',
      border: '4px solid #4a90e2',
    },
    heading: {
      fontSize: '24px',
      color: '#4a90e2',
      marginBottom: '10px',
    },
    contact: {
      marginTop: '20px',
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#444',
    },
    rightColumn: {
      flex: '2 1 600px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    subheading: {
      fontSize: '20px',
      marginTop: '20px',
      color: '#222',
      borderBottom: '2px solid #4a90e2',
      paddingBottom: '6px',
    },
    paragraph: {
      fontSize: '15px',
      color: '#333',
      lineHeight: '1.8',
      margin: '10px 0',
    },
    list: {
      marginTop: '10px',
      paddingLeft: '20px',
    },
    listItem: {
      marginBottom: '8px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Column */}
      <div style={styles.leftColumn}>
        <img
          src={"./images/profile.jpg"}
          alt="Profile"
          style={styles.profileImage}
        />
        <h2 style={styles.heading}>Mohammad Nouman Molla</h2>
        <p style={styles.contact}>
          <strong>Phone:</strong> +91-9733116221 <br />
          <strong>Email:</strong> noumanmolla12@gmail.com <br />
          <strong>Location:</strong> Nalhati, West Bengal, India
        </p>
      </div>

      {/* Right Column */}
      <div style={styles.rightColumn}>
        <h2 style={styles.subheading}>About Me</h2>
        <p style={styles.paragraph}>
          I'm a dedicated and enthusiastic web developer with a Master’s degree in Computer Systems. I specialize in building full-stack web applications using modern technologies.
        </p>
        <p style={styles.paragraph}>
          My professional journey includes freelance work on e-commerce websites and blogs using React and Laravel. I’m currently deepening my backend skills with Spring Boot.
        </p>

        <h2 style={styles.subheading}>🛠 Technical Skills</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Frontend: HTML5, CSS3, JavaScript, React, Redux Toolkit</li>
          <li style={styles.listItem}>Backend: Laravel, Node.js, Spring Boot, JSP & Servlet</li>
          <li style={styles.listItem}>Database: MySQL, MongoDB</li>
          <li style={styles.listItem}>CMS: WordPress</li>
          <li style={styles.listItem}>Programming: OOP</li>
          <li style={styles.listItem}>Languages: English, Hindi, Bengali, German (Basic)</li>
        </ul>

        <h2 style={styles.subheading}>🎨 Hobbies & Interests</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Photography</li>
          <li style={styles.listItem}>Painting</li>
          <li style={styles.listItem}>Currency Collection</li>
        </ul>
      </div>
    </div>
  );
};

export default Author;
