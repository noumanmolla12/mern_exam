import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../../features/answerSlice';
import { fetchAllQuestions } from '../../features/questionSlice';

const AddAnswer = () => {
  const dispatch = useDispatch();
  const { loading, error, questions } = useSelector((state) => state.questions);

  const [formData, setFormData] = useState({
    question: '',
    A: '',
    B: '',
    C: '',
    D: '',
    correct_answer: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const answerData = new FormData();
      answerData.append('question', formData.question);
      answerData.append('A', formData.A);
      answerData.append('B', formData.B);
      answerData.append('C', formData.C);
      answerData.append('D', formData.D);
      answerData.append('correct_answer', formData.correct_answer);

      await dispatch(addAnswer(answerData));
      setSuccessMessage('Answer added successfully!');
      setFormData({
        question: '',
        A: '',
        B: '',
        C: '',
        D: '',
        correct_answer: '',
      });
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f9ff',
        padding: '20px',
        paddingLeft:"20px",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#ffffff',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px' }}>
          Add Answer
        </h2>

        {successMessage && (
          <div
            style={{
              background: '#d4edda',
              color: '#155724',
              padding: '10px 15px',
              borderRadius: '6px',
              marginBottom: '15px',
              border: '1px solid #c3e6cb',
              textAlign: 'center',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {[
            {
              label: 'Question',
              type: 'select',
              id: 'question',
              options: questions,
              name: 'question',
            },
            { label: 'Answer A', id: 'A', name: 'A' },
            { label: 'Answer B', id: 'B', name: 'B' },
            { label: 'Answer C', id: 'C', name: 'C' },
            { label: 'Answer D', id: 'D', name: 'D' },
            {
              label: 'Correct Answer',
              type: 'select',
              id: 'correct_answer',
              name: 'correct_answer',
              options: [
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
              ],
            },
          ].map((field, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <label htmlFor={field.id} style={{ display: 'block', marginBottom: '6px', color: '#34495e', fontWeight: 500 }}>
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) =>
                    typeof option === 'object' && option._id ? (
                      <option key={option._id} value={option._id}>
                        {option.question_text}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  id={field.id}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                  }}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {error && (
            <div style={{ marginTop: '15px', color: 'red', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAnswer;
