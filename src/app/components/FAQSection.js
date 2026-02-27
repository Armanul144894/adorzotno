'use client'
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'

export default function FAQSection () {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
      {
        question: 'How do I place an order?',
        answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. You can pay using various methods including credit card, debit card, or cash on delivery.'
      },
      {
        question: 'What is your delivery time?',
        answer: 'Standard delivery takes 2-5 business days. Express delivery is available for orders placed before 2 PM and will be delivered within 24 hours in major cities.'
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free shipping on all orders above $50. For orders below $50, a shipping fee of $5.99 applies.'
      },
      {
        question: 'Can I return a product?',
        answer: 'Yes, you can return unopened products within 7 days of delivery. Please ensure the product is in its original packaging with all seals intact. Prescription medicines cannot be returned.'
      },
      {
        question: 'Do I need a prescription for medicines?',
        answer: 'For prescription medicines, you will need to upload a valid prescription from a registered medical practitioner. Over-the-counter medicines do not require a prescription.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your order on our website or the courier partner\'s website.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, mobile banking, online banking, and cash on delivery. All payments are secure and encrypted.'
      },
      {
        question: 'Are the medicines genuine?',
        answer: 'Yes, all our medicines are sourced directly from licensed manufacturers and authorized distributors. We guarantee 100% genuine products.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'Yes, you can cancel your order before it is shipped. Once shipped, you can return the product as per our return policy.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team via phone at +1-800-MEDCARE, email at support@medeasy.health, or use our live chat feature available on the website.'
      }
    ];

    return (
      <div className="my-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We have got answers!</p>
        </div>
        <div className="max-w-5xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="text-teal-600 flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
