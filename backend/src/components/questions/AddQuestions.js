import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../features/questionSlice';
import { fetchAllTopics } from '../../features/topicSlice';

const AddQuestion = () => {
  const dispatch = useDispatch();
  const { loading, error, topics } = useSelector((state) => state.topics);

  const [formData, setFormData] = useState({
    topic: '',
    question_text: '',
    // question_image: []
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllTopics());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    /*
    if (e.target.name === 'question_image') {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, question_image: files });
    }
    */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = new FormData();
      questionData.append('topic', formData.topic);
      questionData.append('question_text', formData.question_text);

      /*
      formData.question_image.forEach((file) => {
        questionData.append('question_image[]', file);
      });
      */

      await dispatch(addQuestion(questionData));
      setSuccessMessage('Question added successfully!');

      setFormData({
        topic: '',
        question_text: '',
        // question_image: []
      });
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f8ff',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '30px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#007BFF' }}>Add Question</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '15px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="topic" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
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
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </div>

          {/* File input (commented out)
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="question_image" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Upload Images
            </label>
            <input
              type="file"
              id="question_image"
              name="question_image"
              multiple
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#6c757d' : '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {error && (
            <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
