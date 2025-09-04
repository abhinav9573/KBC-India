import React, { useState, useEffect } from 'react';
import { getQuestions } from '../data/questions';

const QuizScreen = ({ settings, onComplete, onRestart }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions(settings.difficulty, settings.topic);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    if (settings.difficulty && settings.topic) {
      loadQuestions();
    }
  }, [settings]);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // Time's up - auto submit with no answer
      handleTimeUp();
    }
  }, [timeLeft, timerActive]);

  // Start timer when question loads
  useEffect(() => {
    if (questions.length > 0 && !loading) {
      setTimeLeft(30);
      setTimerActive(true);
      setSelectedAnswer(null);
    }
  }, [currentQuestionIndex, questions.length, loading]);

  const handleTimeUp = () => {
    setTimerActive(false);
    // If no answer selected, treat as incorrect
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // -1 indicates no answer selected
    }
    handleSubmitAndNext();
  };

  const handleSubmitAndNext = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const result = {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        options: currentQuestion.options,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswer,
        timeLeft: timeLeft,
      };

      const newResults = [...results, result];
      setResults(newResults);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
        setTimerActive(true);
      } else {
        onComplete(newResults);
      }
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return '#10b981';
    if (timeLeft > 10) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Loading Questions...</h2>
        <p>Please wait while we prepare your quiz.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card">
        <h2>No Questions Available</h2>
        <p>Sorry, no questions found for the selected topic and difficulty.</p>
        <button className="start-button" onClick={onRestart}>
          Go Back
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="card">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="quiz-info">
          <p className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <div className="timer-container">
            <div className="timer-circle" style={{ borderColor: getTimerColor() }}>
              <span className="timer-text" style={{ color: getTimerColor() }}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container-vertical">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option-item">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                className="option-radio"
              />
              <label 
                htmlFor={`option-${index}`}
                className={`option-label ${
                  selectedAnswer === index ? 'selected' : ''
                }`}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          <button
            className="start-button"
            onClick={handleSubmitAndNext}
            disabled={selectedAnswer === null}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Submit & Next' : 'Submit & Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
