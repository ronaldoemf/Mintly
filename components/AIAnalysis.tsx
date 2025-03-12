"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeIn, scaleIn, transition } from "@/utils/animations"
import type { Transaction } from "@/types/finance"
import { X } from "lucide-react"

type AIAnalysisProps = {
  transactions: Transaction[]
  onClose: () => void
}

type Habit = {
  type: "good" | "bad" | "neutral"
  description: string
  suggestion: string
}

export default function AIAnalysis({ transactions, onClose }: AIAnalysisProps) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating AI analysis
    const analyzeTransactions = () => {
      const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

      const spendingByCategory = transactions.reduce(
        (acc, t) => {
          if (t.type === "expense") {
            acc[t.category] = (acc[t.category] || 0) + t.amount
          }
          return acc
        },
        {} as Record<string, number>,
      )

      const totalSpending = Object.values(spendingByCategory).reduce((sum, amount) => sum + amount, 0)
      const newHabits: Habit[] = []

      // Analyze spending in each category
      Object.entries(spendingByCategory).forEach(([category, amount]) => {
        const percentageOfIncome = (amount / totalIncome) * 100
        let habitType: "good" | "bad" | "neutral" = "neutral"
        let suggestion = ""

        switch (category) {
          case "housing":
            if (percentageOfIncome > 30) {
              habitType = "bad"
              suggestion =
                "Your housing expenses are high relative to your income. Consider ways to reduce this cost if possible."
            } else if (percentageOfIncome < 15) {
              habitType = "good"
              suggestion = "You're managing to keep housing costs low. Great job!"
            } else {
              habitType = "neutral"
              suggestion = "Your housing costs are within a reasonable range."
            }
            break
          case "food":
            if (percentageOfIncome > 15) {
              habitType = "bad"
              suggestion =
                "You're spending a significant portion of your income on food. Try meal planning or cooking at home more often to reduce costs."
            } else if (percentageOfIncome < 5) {
              habitType = "good"
              suggestion = "You're keeping food costs low. Ensure you're still maintaining a healthy diet."
            } else {
              habitType = "neutral"
              suggestion = "Your food spending is within a reasonable range."
            }
            break
          // Add more categories as needed
          default:
            if (percentageOfIncome > 20) {
              habitType = "bad"
              suggestion = `Your spending on ${category} is high. Consider ways to reduce this expense.`
            } else if (percentageOfIncome < 5) {
              habitType = "good"
              suggestion = `You're keeping ${category} expenses low. Good job!`
            } else {
              habitType = "neutral"
              suggestion = `Your spending on ${category} is within a reasonable range.`
            }
        }

        newHabits.push({
          type: habitType,
          description: `${category.charAt(0).toUpperCase() + category.slice(1)} spending: ${percentageOfIncome.toFixed(2)}% of income`,
          suggestion,
        })
      })

      // Analyze savings rate
      const savingsRate = ((totalIncome - totalSpending) / totalIncome) * 100
      if (savingsRate > 20) {
        newHabits.push({
          type: "good",
          description: `High savings rate: ${savingsRate.toFixed(2)}%`,
          suggestion: "Great job saving! Consider investing for long-term growth.",
        })
      } else if (savingsRate < 10) {
        newHabits.push({
          type: "bad",
          description: `Low savings rate: ${savingsRate.toFixed(2)}%`,
          suggestion: "Try to increase your savings. Aim for saving at least 20% of your income.",
        })
      } else {
        newHabits.push({
          type: "neutral",
          description: `Moderate savings rate: ${savingsRate.toFixed(2)}%`,
          suggestion: "You're saving a decent amount. Keep it up and try to increase if possible.",
        })
      }

      // Analyze income stability
      const incomeTransactions = transactions.filter((t) => t.type === "income")
      const uniqueIncomeAmounts = new Set(incomeTransactions.map((t) => t.amount))
      if (uniqueIncomeAmounts.size === 1) {
        newHabits.push({
          type: "good",
          description: "Stable income",
          suggestion:
            "Your consistent income is great for financial planning. Consider automating your savings and bill payments.",
        })
      } else if (uniqueIncomeAmounts.size > incomeTransactions.length / 2) {
        newHabits.push({
          type: "bad",
          description: "Highly variable income",
          suggestion:
            "With varying income, it's important to budget carefully. Try to build an emergency fund to cover expenses during low-income periods.",
        })
      } else {
        newHabits.push({
          type: "neutral",
          description: "Somewhat variable income",
          suggestion:
            "Your income has some variability. Consider ways to stabilize your income or adjust your budget accordingly.",
        })
      }

      setHabits(newHabits)
      setLoading(false)
    }

    setTimeout(analyzeTransactions, 2000) // Simulating API delay
  }, [transactions])

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={transition}
    >
      <motion.div
        className="bg-[#1c1c1e] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        variants={scaleIn}
        transition={transition}
      >
        <Card className="border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white">AI Financial Analysis</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-400">Analyzing your financial habits...</p>
            ) : (
              <div className="space-y-6">
                {habits.map((habit, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      habit.type === "good"
                        ? "bg-green-900 bg-opacity-20"
                        : habit.type === "bad"
                          ? "bg-red-900 bg-opacity-20"
                          : "bg-blue-900 bg-opacity-20"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        habit.type === "good"
                          ? "text-green-400"
                          : habit.type === "bad"
                            ? "text-red-400"
                            : "text-blue-400"
                      }`}
                    >
                      {habit.type === "good"
                        ? "Good Habit"
                        : habit.type === "bad"
                          ? "Area for Improvement"
                          : "Neutral Observation"}
                    </h3>
                    <p className="text-white mt-2">{habit.description}</p>
                    <p className="text-gray-400 mt-2">{habit.suggestion}</p>
                  </div>
                ))}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Next Steps</h3>
                  <ul className="list-disc list-inside text-gray-400">
                    <li>Review your spending in high-expense categories and look for ways to optimize costs.</li>
                    <li>Set specific, measurable financial goals based on these insights.</li>
                    <li>Consider consulting with a financial advisor for personalized advice.</li>
                    <li>Regularly track your progress and adjust your habits as needed.</li>
                    <li>Focus on increasing your income or finding additional income streams if possible.</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

