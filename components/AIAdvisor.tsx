"use client"
import { useChat } from "ai/react"
import type { Expense } from "./FinanceTracker"
import { expenseCategories } from "../utils/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type AIAdvisorProps = {
  expenses: Expense[]
}

export default function AIAdvisor({ expenses }: AIAdvisorProps) {
  const expensesWithCategories = expenses.map((expense) => ({
    ...expense,
    categoryName: expenseCategories.find((cat) => cat.id === expense.category)?.name || "Other",
  }))

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "system",
        role: "system",
        content: `You are an AI financial advisor. Analyze the user's expenses and provide advice on how to spend less money, save up money, and identify potentially wasteful spending. Here are the user's recent expenses: ${JSON.stringify(
          expensesWithCategories,
        )}`,
      },
    ],
  })

  return (
    <Card className="bg-[#1c1c1e] border-none text-white">
      <CardHeader>
        <CardTitle>AI Financial Advisor</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user" ? "bg-[#ff6b00] text-white" : "bg-gray-700 text-white"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask for financial advice..."
            className="flex-grow mr-2 bg-[#2c2c2e] border-gray-700 text-white"
          />
          <Button type="submit" className="bg-[#ff6b00] hover:bg-[#ff8533] text-white">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

