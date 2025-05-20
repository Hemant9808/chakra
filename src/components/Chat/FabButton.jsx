import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

const FabButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/chat")}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#66cc1d] shadow-lg flex items-center justify-center hover:bg-[#4fa30f] transition-colors duration-300"
      aria-label="Open Chat"
    >
      <FaComments className="text-white text-3xl" />
    </button>
  );
};

export default FabButton; 