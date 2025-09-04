import React, { useState, useEffect } from 'react';

const ResultsScreen = ({ results, settings, onRestart }) => {
  const [highScore, setHighScore] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem(`highScore_${settings.topic}_${settings.difficulty}`);
    const currentHighScore = savedHighScore ? JSON.parse(savedHighScore) : null;
    
    setHighScore(currentHighScore);
    
    // Check if this is a new high score
    if (!currentHighScore || percentage > currentHighScore.percentage) {
      const newHighScore = {
        percentage,
        correctAnswers,
        totalQuestions,
        topic: settings.topic,
        difficulty: settings.difficulty,
        date: new Date().toLocaleDateString(),
        timeStamp: Date.now()
      };
      
      localStorage.setItem(`highScore_${settings.topic}_${settings.difficulty}`, JSON.stringify(newHighScore));
      setHighScore(newHighScore);
      setIsNewHighScore(true);
    }
  }, [results, settings, percentage, correctAnswers, totalQuestions]);

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

  const getTopicName = (topic) => {
    switch(topic) {
      case 'general': return 'General Knowledge';
      case 'cs': return 'CS Fundamentals';
      case 'database': return 'Database SQL';
      default: return topic;
    }
  };

  const getDifficultyName = (difficulty) => {
    return difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1);
  };

  return (
    <div className="card">
      <h1 className="title">Quiz Results</h1>
      
      {isNewHighScore && (
        <div className="high-score-banner">
          <span className="high-score-icon">🏆</span>
          <span className="high-score-text">New High Score!</span>
        </div>
      )}
      
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
              {getTopicName(settings.topic)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Difficulty:</span>
            <span className="stat-value">
              {getDifficultyName(settings.difficulty)}
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
          {highScore && (
            <div className="stat-item high-score-item">
              <span className="stat-label">High Score:</span>
              <span className="stat-value high-score-value">
                {highScore.percentage}% ({highScore.correctAnswers}/{highScore.totalQuestions})
              </span>
            </div>
          )}
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

      <div className="detailed-question-breakdown">
        <h3>Question Breakdown</h3>
        <div className="question-breakdown-list">
          {results.map((result, index) => (
            <div key={result.questionId} className="question-breakdown-item">
              <div className="question-header">
                <h4 className="question-title">Question {index + 1}</h4>
                <div className={`question-score ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  {result.isCorrect ? '+1' : '0'}
                </div>
              </div>
              
              <div className="question-content">
                <p className="question-text-breakdown">{result.question}</p>
                
                <div className="answer-summary">
                  <div className="answer-details">
                    <span className="detail-label">Your Answer:</span>
                    <span className={`detail-value ${result.selectedAnswer === result.correctAnswer ? 'correct' : 'incorrect'}`}>
                      {result.selectedAnswer !== -1 
                        ? `${String.fromCharCode(65 + result.selectedAnswer)}. ${result.options[result.selectedAnswer]}`
                        : 'No answer selected'
                      }
                    </span>
                  </div>
                  <div className="answer-details">
                    <span className="detail-label">Correct Answer:</span>
                    <span className="detail-value correct">
                      {String.fromCharCode(65 + result.correctAnswer)}. {result.options[result.correctAnswer]}
                    </span>
                  </div>
                </div>
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
