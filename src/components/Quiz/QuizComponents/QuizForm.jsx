// src/components/QuizForm.js

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questions from "./questions"; // Corrected path
import QuestionComponent from "./QuestionComponent";
import ResultComponent from "./ResultComponent";

const QuizForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Quiz Finished. Data:", { answers, name, email, phone });
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateScore = () => {
    // Filter out non-question answers (like from our forms) before calculating
    const validAnswers = answers.filter((ans, index) => questions[index].options && ans !== null);
    const questionWithOptionsCount = questions.filter(q => q.options).length;

    const totalScore = validAnswers.reduce(
      (acc, val) => (val !== null ? acc + val : acc),
      0
    );
    const maxScore = questionWithOptionsCount * 4; // Max index is 4 (5 options)
    if (maxScore === 0) return 0; // Avoid division by zero
    const normalized = Math.round((10 * totalScore) / maxScore);
    return Math.min(10, Math.max(0, normalized));
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  // Determine if the "Next" button should be disabled
  const isNextDisabled = useCallback(() => {
    const q = questions[currentQuestion];

    // For standard multiple-choice questions
    if (q.options) {
      return answers[currentQuestion] === null;
    }

    // For the custom phone input question
    if (q.type === 'phoneInput') {
      return phone.trim().length < 10;
    }
    
    // For the final contact form
    if (q.type === 'contactForm') {
      return name.trim() === "" || !isValidEmail(email);
    }

    return false;
  }, [currentQuestion, answers, name, email, phone]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <AnimatePresence mode="wait">
        {showResults ? (
          <motion.div
             key="results"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
          >
            <ResultComponent score={calculateScore()} onRetake={handleRetake} />
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <QuestionComponent
              question={questions[currentQuestion]}
              index={currentQuestion}
              total={questions.length}
              answer={answers[currentQuestion]}
              onAnswer={handleAnswer}
      _        onNext={nextQuestion}
              onPrev={prevQuestion}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              isNextDisabled={isNextDisabled()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizForm;