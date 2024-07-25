import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import emailjs from "emailjs-com";

const questions = [
  {
    question: "What is fire?",
    type: "multiple",
    options: [
      "Fire is an irreversable chemical reaction between fuel & oxygen in the presence of heat",
      "Fire is an irreversable chemical reaction in the presence of gold, heat & fuel.",
      "Fire is anything that can burn",
      "All of the above",
    ],
    correctAnswers: ["Fire is an irreversable chemical reaction between fuel & oxygen in the presence of heat"],
  },
  {
    question: "What does a fire extinguisher contain?",
    type: "text",
    correctAnswers: ["Powder"],
  },
  {
    question: "Who is a fire Marshall?",
    type: "multiple",
    options: [
      "The person who is in charge",
      "The person who is responsible to safeguard the safety of the employees",
      "A person that heads a company",
      "None of the above",
    ],
    correctAnswers: ["The person who is responsible to safeguard the safety of the employees"],
  },
  {
    question: "The following are part of an extinguisher except one?",
    type: "multiple",
    options: [
      "Safety pin, tamper seal, body plate, cylinder, discharge hose",
      "pick, iron, seal, pipe, coast",
      "pin, tamper seal, plate, corn",
      "None of the above",
    ],
    correctAnswers: ["Safety pin, tamper seal, body plate, cylinder, discharge hose"],
  },
  {
    question: "What is the full meaning of the word PASS?",
    type: "multiple",
    options: [
      "Pull, insert, inject, press",
      "Pull the pin, Aim at the pass, squeeze the level, spread side by side",
      "All of the above",
      "None of the above",
    ],
    correctAnswers: ["Pull the pin, Aim at the pass, squeeze the level, spread side by side"],
  },
  {
    question: "During electrical fire which of this is suitable for the fire?",
    type: "multiple",
    options: [
      "Carbon dioxide",
      "Dry chemical powder(DCP)",
      "Water extinguisher",
      "All of the above",
    ],
    correctAnswers: ["Dry chemical powder(DCP)"],
  },
  {
    question: "During fire if one component or element is cut off what happens to the fire?",
    type: "multiple",
    options: [
      "The fire becomes much",
      "The fire stops",
      "The fire spreads",
      "All of the above",
    ],
    correctAnswers: ["The fire stops"],
  },
  {
    question: "The word SIT in fire terms means what?",
    type: "multiple",
    options: [
      "Where the fire starts",
      "Where the fire is sitting",
      "The original fire",
      "None of the above",
    ],
    correctAnswers: ["Where the fire starts"],
  },
  {
    question: "What are the two commonly used type of extinguisher?",
    type: "text",
    correctAnswers: ["dry chemical powder & co2", "dcp & co2", "dry chemical powder & carbon dioxide", "dcp & carbon dioxide"],
  },
  {
    question: "___ ____ & ____ causes fire?",
    type: "multiple",
    options: [
      "Carelesness, Accident & Matches",
      "Accident, Willful act & boys",
      "Oxygen, Heat & Fuel",
      "All of the above",
    ],
    correctAnswers: ["Carelesness, Accident & Matches"],
  },
  {
    question: "___ ___ & ___ are components of fire?",
    type: "multiple",
    options: [
      "Oxygen, Heat & Table",
      "Table, Magnet & Matches",
      "Oxygen, Heat & Fuel",
      "All of the above",
    ],
    correctAnswers: ["Oxygen, Heat & Fuel"],
  },
  {
    question: "What are the two commonly used type of extinguisher?",
    type: "text",
    correctAnswers: ["dry chemical powder & co2", "dcp & co2", "dry chemical powder & carbon dioxide", "dcp & carbon dioxide"],
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
    question: "___ ___ & ___ are sources of fire?",
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
    question: "What are the fire fiighting equipments used during demonstration?",
    type: "multiple",
    options: [
      "Fire extinguisher, Fire blanket & Fire bucket",
      "Gun, Blade & Matchet",
      "Water, Bread & Sand",
      "None of the Above",
    ],
    correctAnswers: ["Fire extinguisher, Fire blanket & Fire bucket"],
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
  {
    question: "Was this training educative?",
    type: "multiple",
    options: [
      "Yes",
      "No",
      "All of the above",
      "None of the avove",
    ],
    correctAnswers: ["Yes"],
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
      }, 100000); // Redirect after 5 seconds
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
      sendScore()
      setTimeout(() => {
        // Mark user as having completed the test
        user.completed = true;
        localStorage.setItem(userId, JSON.stringify(user));
        // Navigate to sign-in page
        navigate("/signin");
      }, 100000); // Redirect after 5 seconds
    }
  };

  

  const sendScore = () => {
    const templateParams = {
      firstName: user.firstName,
      lastName: user.lastName,
      score: scorePercentage,
    };
    emailjs
      .send("service_yta2omc", "template_diiuypm", templateParams, "NVWsjfY94u8ldeolg")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email. Error: ", err);
      });
  };

  const totalMarks = questions.length * 5;
  const scorePercentage = (score / totalMarks) * 100;

  const handleOptionClick = (option, index) => {
    const currentQuestionData = questions[currentQuestion];
    const isCorrect = currentQuestionData.correctAnswers.includes(option);

    if (isCorrect) {
      setScore(score + 5); // 5 marks per question
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
      sendScore()
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
         You scored ({scorePercentage}%)
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