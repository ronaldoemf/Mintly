"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { motion } from "framer-motion";
import { fadeIn, slideIn, scaleIn, transition } from "@/utils/animations";
import type { Transaction } from "@/types/finance";
import AIAnalysis from "./AIAnalysis";
import SpendingHeatmap from "./SpendingHeatmap";
import { useFinancialProfile } from "@/contexts/FinancialProfileContext";

type DashboardProps = {
  transactions: Transaction[];
};

export default function Dashboard({ transactions }: DashboardProps) {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const { profile } = useFinancialProfile();

  // Use profile data for balance, income, and expenses
  useEffect(() => {
    if (profile) {
      setBalance(profile.currentBalance || 0);
      setIncome(profile.totalIncome || 0);
      setExpenses(profile.totalExpenses || 0);
    }
  }, [profile]);

  // Mock data for General Statistics (Balance History)
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    const mockChartData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      value: 50000 + Math.sin(i * 0.5) * 10000,
    }));
    setChartData(mockChartData);
  }, []);

  // Mock data for Spending by Category
  const [categoryData, setCategoryData] = useState<
    { name: string; value: number }[]
  >([]);
  useEffect(() => {
    const mockCategoryData = [
      { name: "Food", value: 500 },
      { name: "Transport", value: 300 },
      { name: "Entertainment", value: 200 },
      { name: "Utilities", value: 400 },
      { name: "Other", value: 100 },
    ];
    setCategoryData(mockCategoryData);
  }, []);

  // Mock data for Monthly Activity
  const [monthlyActivity, setMonthlyActivity] = useState<any[]>([]);
  useEffect(() => {
    const mockMonthlyActivity = [
      { month: "Jan", spent: 1500, earned: 2000, profit: 500 },
      { month: "Feb", spent: 1700, earned: 2100, profit: 400 },
      { month: "Mar", spent: 1600, earned: 2200, profit: 600 },
      { month: "Apr", spent: 1800, earned: 2300, profit: 500 },
      { month: "May", spent: 1900, earned: 2400, profit: 500 },
      { month: "Jun", spent: 2000, earned: 2500, profit: 500 },
    ];
    setMonthlyActivity(mockMonthlyActivity);
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transition}
    >
      {profile && (
        <motion.div variants={slideIn} transition={transition}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Financial Profile Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Monthly Income:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${profile.monthlyIncome}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Expenses:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${profile.monthlyExpenses}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Balance:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${profile.currentBalance}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Income:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${profile.totalIncome}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Expenses:</p>
                  <p className="text-xl font-bold text-foreground">
                    ${profile.totalExpenses}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Top Expense Category:</p>
                  <p className="text-xl font-bold text-foreground">
                    {profile.topExpenseCategory}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Primary Savings Goal:</p>
                  <p className="text-xl font-bold text-foreground">
                    {profile.savingsGoal}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={slideIn}
        transition={transition}
      >
        {[
          { title: "Current Balance", value: balance },
          { title: "Total Income", value: income },
          { title: "Total Expenses", value: expenses },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            variants={scaleIn}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {item.title}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ${item.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* General Statistics (Balance History) */}
      <motion.div variants={fadeIn} transition={transition}>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Balance History
            </h2>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Spending by Category and Monthly Activity */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={fadeIn}
        transition={transition}
      >
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Spending by Category
            </h2>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Monthly Activity
            </h2>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyActivity}>
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="spent"
                    fill="hsl(var(--primary))"
                    name="Spent"
                  />
                  <Bar
                    dataKey="earned"
                    fill="hsl(var(--secondary))"
                    name="Earned"
                  />
                  <Bar
                    dataKey="profit"
                    fill="hsl(var(--accent))"
                    name="Profit/Loss"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Analysis and Spending Heatmap */}
      <motion.div variants={fadeIn} transition={transition}>
        <SpendingHeatmap transactions={transactions} />
      </motion.div>

      <motion.div variants={fadeIn} transition={transition}>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              AI Financial Analysis
            </h2>
            <p className="text-muted-foreground mb-4">
              Get personalized insights on your financial habits and receive
              tailored advice to improve your financial health.
            </p>
            <Button
              onClick={() => setShowAIAnalysis(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Generate AI Analysis
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {showAIAnalysis && (
        <AIAnalysis
          transactions={transactions}
          onClose={() => setShowAIAnalysis(false)}
        />
      )}
    </motion.div>
  );
}
