"use client";

import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import FinancialInsights from "./FinancialInsights";
import AIAdvisor from "./AIAdvisor";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, transition } from "@/utils/animations";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type FinanceTrackerProps = {
  expenses: Expense[];
};

export default function FinanceTracker({
  expenses: initialExpenses,
}: FinanceTrackerProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Expenses");

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transition}
    >
      <Card className="bg-[#1c1c1e] border-none text-white">
        <CardHeader>
          <CardTitle>Finance Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <motion.div
              className="flex space-x-4"
              variants={slideIn}
              transition={transition}
            >
              {["Expenses", "Insights", "AI Advisor"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === tab
                      ? "bg-[#ff6b00] text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "Expenses" && (
                <motion.div
                  key="expenses"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                  transition={transition}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-mode"
                        checked={isAutoMode}
                        onCheckedChange={setIsAutoMode}
                      />
                      <Label htmlFor="auto-mode" className="text-white">
                        {isAutoMode
                          ? "Automatic Mode (Bank API)"
                          : "Manual Input Mode"}
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {isAutoMode ? (
                        <div>Automatic mode placeholder</div>
                      ) : (
                        <ExpenseForm addExpense={addExpense} />
                      )}
                      <ExpenseList expenses={expenses} />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Insights" && (
                <motion.div
                  key="insights"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                  transition={transition}
                >
                  <FinancialInsights expenses={expenses} />
                </motion.div>
              )}

              {activeTab === "AI Advisor" && (
                <motion.div
                  key="ai-advisor"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                  transition={transition}
                >
                  <AIAdvisor expenses={expenses} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
