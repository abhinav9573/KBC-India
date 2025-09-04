import React from 'react';

const ResultsScreen = ({ results, settings, onRestart }) => {
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a true crorepati! 🏆";
    if (percentage >= 70) return "Excellent! You're on your way to becoming a crorepati! 🎉";
    if (percentage >= 50) return "Good job! Keep learning and you'll get there! 👍";
    return "Don't give up! Practice makes perfect! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 70) return "#10b981";
    if (percentage >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="card">
      <h1 className="title">Quiz Results</h1>
      
      <div className="score-container">
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <span className="score-percentage" style={{ color: getScoreColor() }}>
            {percentage}%
          </span>
        </div>
        <h2 className="score-text">
          You scored {correctAnswers} out of {totalQuestions}
        </h2>
        <p className="score-message">{getScoreMessage()}</p>
      </div>

      <div className="results-summary">
        <h3>Quiz Summary</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Topic:</span>
            <span className="stat-value">
              {settings.topic === 'general' ? 'General Knowledge' :
               settings.topic === 'cs' ? 'CS Fundamentals' : 'Database SQL'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Difficulty:</span>
            <span className="stat-value">
              {settings.difficulty?.charAt(0).toUpperCase() + settings.difficulty?.slice(1)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Correct Answers:</span>
            <span className="stat-value correct">{correctAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Incorrect Answers:</span>
            <span className="stat-value incorrect">{totalQuestions - correctAnswers}</span>
          </div>
        </div>
      </div>

      <div className="detailed-results">
        <h3>Question Details</h3>
        <div className="questions-list">
          {results.map((result, index) => (
            <div key={result.questionId} className="question-result">
              <div className="question-number">Q{index + 1}</div>
              <div className="question-status">
                <span className={`status-badge ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  {result.isCorrect ? '✓' : '✗'}
                </span>
                <span className={`status-text ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  {result.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="start-button" onClick={onRestart}>
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
