"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Search, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions sent to your email to create a new password.",
  },
  {
    question: "How can I connect my bank account?",
    answer:
      "To connect your bank account, go to your dashboard and click on 'Add Account'. Select your bank from the list and follow the secure authentication process.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we use bank-level encryption to protect your data. We never store your bank login credentials and use read-only access to your transaction data.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "To cancel your subscription, go to your account settings and select 'Subscription'. Click on 'Cancel Subscription' and follow the prompts. You'll have access until the end of your billing period.",
  },
]

export default function SupportSection() {
  const [activeChat, setActiveChat] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])

  const startChat = () => {
    setActiveChat(true)
    setMessages([{ text: "Hello! How can I assist you today?", sender: "bot" }])
  }

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }])
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you for your message. One of our support agents will be with you shortly.", sender: "bot" },
      ])
    }, 1000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900">
      <div className="container mx-auto px-4">
        <AnimatedSectionHeader title="Customer Support" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Search className="mr-2" /> Search Knowledge Base
            </h3>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <Link href="/knowledge-base" className="text-green-600 hover:underline mt-2 inline-block">
              Browse all articles
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> Submit a Ticket
            </h3>
            <p className="mb-4">Need more help? Submit a support ticket and we'll get back to you ASAP.</p>
            <Link
              href="/submit-ticket"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Ticket
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-12"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <HelpCircle className="mr-2" /> Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="fixed bottom-4 right-4"
        >
          {!activeChat ? (
            <button
              onClick={startChat}
              className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle />
            </button>
          ) : (
            <div className="bg-white dark:bg-gray-800 w-80 h-96 rounded-lg shadow-lg flex flex-col">
              <div className="bg-green-600 text-white p-4 rounded-t-lg">
                <h3 className="font-semibold">Live Chat</h3>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <span
                      className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-green-100 dark:bg-green-800" : "bg-gray-100 dark:bg-gray-700"}`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

