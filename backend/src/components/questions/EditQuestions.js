import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleQuestion, updateQuestion } from '../../features/questionSlice';
import { fetchAllTopics } from '../../features/topicSlice';

const EditQuestion = () => {
  const dispatch = useDispatch();
  const { loading, error, questions } = useSelector((state) => state.questions);
  const { topics } = useSelector((state) => state.topics);
  const { questionId } = useParams();

  const [formData, setFormData] = useState({
    topic: '',
    question_text: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllTopics());
    if (questionId) {
      dispatch(fetchSingleQuestion(questionId));
    }
  }, [dispatch, questionId]);

  useEffect(() => {
    if (questionId) {
      const selectedQuestion = questions.find((question) => question._id === questionId);
      if (selectedQuestion) {
        setFormData({
          topic: selectedQuestion.topic?._id || selectedQuestion.topic,
          question_text: selectedQuestion.question_text,
        });
      }
    }
  }, [questionId, questions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = new FormData();
      questionData.append('topic', formData.topic);
      questionData.append('question_text', formData.question_text);

      await dispatch(updateQuestion({ questionId, formData: questionData }));
      setSuccessMessage('Question updated successfully!');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        boxSizing: 'border-box',
        paddingLeft:"35px",
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#007bff' }}>Edit Question</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="topic" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Topic
            </label>
            <select
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                backgroundColor: '#f1f1f1',
              }}
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.topic_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="question_text" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Question Name
            </label>
            <input
              type="text"
              id="question_text"
              name="question_text"
              value={formData.question_text}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                backgroundColor: '#fdfdfd',
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {loading ? 'Submitting...' : 'Update Question'}
          </button>

          {error && (
            <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
