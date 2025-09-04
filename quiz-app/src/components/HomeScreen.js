import React, { useState } from 'react';

const HomeScreen = ({ onStartQuiz }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const topics = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'cs', label: 'CS Fundamentals' },
    { value: 'database', label: 'Database SQL' },
  ];

  const handleStartQuiz = () => {
    if (selectedDifficulty && selectedTopic) {
      onStartQuiz({
        difficulty: selectedDifficulty,
        topic: selectedTopic,
      });
    }
  };

  const isStartEnabled = selectedDifficulty !== null && selectedTopic !== null;

  return (
    <div className="card">
      <h1 className="title">Kaun Banega Crorepati</h1>
      <p className="subtitle">Test your knowledge and win big!</p>

      <div className="selection-group">
        <label className="selection-label">Choose Difficulty Level:</label>
        <div className="options-container">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              className={`option-button ${
                selectedDifficulty === difficulty.value ? 'selected' : ''
              }`}
              onClick={() => setSelectedDifficulty(difficulty.value)}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>

      <div className="selection-group">
        <label className="selection-label">Choose Topic:</label>
        <div className="options-container">
          {topics.map((topic) => (
            <button
              key={topic.value}
              className={`option-button ${
                selectedTopic === topic.value ? 'selected' : ''
              }`}
              onClick={() => setSelectedTopic(topic.value)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="start-button"
        onClick={handleStartQuiz}
        disabled={!isStartEnabled}
      >
        {isStartEnabled ? 'Start Quiz' : 'Select Difficulty & Topic'}
      </button>
    </div>
  );
};

export default HomeScreen;
