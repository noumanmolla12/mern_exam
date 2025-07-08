import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchAllQuestions } from "../../features/questionSlice";
import { fetchAllAnswers } from "../../features/answerSlice";
import { submitAnswer } from "../../features/examSlice";
import { v4 as uuidv4 } from "uuid";

const ExamPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topicId } = useParams();
  const location = useLocation();
  const topicName = location.state?.topicName;

  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [examId, setExamId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllAnswers());
  }, [dispatch]);

  const filteredQuestions = questions.filter((q) => q.topic === topicId);

  const getAnswerForQuestion = (questionId) => {
    return answers.find((a) => a.question === questionId);
  };

  const handleOptionChange = (questionId, option, answerObj) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        option,
        answerId: answerObj._id,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!user || !user._id) {
      alert("User not found or not logged in.");
      return;
    }

    const newExamId = uuidv4();

    const answers = Object.entries(selectedAnswers).map(
      ([questionId, { option, answerId }]) => ({
        questionId,
        answerId,
        selectAnswer: option,
      })
    );

    const submissionData = {
      examId: newExamId,
      userId: user._id,
      answers,
    };

    try {
      await dispatch(submitAnswer(submissionData)).unwrap();
      setExamId(newExamId);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit exam. Please try again.");
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#f4f9ff",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    },
    header: {
      backgroundColor: "#3498db",
      color: "#fff",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
      marginBottom: "20px",
    },
    questionBox: {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
    },
    questionText: {
      fontWeight: "600",
      marginBottom: "10px",
    },
    option: {
      marginBottom: "10px",
    },
    label: {
      marginLeft: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
    submitBtn: {
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s",
      display: "block",
      margin: "20px auto",
    },
    disabledBtn: {
      backgroundColor: "#95a5a6",
      cursor: "not-allowed",
    },
    successMsg: {
      color: "#27ae60",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "20px",
    },
    resultLink: {
      textAlign: "center",
      marginTop: "15px",
    },
    linkBtn: {
      display: "inline-block",
      marginTop: "10px",
      backgroundColor: "#2980b9",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>MCQ Exam: {topicName}</h2>

      {filteredQuestions.length === 0 && <p>No questions found for this topic.</p>}

      {filteredQuestions.map((question) => {
        const answerObj = getAnswerForQuestion(question._id);
        if (!answerObj) return null;

        return (
          <div key={question._id} style={styles.questionBox}>
            <div style={styles.questionText}>{question.question_text}</div>
            {["A", "B", "C", "D"].map((optionKey) => (
              <div key={optionKey} style={styles.option}>
                <input
                  type="radio"
                  name={question._id}
                  id={`${question._id}-${optionKey}`}
                  value={optionKey}
                  checked={selectedAnswers[question._id]?.option === optionKey}
                  onChange={() => handleOptionChange(question._id, optionKey, answerObj)}
                />
                <label htmlFor={`${question._id}-${optionKey}`} style={styles.label}>
                  {optionKey}. {answerObj[optionKey]}
                </label>
              </div>
            ))}
          </div>
        );
      })}

      <button
        style={{
          ...styles.submitBtn,
          ...(submitted || Object.keys(selectedAnswers).length !== filteredQuestions.length
            ? styles.disabledBtn
            : {}),
        }}
        onClick={handleSubmit}
        disabled={submitted || Object.keys(selectedAnswers).length !== filteredQuestions.length}
      >
        {submitted ? "Submitted" : "Submit Exam"}
      </button>

      {submitted && (
        <div style={styles.successMsg}>
          ✅ Exam submitted successfully!
          <div style={styles.resultLink}>
            <Link to={`/result/${user._id}`} style={styles.linkBtn}>
              View Result
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
