# Kaun Banega Crorepati - Quiz App

A React-based quiz application featuring multiple-choice questions with timer functionality and persistent high scores.

## Features

### Core Functionality
- **Home Screen**: Choose difficulty level (Easy, Medium, Hard) and topic
- **Topics**: General Knowledge, CS Fundamentals, Database SQL
- **Quiz Interface**: 30-second timer per question with automatic progression
- **Results**: Detailed breakdown with persistent high scores per topic/difficulty

### Technical Features
- **Timer**: 30-second countdown with color-coded visual feedback
- **Auto-progression**: Moves to next question when time expires
- **High Score System**: localStorage-based persistent scoring
- **Responsive Design**: Mobile-friendly interface
- **Real-time Progress**: Visual progress bar and question counter

## Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── HomeScreen.js      # Difficulty & topic selection
│   ├── QuizScreen.js      # Quiz interface with timer
│   └── ResultsScreen.js   # Results & high scores
├── data/
│   ├── questions.json     # Quiz questions database
│   └── questions.js       # Data fetching utilities
└── App.js                 # Main application component
```

## Quiz Flow

1. **Home Screen**: Select difficulty and topic
2. **Quiz**: Answer questions within 30-second time limit
3. **Results**: View score, high score, and detailed breakdown
4. **Restart**: Take another quiz or return to home

## Technologies Used

- **React 18** with functional components and hooks
- **CSS3** with responsive design
- **localStorage** for persistent high scores
- **Modern JavaScript** (ES6+) features

## Features Implemented

✅ **Required Features**
- React functional components with hooks
- State management using useState
- Props-based component communication
- CSS styling and responsive design
- Local data storage (JSON)

✅ **Bonus Features**
- Timer functionality with visual feedback
- Persistent high score system
- Automatic question progression
- Progress tracking and statistics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The app uses Create React App with no additional build tools required. Simply run `npm start` to begin development.
