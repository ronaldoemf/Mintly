"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const faqs = [
  {
    question: "What is Mintly and how does it work?",
    answer:
      "Mintly is an AI-powered finance tracker that helps you manage your personal finances. It uses advanced algorithms to analyze your income, expenses, and spending habits, providing personalized insights and recommendations to improve your financial health.",
  },
  {
    question: "Is my financial data safe with Mintly?",
    answer:
      "Yes, we take data security very seriously. Mintly uses bank-level encryption to protect your financial information. We never store your bank login credentials, and all data transfers are secured using industry-standard protocols.",
  },
  {
    question: "How does Mintly's AI provide personalized financial advice?",
    answer:
      "Mintly's AI analyzes your transaction history, spending patterns, and financial goals to provide tailored advice. It can suggest budget adjustments, identify areas where you can save money, and even recommend investment strategies based on your risk profile.",
  },
  {
    question: "Can I connect multiple bank accounts and credit cards to Mintly?",
    answer:
      "Yes, you can connect multiple financial accounts to Mintly. This includes checking and savings accounts, credit cards, investment accounts, and loans from various financial institutions.",
  },
  {
    question: "How often is my financial data updated in Mintly?",
    answer:
      "Mintly updates your financial data daily. However, some transactions may take 1-2 business days to appear, depending on when they are posted by your financial institution.",
  },
  {
    question: "Is there a mobile app for Mintly?",
    answer:
      "Yes, Mintly offers mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store to manage your finances on the go.",
  },
  {
    question: "What if I need help or have questions about using Mintly?",
    answer:
      "We offer several support options. You can check our comprehensive knowledge base, reach out to our AI chatbot for quick answers, or contact our customer support team via email or live chat for more complex issues.",
  },
  {
    question: "Can Mintly help me set and track financial goals?",
    answer:
      "Mintly allows you to set various financial goals such as saving for a vacation, paying off debt, or building an emergency fund. Our AI will help you create a plan to achieve these goals and track your progress along the way.",
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900">
      <div className="container mx-auto px-4">
        <AnimatedSectionHeader title="Frequently Asked Questions" />
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

