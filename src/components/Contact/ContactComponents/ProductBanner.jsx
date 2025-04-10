import React from "react";

const ProductBanner = () => {
  return (
    <div className="bg-cream min-h-[400px] flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-brown mb-4">
            A network of experts to answer
            <br /> your wellness-related questions.
          </h2>
          <p className="text-lg text-brown mb-6">Feel Free To Talk.</p>
          <div className="bg-brown text-white py-2 px-6 inline-block text-lg font-medium rounded-md">
            Dr. [Your Expert Name]
          </div>
          <p className="text-brown mt-2">Senior Ayurvedic Doctor, CharakWellness</p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/050/817/819/non_2x/happy-smiling-male-doctor-with-hand-present-something-empty-space-standing-isolate-on-transparent-background-png.png"
            alt="CharakWellness Product"
            className="max-w-sm w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
