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
  {
    question: "The following are part of an extinguisher except?",
    options: ["Cylinder", "Pin", "Temper seal", "Pen"],
    correctAnswer: "Pen",
  },
  {
    question: "Arsen is a willful act?",
    options: ["Yes", "No", "All of the above", "None of the above"],
    correctAnswer: "Yes",
  },
  {
    question: "During the pacticals what is the acronyms for operating an extingusher?",
    options: ["POSS", "PASS", "PUSH", "None of the above"],
    correctAnswer: "PASS",
  },
  {
    question: "If there is electricity fire which type of extingusher will i use?",
    options: ["Water", "Soap and Water", "Dry Chemical powder(DCP)", "Carbon DioxidePUSH", "None of the above"],
    correctAnswer: "Dry Chemical powder(DCP)",
  },
  {
    question: "if during a fire and am being about to cut off one of the element of fire what will happen to the fire?",
    options: ["The Fire will stop", "grow wide", "Will escalate", "None of the above"],
    correctAnswer: "The Fire will stop",
  },



  // Add remaining questions here...
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(300); // 120 seconds for 2 minutes
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
      }, 60000); // Redirect after 5 seconds
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
      }, 60000); // Redirect after 5 seconds
    }
  };

let scores = score / questions.length * 100

  const sendScore = () => {
    const templateParams = {
      firstName: user.firstName,
      lastName: user.lastName,
      score: scores,
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
        <h1 className="score-section">
        Hi {user.firstName}, Your score is {((score / questions.length) * 100)}%
      </h1>
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
