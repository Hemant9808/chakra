// src/components/QuestionComponent.js

import React from "react";

const QuestionComponent = ({
  question,
  index,
  total,
  answer,
  onAnswer,
  onNext,
  onPrev,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  isNextDisabled,
}) => {
  return (
    <div>
      <div className="text-center mb-4">
        <img
          src={question.image}
          alt="question illustration"
          className="mx-auto rounded-lg max-h-52 shadow-lg"
        />
      </div>

      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
        {question.question}
      </h2>
      
      {/* Render phone input */}
      {question.type === "phoneInput" && (
        <div className="space-y-4 mb-6">
          <p className="text-center text-gray-600">This helps us connect with you.</p>
          <input
            type="tel"
            placeholder="Your Phone Number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      )}
      
      {/* Render final contact form for name and email */}
      {question.type === "contactForm" && (
        <div className="space-y-4 mb-6">
          <p className="text-center text-gray-600 font-semibold">To get your personalized report, please share your details.</p>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      {/* Render multiple-choice options */}
      {question.options && (
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              className={`w-full p-3 rounded-lg text-left border transition-all duration-200 ${
                answer === i
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50 hover:bg-gray-500 transition-colors"
          disabled={index === 0}
        >
          Previous
        </button>
  _       <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
          disabled={isNextDisabled}
        >
          {index === total - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Note: This is a confidential wellness questionnaire. No physical samples collected.
      </p>
    </div>
  );
};

export default QuestionComponent;