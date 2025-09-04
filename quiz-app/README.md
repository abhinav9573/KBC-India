# Kaun Banega Crorepati - Quiz App

A React-based interactive quiz application inspired by the popular Indian game show "Kaun Banega Crorepati". Test your knowledge across different topics and difficulty levels!

## Features

- **Multiple Topics**: General Knowledge, CS Fundamentals, Database SQL
- **Difficulty Levels**: Easy, Medium, Hard
- **Interactive Quiz**: One question at a time with 4 options
- **Score Tracking**: Real-time score calculation
- **Results Summary**: Detailed results with correct/incorrect answers
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard
2. **Choose Topic**: Pick from General Knowledge, CS Fundamentals, or Database SQL
3. **Start Quiz**: Click "Start Quiz" to begin
4. **Answer Questions**: Select your answer and click "Submit Answer"
5. **View Results**: See your final score and detailed results
6. **Play Again**: Click "Take Another Quiz" to start over

## Project Structure

```
src/
├── components/
│   ├── HomeScreen.tsx      # Difficulty and topic selection
│   ├── QuizScreen.tsx      # Quiz interface
│   └── ResultsScreen.tsx   # Results display
├── data/
│   └── questions.ts        # Sample questions database
├── App.tsx                 # Main application component
├── index.tsx              # Application entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** with TypeScript
- **React Hooks** (useState, useEffect)
- **CSS3** with modern features (Grid, Flexbox, Gradients)
- **Responsive Design** for mobile compatibility

## Sample Questions

The app includes 45 sample questions across all topics and difficulty levels:
- **General Knowledge**: 15 questions (5 per difficulty)
- **CS Fundamentals**: 15 questions (5 per difficulty)  
- **Database SQL**: 15 questions (5 per difficulty)

## Future Enhancements

- Timer per question
- Progress indicator
- Persistent high scores
- More topics and questions
- API integration with Open Trivia DB
- Sound effects and animations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
