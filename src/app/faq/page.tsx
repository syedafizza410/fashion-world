// pages/faq.tsx
"use client"

import { useState } from "react";
import Head from "next/head";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What sizes do your t-shirts come in?",
    answer:
      "Our t-shirts are available in sizes XS, S, M, L, XL, and XXL. Please refer to our size chart on the product page for detailed measurements.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. If you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please ensure the items are in original condition.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. Expedited shipping options are available at checkout for faster delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping fees and delivery times may vary based on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking number and a link to track your package online.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secured and encrypted.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can change or cancel your order within 2 hours of placing it by contacting our support team. After that, orders are processed quickly and may not be changeable.",
  },
  {
    question: "Are your products eco-friendly?",
    answer:
      "Yes, we are committed to sustainability. Our t-shirts are made from 100% organic cotton and printed with eco-friendly inks.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - FashionWorld</title>
        <meta
          name="description"
          content="Frequently Asked Questions about FashionWorlds t-shirts."
        />
      </Head>
      <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQ;
