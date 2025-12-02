"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do you help businesses grow without disrupting operations?",
    answer: "We work alongside your existing workflows, implementing solutions in phases. Our approach ensures minimal disruption while gradually introducing improvements. We prioritize understanding your current systems before proposing changes, ensuring seamless integration."
  },
  {
    question: "What is your development process, and why does it matter?",
    answer: "Our process begins with deep discovery sessions to understand your goals, followed by strategic planning, iterative development, and thorough testing. This structured approach ensures we deliver solutions that truly align with your business needs and scale with your growth."
  },
  {
    question: "What does a typical project engagement look like?",
    answer: "Projects typically start with a strategy call, followed by a detailed proposal. Once approved, we move through design, development, testing, and launch phases. Throughout, you'll have regular check-ins and full visibility into progress. Most projects complete within 4-12 weeks depending on scope."
  },
  {
    question: "We've tried digital solutions before. How is Neuva different?",
    answer: "We focus on sustainable, maintainable solutions rather than quick fixes. Our emphasis on clean code, proper documentation, and knowledge transfer means you're never locked in. We build with your long-term success in mind, not just the immediate deliverable."
  },
  {
    question: "What makes your approach 'low-risk'?",
    answer: "We offer milestone-based payments, transparent communication, and iterative delivery. You see progress at every stage and can provide feedback before we move forward. If something isn't working, we catch it early—not after months of development."
  },
  {
    question: "Do I need internal technical staff to work with you?",
    answer: "Not at all. We're equipped to handle everything from strategy to execution. However, if you do have technical staff, we collaborate seamlessly with them. We also provide training and documentation so your team can manage the solution independently."
  },
  {
    question: "Where does AI move the needle for a company like ours?",
    answer: "AI excels at automating repetitive tasks, extracting insights from data, improving customer interactions, and streamlining operations. We help identify specific areas where AI can deliver measurable ROI—typically in customer service, data processing, content generation, or workflow automation."
  },
  {
    question: "How do you avoid creating systems we can't support long-term?",
    answer: "We use industry-standard technologies, write clean and documented code, and provide comprehensive handoff materials. We also offer ongoing support packages and train your team on system maintenance. Our goal is your independence, not dependency."
  },
  {
    question: "What does this cost?",
    answer: "Projects range from $299 for simple websites to $4,999+ for complex platforms. We offer three tiers—Starter, Growth, and Pro—to match different needs and budgets. Every engagement begins with a free consultation to understand your requirements before providing a detailed quote."
  }
];

const PlusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`w-10 h-10 rounded-full bg-[#8d2020] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
    <svg 
      className="w-5 h-5 text-white" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
    </svg>
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 py-20 bg-black">
      <div className="mx-auto max-w-[900px]">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-lg font-light">
            Everything you need to know about working with Neuva
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#8d2020]/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className="text-white text-base md:text-lg font-medium leading-relaxed">
                  {faq.question}
                </span>
                <PlusIcon isOpen={openIndex === index} />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-white/70 text-base leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">Still have questions?</p>
          <a
            href="https://cal.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#8d2020] text-white font-semibold rounded-lg hover:bg-[#b52a2a] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
