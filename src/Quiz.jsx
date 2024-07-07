import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Quiz.css";

const questions = [
  {
    question: "What is fire?",
    options: [
      "fire is a chemical reaction involving two or more electment to produce heat and fire",
      "fire is any thing that can burn",
      "Fire is a burn sensation.",
      "all of the above",
    ],
    correctAnswer:
      "fire is a chemical reaction involving two or more electment to produce heat and fire",
  },
  {
    question: "what are the most commonly types of fire extingusher?",
    options: [
      "Sand,Sodium",
      "Carbon Dioxide, Dry chemical powder,Fume",
      "All of the above",
      "Carbon Dioxide sodium",
    ],
    correctAnswer: "Carbon Dioxide, Dry chemical powder,Fume",
  },
  {
    question: "What are the elements involve in traiangle of fire?",
    options: [
      "Oxygen,Heat and Table",
      "Table,Chair and Matches",
      "Oxygen,Heat and Fuel",
      "All of the above",
    ],
    correctAnswer: "Oxygen,Heat and Fuel",
  },
  {
    question: "The following are the cause of fire except?",
    options: ["Accident", "Carelessness", "Arsen", "None of the above"],
    correctAnswer: "None of the above",
  },
  {
    question: "When there is fire, what does an individual use to fight?",
    options: ["Broom", "Carton", "Cloth", "Extinguishers"],
    correctAnswer: "Extinguishers",
  },
  // Add remaining questions here...
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(120); // 120 seconds for 2 minutes
  const navigate = useNavigate();
  const userId = localStorage.getItem("currentUserId");
  const user = JSON.parse(localStorage.getItem(userId));

  useEffect(() => {
    if (time === 0) {
      setShowScore(true);
      sendScore();
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 5000); // Redirect after 5 seconds
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, navigate, userId, user]);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      sendScore();
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 5000); // Redirect after 5 seconds
    }
  };

  const sendScore = () => {
    const templateParams = {
      firstName: user.firstName,
      lastName: user.lastName,
      score: score,
    };

    emailjs.send('service_yta2omc', 'template_diiuypm', templateParams, 'NVWsjfY94u8ldeolg')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email. Error: ', err);
      });
  };


  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="timer">Time Remaining: {time}s</div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            <ol type="A">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <button
                    className="w-100"
                    onClick={() => handleAnswerOptionClick(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
