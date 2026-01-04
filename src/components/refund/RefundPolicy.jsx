// src/pages/RefundPolicy.jsx

import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Returns, Cancellations & Refund Policy</h1>

      <p className="mb-6">
        At Ayucan, we strive to ensure a smooth and satisfying experience for all our customers. This policy outlines our approach to order cancellations, returns, and refunds. Please read carefully to understand your options as a valued customer.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Order Cancellations</h2>
      <p className="mb-6">
        Orders placed on <a href="https://www.ayucan.com" className="text-blue-600 underline">www.ayucan.com</a> can be cancelled at any time before they are shipped. You may initiate a cancellation request from your order history section on your account page. Once your order is eligible for cancellation, a "Cancel Order" button will be displayed next to it.
      </p>
      <p className="mb-6">
        For prepaid orders, if the order is still in the “Confirmed” status, the refund can be processed either to your original payment method or as a credit to your Ayucan Wallet. Refunds to the wallet are typically processed instantly, while bank refunds may take 5–7 business days after cancellation is initiated. For orders already shipped, a return request will be required after delivery (see below).
      </p>

      <h2 className="text-2xl font-semibold mb-4">Returns</h2>
      <p className="mb-6">
        Due to the nature of wellness and health supplements, we currently do not accept returns once a product is delivered and unsealed. However, in the rare case that you receive a wrong item, damaged product, or your package is missing essential components, we are happy to provide a free replacement. To be eligible for this, you must contact our support team within 48 hours of delivery with photos and proof of the issue.
      </p>

      <p className="mb-6">
        We do not offer returns or exchanges for reasons such as dislike of taste, delayed effects, or personal preferences once the seal has been broken or the product has been consumed.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
      <p className="mb-6">
        Once a cancellation is approved (prior to shipping) or a replacement is verified, your refund will be processed through the original payment method. If the order was delivered and a refund is approved due to a valid issue, refunds are initiated only after the product is returned or confirmed damaged. Refunds may take up to 5–7 working days to reflect, depending on your bank or payment provider.
      </p>
      <p className="mb-6">
        In case of payment failures or duplicate transactions, please reach out to us immediately with transaction screenshots for resolution. Refunds in such cases are typically processed within 72 hours of verification.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How Will I Know the Status?</h2>
      <p className="mb-6">
        Once your request is received, you will be updated via WhatsApp, SMS, or email. You will receive a confirmation when cancellation or refund is initiated, and a reference ID once the payment partner processes it. Please keep these notifications for tracking.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-6">
        For assistance with cancellations, returns, or refunds, reach out to our customer support at <a href="mailto:support@ayucan.com" className="text-blue-600 underline">support@ayucan.com</a> or call us at [8799722636]. We’re here to help you from 10 AM to 6 PM, Monday to Saturday.
      </p>

      <p className="text-sm text-gray-500 text-center mt-10">
        Please note: This policy is subject to change without prior notice. We recommend checking this page periodically.
      </p>
    </div>
  );
};

export default RefundPolicy;
