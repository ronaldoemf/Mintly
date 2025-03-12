"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import TopBar from "@/components/TopBar"; // Import the TopBar component

type TimeFilter =
  | "Today"
  | "Last week"
  | "Last month"
  | "Last 6 month"
  | "Year";

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<TimeFilter>("Last month");
  const [chartData, setChartData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<
    { name: string; value: number }[]
  >([]);
  const [monthlyActivity, setMonthlyActivity] = useState<any[]>([]);

  useEffect(() => {
    // Mock data generation
    const mockChartData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      value: 50000 + Math.sin(i * 0.5) * 10000,
    }));
    setChartData(mockChartData);

    const mockCategoryData = [
      { name: "Food", value: 500 },
      { name: "Transport", value: 300 },
      { name: "Entertainment", value: 200 },
      { name: "Utilities", value: 400 },
      { name: "Other", value: 100 },
    ];
    setCategoryData(mockCategoryData);

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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* TopBar */}
        <TopBar />

        {/* Page Content */}
        <motion.div
          className="p-8 pt-24" // Added pt-24 to account for the TopBar height
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="text-2xl font-bold text-white mb-6">
            Statistics & Income
          </h1>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                General Statistics
              </h2>
              <div className="flex gap-4">
                {(
                  [
                    "Today",
                    "Last week",
                    "Last month",
                    "Last 6 month",
                    "Year",
                  ] as TimeFilter[]
                ).map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    className={`text-sm ${selectedPeriod === period ? "text-white" : "text-gray-400"}`}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Card className="bg-[#080c14] border-none text-white p-6 h-[300px]">
                <ChartContainer config={{}} className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <Card className="bg-[#080c14] border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Spending by Category
                  </h3>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-[#080c14] border-none text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Monthly Activity
                  </h3>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyActivity}>
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Bar dataKey="spent" fill="#10b981" name="Spent" />
                        <Bar dataKey="earned" fill="#34d399" name="Earned" />
                        <Bar
                          dataKey="profit"
                          fill="#059669"
                          name="Profit/Loss"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
