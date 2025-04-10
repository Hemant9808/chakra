import React from "react";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyles = "px-4 py-2 font-medium rounded-lg transition";
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
