import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css'; // Import the CSS file

const questions = [
    {
        question: "What is fire?",
        options: ["fire is a chemical reaction involving two or more electment to produce heat and fire", "fire is any thing that can burn", "Fire is a burn sensation.", "all of the above"],
        correctAnswer: "fire is a chemical reaction involving two or more electment to produce heat and fire"
      },
      {
        question: "what are the most commonly types of fire extingusher?",
        options: ["Sand,Sodium", "Carbon Dioxide, Dry chemical powder,Fume", "All of the above", "Carbon Dioxide sodium"],
        correctAnswer: "Carbon Dioxide, Dry chemical powder,Fume"
      },
      {
        question: 'What are the elements involve in traiangle of fire?',
        options: ['Oxygen,Heat and Table', 'Table,Chair and Matches', 'Oxygen,Heat and Fuel', 'All of the above'],
        correctAnswer: 'Oxygen,Heat and Fuel'
      },
      {
        question: 'The following are the cause of fire except?',
        options: ['Accident', 'Carelessness', 'Arsen', 'None of the above'],
        correctAnswer: 'None of the above',
      },
      {
        question: 'When there is fire, what does an individual use to fight?',
        options: ['Broom', 'Carton', 'Cloth', 'Extinguishers'],
        correctAnswer: 'Extinguishers',
      }
  // Add remaining questions here...
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [time, setTime] = useState(20); // 120 seconds for 2 minutes
    const navigate = useNavigate();
    const userId = localStorage.getItem('currentUserId');
  
    useEffect(() => {
      if (time === 0) {
        setShowScore(true);
        setTimeout(() => {
          // Mark user as having completed the test
          const user = JSON.parse(localStorage.getItem(userId));
          user.completed = true;
          localStorage.setItem(userId, JSON.stringify(user));
          // Navigate to sign-in page
          navigate('/signin');
        }, 5000); // Redirect after 5 seconds
        return;
      }
  
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [time, navigate, userId]);
  
    const handleAnswerOptionClick = (option) => {
      if (option === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
        setTimeout(() => {
          // Mark user as having completed the test
          const user = JSON.parse(localStorage.getItem(userId));
          user.completed = true;
          localStorage.setItem(userId, JSON.stringify(user));
          // Navigate to sign-in page
          navigate('/signin');
        }, 5000); // Redirect after 5 seconds
      }
    };
  
    const handleLogout = () => {
      // Mark user as having completed the test
      const user = JSON.parse(localStorage.getItem(userId));
      user.completed = true;
      localStorage.setItem(userId, JSON.stringify(user));
      // Navigate to sign-in page
      navigate('/signin');
    };
  
    return (
      <div className="quiz-container">
        <div className="timer">
          Time remaining: {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        {showScore ? (
          <div className="score-section fw-bold">
            You scored {score} out of {questions.length}
            <p>You will be redirected to the sign-in page in 5 seconds...</p>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text fw-bold">{questions[currentQuestion].question}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

export default Quiz;
