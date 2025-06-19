import React, { useState } from "react";

const AgeVerificationPopover = () => {
  const [showPopover, setShowPopover] = useState(true);

  const handleVerify = () => {
    setShowPopover(false);
    // Add your age verification logic here
    console.log("User verified age.");
  };

  const handleCancel = () => {
    setShowPopover(false);
    console.log("User canceled age verification.");
  };

  if (!showPopover) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-2">Are you over 18?</h2>
        <p className="text-gray-600 mb-6 text-sm">
          We must verify this before you proceed to our website due to legal obligations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleVerify}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            VERIFY AGE
          </button>
          <button
            onClick={handleCancel}
            className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationPopover;
