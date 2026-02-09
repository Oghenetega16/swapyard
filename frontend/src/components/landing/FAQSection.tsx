"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqData = [
    {
        question: "How do I start selling?",
        answer: "Simply sign up, click \"Start Selling\", upload photos of your item, set a price, and you're good to go! We make the process as simple as possible."
    },
    {
        question: "Is it safe to use?",
        answer: "Yes! We verify all users on our platform to ensure a safe community. We also provide safety tips for local meetups and secure transaction guidelines."
    },
    {
        question: "What payment methods are supported?",
        answer: "We support various payment methods including direct bank transfers and secure in-app payments to ensure smooth transactions between buyers and sellers."
    },
    {
        question: "Can I edit my listing after posting?",
        answer: "Absolutely. You can edit your listing details, update photos, or change the price at any time from your dashboard."
    }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
        className={`rounded-xl transition-all duration-300 overflow-hidden ${
            isOpen ? "bg-gray-50 ring-1 ring-gray-200" : "bg-[#F3F4F6] hover:bg-gray-200"
        }`}
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                <span 
                    className={`font-bold text-base transition-colors duration-300 ${
                        isOpen ? "text-[#EB3B18]" : "text-gray-800"
                    }`}
                >
                    {question}
                </span>
                <span className="ml-4 shrink-0">
                    <Plus 
                        className={`transition-all duration-300 cursor-pointer transform ${
                        isOpen ? "rotate-45 text-[#EB3B18]" : "rotate-0 text-gray-800"
                        }`} 
                        size={20} 
                    />
                </span>
            </button>

            {/* Accordion Content */}
            <div 
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-6 text-gray-600 text-sm leading-relaxed">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FAQSection = () => {
    return (
        <section className="py-20 bg-white" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4">
                <h2 id="faq-heading" className="text-2xl font-bold text-center mb-12 text-[#002147]">
                    You&apos;ve Got Questions & We&apos;ve Got Answers!
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};