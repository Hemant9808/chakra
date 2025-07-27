import React, { useState } from "react";

const faqs = [
  {
    question: "What is Wellvas and what do you offer?",
    answer:
      "Wellvas is a modern Ayurvedic wellness brand that provides scientifically formulated supplements for daily health, men's wellness, immunity, and more. All products are FSSAI certified and made from premium-quality ingredients.",
  },
    {
    question: "Do you manufacture the medicines sold on Wellvas.com?",
    answer:
      "No, we do not manufacture medicines. We procure all our medicines from reliable, authorized third-party suppliers.",
  },
  {
    question: "Are there any labs or third parties involved in my wellness test report?",
    answer:
      "No, all reports are generated automatically based on your answers. No medical samples are needed and your information stays within Wellvas.com.",
  },
  {
    question: "Are your products safe to use daily?",
    answer:
      "Yes, our supplements are designed for daily use and are manufactured in FSSAI-approved facilities. They are lab-tested and free from harmful chemicals, additives, and steroids.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Results may vary depending on the individual and the product. Most users notice benefits within 2–4 weeks of consistent usage along with a healthy lifestyle.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, we offer Cash on Delivery (COD) as a payment option across most locations in India.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive an email and SMS with the tracking details. You can also track your order from the 'My Orders' section after logging in.",
  },
  {
    question: "What’s your return or refund policy?",
    answer:
      "We offer refunds for damaged, incorrect, or defective products. Please report the issue within 48 hours of delivery along with photos for a swift resolution. For more details, visit our Refund Policy page.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fef7f3] min-h-screen py-16 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#e03178] mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#e8ddd6] rounded-xl shadow-sm transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center text-sm sm:text-base font-medium text-gray-800 hover:bg-[#f9f2ec] transition"
              >
                {item.question}
                <span className="ml-4 text-xl text-gray-500">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-gray-700 transition-all duration-300 ease-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
