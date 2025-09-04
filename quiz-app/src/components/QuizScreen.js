import React, { useState, useEffect } from 'react';
import { getQuestions } from '../data/questions';

const QuizScreen = ({ settings, onComplete, onRestart }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const result = {
        questionId: currentQuestion.id,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswer,
      };

      const newResults = [...results, result];
      setResults(newResults);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        onComplete(newResults);
      }
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswered(true);
    }
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
        <p className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                isAnswered && index === currentQuestion.correctAnswer ? 'correct' : ''
              } ${
                isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          {!isAnswered ? (
            <button
              className="start-button"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="start-button"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
