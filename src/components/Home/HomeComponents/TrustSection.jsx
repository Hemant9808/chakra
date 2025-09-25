import React from "react";

export default function TrustSection() {
  return (
    <div className="bg-gray-50 py-12">
      {/* Main Container with more padding and a subtle background */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {/* Item 1: Secure Payment */}
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {/* Increased icon size and added hover effect */}
            <img
              src="/icons/secure.png"
              alt="Secure Payment"
              className="mx-auto mb-4 w-16 h-16 transition-all duration-300"
            />
            <p className="text-base font-semibold text-gray-700">Secure Payment</p>
          </div>

          {/* Item 2: Easy Returns */}
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <img
              src="/icons/returns.png"
              alt="Easy Returns"
              className="mx-auto mb-4 w-16 h-16 transition-all duration-300"
            />
            <p className="text-base font-semibold text-gray-700">Easy Returns</p>
          </div>

          {/* Item 3: Fast Shipping */}
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <img
              src="/icons/shipping.png"
              alt="Fast Shipping"
              className="mx-auto mb-4 w-16 h-16 transition-all duration-300"
            />
            <p className="text-base font-semibold text-gray-700">Fast Shipping</p>
          </div>

          {/* Item 4: 24/7 Support */}
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <img
              src="/icons/support.png"
              alt="24/7 Support"
              className="mx-auto mb-4 w-16 h-16 transition-all duration-300"
            />
            <p className="text-base font-semibold text-gray-700">24/7 Support</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
          {/* Added hover effects for certifications */}
          <img
            src="/icons/fassai.png"
            alt="FSSAI Certified"
            className="h-12 transition-transform duration-300 transform hover:scale-110"
          />
          <img
            src="/icons/gmp.png"
            alt="GMP Certified"
            className="h-12 transition-transform duration-300 transform hover:scale-110"
          />
          <img
            src="/icons/iso.png"
            alt="ISO Certified"
            className="h-12 transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}