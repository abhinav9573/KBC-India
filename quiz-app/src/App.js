import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [appState, setAppState] = useState('home');
  const [quizSettings, setQuizSettings] = useState({
    difficulty: null,
    topic: null,
  });
  const [quizResults, setQuizResults] = useState([]);

  const handleStartQuiz = (settings) => {
    setQuizSettings(settings);
    setAppState('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setAppState('results');
  };

  const handleRestart = () => {
    setQuizSettings({ difficulty: null, topic: null });
    setQuizResults([]);
    setAppState('home');
  };

  const renderCurrentScreen = () => {
    switch (appState) {
      case 'home':
        return <HomeScreen onStartQuiz={handleStartQuiz} />;
      case 'quiz':
        return (
          <QuizScreen
            settings={quizSettings}
            onComplete={handleQuizComplete}
            onRestart={handleRestart}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            results={quizResults}
            settings={quizSettings}
            onRestart={handleRestart}
          />
        );
      default:
        return <HomeScreen onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="container">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
