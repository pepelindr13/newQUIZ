import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const questions = [
  {
    question: "What is fire?",
    type: "text",
    correctAnswers: ["fire is an irreversible chemical reaction"],
  },
  {
    question: "What is EAP?",
    type: "text",
    correctAnswers: ["Emergency action plan"],
  },
  {
    question: "Who is a fire Marshall?",
    type: "text",
    correctAnswers: ["A fire marshall is a person who is responsible for safeguarding the employees"],
  },
  {
    question: "Name parts of a fire extinguisher you know.",
    type: "text",
    correctAnswers: ["Tamper Seal", "Cylinder", "Discharge Hose", "discharge horn", "Handle", "Valve", "Safety pin", "Safety cap", "Safety ring"],
  },
  {
    question: "What are the two commonly used type of extinguisher?",
    type: "text",
    correctAnswers: ["dry chemical powder and co2", "dcp and co2", "dry chemical powder and carbon dioxide", "dcp and carbon dioxide"],
  },
  {
    question: "___ ____ and ____ causes fire?",
    type: "multiple",
    options: [
      "Carelesness, Accident and Matches",
      "Accident, Willful act and boys",
      "Oxygen, Heat and Fuel",
      "All of the above",
    ],
    correctAnswers: ["Carelesness, Accident and Matches"],
  },
  {
    question: "___ ___ and ___ are components of fire?",
    type: "multiple",
    options: [
      "Oxygen, Heat and Table",
      "Table, Magnet and Matches",
      "Oxygen, Heat and Fuel",
      "All of the above",
    ],
    correctAnswers: ["Oxygen, Heat and Fuel"],
  },
  {
    question: "The following are classes of fire except?",
    type: "multiple",
    options: [
      "Class A",
      "Class B",
      "Class M",
      "Class C",
    ],
    correctAnswers: ["Class M"],
  },
  {
    question: "The following are firefighting equipments one should have in a workplace except?",
    type: "multiple",
    options: [
      "Fire extinguisher",
      "Smoke detector",
      "Car",
      "Maner call point(MCP)",
    ],
    correctAnswers: ["Car"],
  },
  {
    question: "___ ___ and ___ are sources of fire?",
    type: "multiple",
    options: [
      "Solid fuel, Liquid fuel, Gaseous fuel",
      "Hard fuel, Liquid fuel, Gaseous fuel",
      "Solid fuel, Soft fuel, Gaseous fuel",
      "All of the above",
    ],
    correctAnswers: ["Solid fuel, Liquid fuel, Gaseous fuel"],
  },
  {
    question: "What is the acronym for operating an extinguisher?",
    type: "multiple",
    options: [
      "POSS",
      "BOOK",
      "PASS",
      "COIN",
    ],
    correctAnswers: ["PASS"],
  },
  {
    question: "What is the meaning of the word PASS?",
    type: "text",
    correctAnswers: ["Pull, Aim, Squeeze, Sweep"],
  },
  {
    question: "What are the fire fiighting equipments used during demonstration?",
    type: "multiple",
    options: [
      "Fire extinguisher, Fire blanket and Fire bucket",
      "Gun, Blade and Matchet",
      "Water, Bread and Sand",
      "None of the Above",
    ],
    correctAnswers: ["Fire extinguisher, Fire blanket and Fire bucket"],
  },
  {
    question: "What are you to look out for when fighting fire?",
    type: "multiple",
    options: [
      "Direction of the wind",
      "Color of the fire",
      "Beauty of the fire",
      "All of the Above",
    ],
    correctAnswers: ["Direction of the wind"],
  },
  {
    question: "What is the emergency number to call for emergencies?",
    type: "multiple",
    options: [
      "09000000000",
      "GLO",
      "MTN",
      "08032003557",
    ],
    correctAnswers: ["08032003557"],
  },
  // Add more questions here...
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(300); // 5 minutes
  const [userAnswer, setUserAnswer] = useState(""); // State for text input answers
  const [flashButton, setFlashButton] = useState(null); // To keep track of the button being flashed
  const [flashColor, setFlashColor] = useState(""); // To track the color of the flash
  const navigate = useNavigate();
  const userId = localStorage.getItem("currentUserId");
  const user = JSON.parse(localStorage.getItem(userId));

  useEffect(() => {
    if (time === 0) {
      setShowScore(true);
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 10000); // Redirect after 5 seconds
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, navigate, userId, user]);

  const handleAnswerSubmit = () => {
    if (questions[currentQuestion].correctAnswers.includes(userAnswer.trim().toLowerCase())) {
      setScore(score + 1); // 10 marks per question
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setUserAnswer(""); // Reset the input field
    } else {
      setShowScore(true);
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 10000); // Redirect after 5 seconds
    }
  };

  const handleOptionClick = (option, index) => {
    const currentQuestionData = questions[currentQuestion];
    const isCorrect = currentQuestionData.correctAnswers.includes(option);

    if (isCorrect) {
      setScore(score + 1); // 10 marks per question
      setFlashColor("flash-correct");
    } else {
      setFlashColor("flash-incorrect");
    }

    // Flash the button by setting its index and color
    setFlashButton(index);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 5000); // Redirect after 5 seconds
    }

    // Reset flash after animation
    setTimeout(() => {
      setFlashButton(null);
      setFlashColor(""); // Reset flash color
    }, 500); // Match the duration of the flash animation
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <h1 className="score-section text-light">
          Hi {user.firstName}, Your score is {score} out of {questions.length}
        </h1>
      ) : (
        <>
          <div className="timer text-danger fw-bolder">Time Remaining: {time}s</div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].type === "text" ? (
              <>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="answer-input"
                />
                <div className="mt-2">
                <button onClick={handleAnswerSubmit} className="btn btn-danger submit-answer">
                  Submit Answer
                </button>
                </div>
              </>
            ) : (
              <ol type="A">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      className={`option-button ${flashButton === index ? flashColor : ""}`}
                      onClick={() => handleOptionClick(option, index)}
                    >
                      <span className="option-label">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
