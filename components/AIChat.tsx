"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import type { Expense } from "./FinanceTracker"
import { expenseCategories } from "../utils/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AIChatProps = {
  expenses: Expense[]
}

export default function AIChat({ expenses }: AIChatProps) {
  const [showChat, setShowChat] = useState(false)

  const expensesWithCategories = expenses.map((expense) => ({
    ...expense,
    categoryName: expenseCategories.find((cat) => cat.id === expense.category)?.name || "Other",
  }))

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "system",
        role: "system",
        content: `You are an AI financial advisor. Analyze the user's expenses and provide advice on how to spend less money, save up money, and identify potentially wasteful spending. Here are the user's recent expenses: ${JSON.stringify(expensesWithCategories)}`,
      },
    ],
  })

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">AI Financial Advisor</h2>
      <Button onClick={() => setShowChat(!showChat)} className="mb-4">
        {showChat ? "Hide Chat" : "Show Chat"}
      </Button>
      {showChat && (
        <div className="border rounded-lg p-4">
          <div className="h-64 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask for financial advice..."
              className="flex-grow mr-2"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      )}
    </div>
  )
}

