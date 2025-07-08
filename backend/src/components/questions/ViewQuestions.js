import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions, deleteQuestion } from '../../features/questionSlice';
import { fetchAllTopics } from '../../features/topicSlice';
import { Link } from 'react-router-dom';
import { selectImagePath } from '../../features/globalpaths';

const QuestionView = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);

  const { loading, error, questions } = useSelector((state) => state.questions);
  const { topics } = useSelector((state) => state.topics);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllTopics());
  }, [dispatch]);

  const handleDelete = (questionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (confirmDelete) {
      dispatch(deleteQuestion(questionId));
    }
  };

  const getTopicName = (topicId) => {
    const topic = topics.find((cat) => cat._id === topicId);
    return topic ? topic.topic_name : 'Topic Not Found';
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 10px',
        paddingLeft:"20px",
        backgroundColor: '#f4f6fa',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Question List</h2>

        {loading && <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>}
        {error && <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>}

        {questions && questions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#e3f2fd', color: '#000' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Topic</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Question</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question._id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{getTopicName(question.topic)}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{question.question_text}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <Link
                        to={`/admindashboard/edit-question/${question._id}`}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#42a5f5',
                          color: '#fff',
                          borderRadius: '5px',
                          textDecoration: 'none',
                          marginRight: '8px',
                          fontSize: '14px',
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(question._id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ef5350',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '14px',
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
          <div style={{ textAlign: 'center', color: '#777', marginTop: '20px' }}>No questions found</div>
        )}
      </div>
    </div>
  );
};

export default QuestionView;
