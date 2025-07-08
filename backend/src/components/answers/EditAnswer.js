import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleAnswer, updateAnswer } from '../../features/answerSlice';
import { fetchAllQuestions } from '../../features/questionSlice';

const EditAnswer = () => {
  const dispatch = useDispatch();
  const { loading, error, answers } = useSelector((state) => state.answers);
  const { questions } = useSelector((state) => state.questions);
  const { answerId } = useParams();

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
    if (answerId) {
      dispatch(fetchSingleAnswer(answerId));
    }
  }, [dispatch, answerId]);

  useEffect(() => {
    if (answerId && answers.length > 0) {
      const selectedAnswer = answers.find((answer) => answer._id === answerId);
      if (selectedAnswer) {
        setFormData({
          question: selectedAnswer.question?._id || selectedAnswer.question,
          A: selectedAnswer.A || '',
          B: selectedAnswer.B || '',
          C: selectedAnswer.C || '',
          D: selectedAnswer.D || '',
          correct_answer: selectedAnswer.correct_answer || '',
        });
      }
    }
  }, [answerId, answers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      await dispatch(updateAnswer({ answerId, formData: answerData }));
      setSuccessMessage('Answer updated successfully!');
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#f0f4f8',
        minHeight: '100vh',
        paddingLeft:"20px",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '25px',
            color: '#333',
          }}
        >
          Edit Answer
        </h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '10px 15px',
              borderRadius: '6px',
              marginBottom: '15px',
              border: '1px solid #c3e6cb',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Question Select */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="question" style={{ fontWeight: 'bold' }}>
              Question
            </label>
            <select
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
              }}
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            >
              <option value="">Select Question</option>
              {questions.map((question) => (
                <option key={question._id} value={question._id}>
                  {question.question_text}
                </option>
              ))}
            </select>
          </div>

          {/* Answer Inputs */}
          {['A', 'B', 'C', 'D'].map((letter) => (
            <div key={letter} style={{ marginBottom: '15px' }}>
              <label htmlFor={letter} style={{ fontWeight: 'bold' }}>
                Answer {letter}
              </label>
              <input
                type="text"
                id={letter}
                name={letter}
                value={formData[letter]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                }}
              />
            </div>
          ))}

          {/* Correct Answer */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="correct_answer" style={{ fontWeight: 'bold' }}>
              Correct Answer
            </label>
            <select
              id="correct_answer"
              name="correct_answer"
              value={formData.correct_answer}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
              }}
            >
              <option value="">Select Correct Answer</option>
              {['A', 'B', 'C', 'D'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Updating...' : 'Update Answer'}
          </button>

          {error && (
            <div style={{ color: 'red', marginTop: '15px' }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditAnswer;
