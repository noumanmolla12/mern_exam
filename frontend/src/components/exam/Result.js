import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserResult } from '../../features/resultSlice';
import { Link } from 'react-router-dom'; // Only if using React Router

const Result = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.result);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?._id) {
      setUserId(storedUser._id);
      setUserName(storedUser.name || 'Student');
      dispatch(fetchUserResult(storedUser._id));
    }
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading results...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>Error: {error}</p>;
  if (!data || !data.results || data.results.length === 0)
    return <p style={{ textAlign: 'center', marginTop: 40 }}>No exam results available.</p>;

  const sortedExams = [...data.results].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9' }}>
      {/* Home Link */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#2980b9', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>

      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: 10 }}>Final Exam Results</h1>
      <p style={{ textAlign: 'center', fontSize: 16 }}>
        Student: <span style={{ fontWeight: 'bold', color: '#2980b9' }}>{userName}</span>
      </p>

      {sortedExams.map((exam, examIndex) => (
        <div
          key={examIndex}
          style={{
            backgroundColor: '#fff',
            margin: '30px auto',
            padding: '25px',
            borderRadius: '12px',
            maxWidth: 800,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
          }}
        >
          {/* <h2 style={{ color: '#16a085', marginBottom: 8 }}>
            {exam.examName || `Exam ID: ${exam.examId}`}
          </h2> */}
          <p style={{ marginBottom: 15, color: '#7f8c8d' }}>
            <strong>Submitted:</strong> {new Date(exam.submittedAt).toLocaleString()}
          </p>

          <div
            style={{
              backgroundColor: '#ecf0f1',
              borderRadius: 8,
              padding: '10px 20px',
              marginBottom: 15,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <p><strong>Total Questions:</strong> {exam.total}</p>
            <p><strong>Correct:</strong> <span style={{ color: '#27ae60' }}>{exam.correct}</span></p>
            <p><strong>Wrong:</strong> <span style={{ color: '#c0392b' }}>{exam.wrong}</span></p>
            <p><strong>Percentage:</strong> {exam.percentage}%</p>
            <p>
              <strong>Status:</strong>{' '}
              <span style={{ color: exam.status === 'Pass' ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                {exam.status}
              </span>
            </p>
          </div>

          <div style={{ borderTop: '1px solid #ddd', paddingTop: 15 }}>
            {exam.details.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#fefefe' : '#f0f9ff',
                  padding: '12px 15px',
                  borderRadius: 6,
                  marginBottom: 10,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ margin: '5px 0' }}>
                  <strong>Q{idx + 1}:</strong> {item.questionText}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Selected:</strong>{' '}
                  <span style={{ color: item.isCorrect ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>
                    {item.selected}
                  </span>
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Correct Answer:</strong> {item.correctAnswer}
                </p>
                <p style={{ margin: '5px 0', fontWeight: 'bold', color: item.isCorrect ? '#2ecc71' : '#e74c3c' }}>
                  {item.isCorrect ? '✔ Correct' : '✘ Wrong'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Result;
