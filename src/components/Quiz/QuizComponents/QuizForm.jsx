import React, { useState } from "react";

const questions = [
  {
    question: "How often do you experience low libido?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
  },
  {
    question: "Do you face difficulties in maintaining an erection?",
    options: ["Never", "Occasionally", "Frequently", "Always"],
  },
  {
    question: "How often do you feel fatigued without any reason?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question: "Do you feel stressed or anxious frequently?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
  },
  {
    question: "How would you rate your overall sexual satisfaction?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "Do you have trouble sleeping or staying asleep?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question: "Have you noticed a decrease in your testosterone levels?",
    options: ["No", "Mild", "Moderate", "Severe"],
  },
  {
    question: "How often do you engage in physical exercise?",
    options: ["Daily", "3-4 times a week", "Rarely", "Never"],
  },
  {
    question: "Do you consume a balanced diet with essential nutrients?",
    options: ["Always", "Mostly", "Sometimes", "Never"],
  },
  {
    question: "Have you experienced any mood swings or irritability?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
  },
];

const QuizForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const score = answers.reduce((acc, curr) => (curr !== null ? acc + curr : acc), 0);
    if (score < 10) return "Great! You seem to have good sexual wellness.";
    if (score < 20) return "Moderate. You might need to focus on better habits.";
    return "Low. Consider consulting a professional for guidance.";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {!showResults ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 text-left rounded-lg border ${
                    answers[currentQuestion] === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  } hover:bg-blue-300`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevQuestion}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Results</h2>
            <p className="mt-4 text-lg">{calculateResults()}</p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers(Array(questions.length).fill(null));
                setShowResults(false);
              }}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
