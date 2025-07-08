import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAnswers, deleteAnswer } from '../../features/answerSlice';
import { fetchAllQuestions } from '../../features/questionSlice';
import { Link } from 'react-router-dom';

const ViewAnswer = () => {
  const dispatch = useDispatch();
  const { loading, error, answers } = useSelector((state) => state.answers);
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchAllAnswers());
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const handleDelete = (answerId) => {
    dispatch(deleteAnswer(answerId));
  };

  const getQuestionName = (questionId) => {
    const question = questions?.find((q) => q._id === questionId);
    return question ? question.question_text : 'Question Not Found';
  };

  return (
    <div
      style={{
        padding: '30px 20px',
        maxWidth: '1200px',
        margin: 'auto',
        fontFamily: 'Segoe UI, sans-serif',
        paddingLeft:"250px",
      }}
    >
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
            fontWeight: '600',
          }}
        >
          Answer List
        </h2>

        {loading && <div style={{ textAlign: 'center', color: '#0d6efd' }}>Loading...</div>}
        {error && <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>}

        {answers && answers.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <th style={thStyle}>Question</th>
                  <th style={thStyle}>Answer A</th>
                  <th style={thStyle}>Answer B</th>
                  <th style={thStyle}>Answer C</th>
                  <th style={thStyle}>Answer D</th>
                  <th style={thStyle}>Correct Answer</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer, index) => (
                  <tr
                    key={answer._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#fff',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                  >
                    <td style={tdStyle}>{getQuestionName(answer.question)}</td>
                    <td style={tdStyle}>{answer.A}</td>
                    <td style={tdStyle}>{answer.B}</td>
                    <td style={tdStyle}>{answer.C}</td>
                    <td style={tdStyle}>{answer.D}</td>
                    <td style={{ ...tdStyle, fontWeight: 'bold', color: '#198754' }}>
                      {answer.correct_answer}
                    </td>
                    <td style={tdStyle}>
                      <Link
                        to={`/admindashboard/edit-answer/${answer._id}`}
                        style={{
                          backgroundColor: '#0d6efd',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          textDecoration: 'none',
                          marginRight: '8px',
                          display: 'inline-block',
                        }}
                      >
                        Edit
                      </Link>
                     <button
  onClick={() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this answer?");
    if (confirmDelete) {
      handleDelete(answer._id);
    }
  }}
  style={{
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
  }}
>
  Delete
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            No answers found
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px 10px',
  textAlign: 'left',
  fontSize: '14px',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '10px',
  fontSize: '14px',
  verticalAlign: 'top',
};

export default ViewAnswer;
