"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { fadeIn, transition } from "@/utils/animations"
import Header from "@/components/Header"
import AIChat from "@/components/AIChat"
import type { Expense } from "@/components/FinanceTracker"

export default function AIAdvisorPage() {
  // Mock expenses data
  const [expenses] = useState<Expense[]>([
    { id: "1", description: "Groceries", amount: 50, category: "food", date: "2023-05-01" },
    { id: "2", description: "Gas", amount: 30, category: "transportation", date: "2023-05-02" },
    { id: "3", description: "Movie tickets", amount: 25, category: "entertainment", date: "2023-05-03" },
  ])

  return (
    <div className="flex min-h-screen bg-[#0e0e10]">
      <Header />
      <motion.main
        className="flex-1 ml-64 p-8"
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={transition}
      >
        <h1 className="text-2xl font-bold text-white mb-6">AI Financial Advisor</h1>

        <Card className="bg-[#1c1c1e] border-none text-white">
          <CardContent className="p-6">
            <AIChat expenses={expenses} />
          </CardContent>
        </Card>
      </motion.main>
    </div>
  )
}

