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
} from "recharts";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import Header from "@/components/Header";

export default function MarketPage() {
  const [marketData, setMarketData] = useState<any[]>([]);

  useEffect(() => {
    // Mock market data generation
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      SP500: 4000 + Math.sin(i * 0.5) * 200,
      NASDAQ: 12000 + Math.cos(i * 0.5) * 500,
      DOW: 32000 + Math.sin(i * 0.3) * 1000,
    }));
    setMarketData(mockData);
  }, []);

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
        <h1 className="text-2xl font-bold text-white mb-6">Market Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["S&P 500", "NASDAQ", "Dow Jones"].map((index, i) => (
            <div key={index}>
              <Card className="bg-[#1c1c1e] border-none text-white">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-2">{index}</h2>
                  <div className="text-2xl font-bold">
                    {index === "S&P 500" &&
                      marketData.length > 0 &&
                      marketData[marketData.length - 1].SP500.toFixed(2)}
                    {index === "NASDAQ" &&
                      marketData.length > 0 &&
                      marketData[marketData.length - 1].NASDAQ.toFixed(2)}
                    {index === "Dow Jones" &&
                      marketData.length > 0 &&
                      marketData[marketData.length - 1].DOW.toFixed(2)}
                  </div>
                  <div className="text-green-500 text-sm">+1.2% (Today)</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Card className="bg-[#1c1c1e] border-none text-white p-6">
            <h2 className="text-xl font-bold mb-4">Market Trends</h2>
            <ChartContainer config={{}} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="SP500"
                    stroke="#ff6b00"
                    strokeWidth={2}
                    dot={false}
                    name="S&P 500"
                  />
                  <Line
                    type="monotone"
                    dataKey="NASDAQ"
                    stroke="#00ff00"
                    strokeWidth={2}
                    dot={false}
                    name="NASDAQ"
                  />
                  <Line
                    type="monotone"
                    dataKey="DOW"
                    stroke="#0088fe"
                    strokeWidth={2}
                    dot={false}
                    name="Dow Jones"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>
      </motion.main>
    </div>
  );
}
