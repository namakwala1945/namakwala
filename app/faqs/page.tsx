"use client";
// pages/resources/faqs.tsx
import React, { useState } from "react";
import Head from "next/head";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  { q: "What is your delivery time?", a: "Typically 5-7 business days." },
  { q: "Do you provide international shipping?", a: "Yes, we ship worldwide." },
  { q: "Can I request a custom order?", a: "Yes, please contact our sales team." },
];

const FaqsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>FAQs - Your Company</title>
      </Head>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold mb-4">FAQs</h1>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border ">
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openIndex === idx && (
                <div className="p-4 border-t bg-gray-50">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqsPage;
