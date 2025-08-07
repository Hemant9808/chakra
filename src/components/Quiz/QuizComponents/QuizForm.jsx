import React, { useState } from "react";

const questions = [
  {
    question: "What brought you to us today?",
    image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
    options: [
      "Erection problems",
      "Ejaculation problems",
      "Sexual urge problems",
      "Size problems",
      "I don’t know, I’m just not feeling it",
    ],
  },
  {
    question: "How long have you been facing this issue?",
    image: "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
    options: [
      "A few weeks",
      "2-3 months",
      "Over 6 months",
      "Over a year",
      "Since the beginning",
    ],
  },
  {
    question: "How frequently do you have sex?",
    image: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    options: [
      "More than 4 times a week",
      "2-4 times a week",
      "Once a week",
      "Once in 2-3 weeks",
      "I don't remember",
    ],
  },
  {
    question: "How confident are you in bed?",
    image: "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
    options: [
      "Very confident",
      "Somewhat confident",
      "Neutral",
      "Not confident",
      "I avoid it",
    ],
  },
  {
    question: "What do you think is the main cause of the issue?",
    image: "https://media.giphy.com/media/l41YdAH8JbPEN0LLO/giphy.gif",
    options: [
      "Stress",
      "Workload",
      "Lifestyle",
      "Lack of sleep",
      "No idea",
    ],
  },
  {
    question: "Are you currently taking any medication or supplements?",
    image: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif",
    options: [
      "No",
      "Yes, allopathy",
      "Yes, Ayurvedic",
      "Yes, homeopathy",
      "Yes, other",
    ],
  },
  {
    question: "Do you consume alcohol, tobacco, or smoke?",
    image: "https://media.giphy.com/media/3o6Mbcj5Cj0P5EJxX2/giphy.gif",
    options: [
      "None of them",
      "Alcohol only",
      "Smoke only",
      "Both alcohol and smoke",
      "All of them regularly",
    ],
  },
  {
    question: "How is your sleep quality?",
    image: "https://media.giphy.com/media/l2JhBtz3dlKFV0WEo/giphy.gif",
    options: [
      "Very good",
      "Good",
      "Fair",
      "Poor",
      "Very poor",
    ],
  },
  {
    question: "Do you experience any of the following?",
    image: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
    options: [
      "Fatigue",
      "Low confidence",
      "Stress",
      "All of them",
      "None",
    ],
  },
  {
    question: "How would you describe your lifestyle?",
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    options: [
      "Very active",
      "Moderately active",
      "Balanced",
      "Sedentary",
      "Very inactive",
    ],
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
            {/* Question Image */}
            <div className="text-center mb-4">
              <img
                src={questions[currentQuestion].image}
                alt="Question Visual"
                className="mx-auto max-h-48 rounded"
              />
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
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

            {/* Navigation Buttons */}
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

            {/* Informational Note */}
            <p className="mt-8 text-center text-xs text-gray-500">
              Note : Our wellness tests are interactive, confidential questionnaires designed to
              provide users with insights and personalized advice about sexual wellbeing.
              No physical samples are collected, and all reports are generated instantly
              based on your responses.
            </p>
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
