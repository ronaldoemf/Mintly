"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import TopBar from "@/components/TopBar"; // Import the TopBar component
import { Pencil, Trash2 } from "lucide-react"; // Import icons for edit and delete

type Investment = {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
};

const investmentTypes = [
  "Stocks",
  "Bonds",
  "Mutual Funds",
  "ETFs",
  "Real Estate",
  "Cryptocurrency",
  "Other",
];

const mockPerformanceData = [
  { date: "2024-01", value: 10000 },
  { date: "2024-02", value: 11000 },
  { date: "2024-03", value: 10500 },
  { date: "2024-04", value: 12000 },
  { date: "2024-05", value: 11800 },
  { date: "2024-06", value: 13000 },
];

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Apple Inc.",
      type: "Stocks",
      amount: 5000,
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "US Treasury Bond",
      type: "Bonds",
      amount: 10000,
      date: "2024-02-01",
    },
    {
      id: "3",
      name: "Vanguard 500 Index Fund",
      type: "Mutual Funds",
      amount: 7500,
      date: "2024-03-10",
    },
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: "",
    type: "",
    amount: "",
    date: "",
  });

  const [editingInvestmentId, setEditingInvestmentId] = useState<string | null>(
    null,
  );

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newInvestment.name &&
      newInvestment.type &&
      newInvestment.amount &&
      newInvestment.date
    ) {
      setInvestments([
        ...investments,
        {
          id: Math.random().toString(),
          name: newInvestment.name,
          type: newInvestment.type,
          amount: Number(newInvestment.amount),
          date: newInvestment.date,
        },
      ]);
      setNewInvestment({ name: "", type: "", amount: "", date: "" });
    }
  };

  const handleEditInvestment = (updatedInvestment: Investment) => {
    setInvestments((prevInvestments) =>
      prevInvestments.map((investment) =>
        investment.id === updatedInvestment.id ? updatedInvestment : investment,
      ),
    );
    setEditingInvestmentId(null);
  };

  const handleRemoveInvestment = (investmentId: string) => {
    setInvestments((prevInvestments) =>
      prevInvestments.filter((investment) => investment.id !== investmentId),
    );
  };

  const totalInvestment = investments.reduce(
    (sum, investment) => sum + investment.amount,
    0,
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* TopBar */}
        <TopBar />

        {/* Page Content */}
        <motion.div
          className="p-8 pt-24" // Added pt-24 for padding-top
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="text-2xl font-bold text-white mb-6">
            Investment Insights
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddInvestment} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Investment Name</Label>
                    <Input
                      id="name"
                      value={newInvestment.name}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          name: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Investment Type</Label>
                    <Select
                      value={newInvestment.type}
                      onValueChange={(value) =>
                        setNewInvestment({ ...newInvestment, type: value })
                      }
                    >
                      <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newInvestment.amount}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          amount: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newInvestment.date}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          date: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Investment
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 bg-[#2c2c2e] rounded-lg"
                  >
                    {editingInvestmentId === investment.id ? (
                      <div className="w-full">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleEditInvestment(investment);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="editName">Name</Label>
                            <Input
                              id="editName"
                              value={investment.name}
                              onChange={(e) =>
                                setInvestments((prevInvestments) =>
                                  prevInvestments.map((prevInvestment) =>
                                    prevInvestment.id === investment.id
                                      ? {
                                          ...prevInvestment,
                                          name: e.target.value,
                                        }
                                      : prevInvestment,
                                  ),
                                )
                              }
                              className="bg-[#2c2c2e] border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="editType">Type</Label>
                            <Select
                              value={investment.type}
                              onValueChange={(value) =>
                                setInvestments((prevInvestments) =>
                                  prevInvestments.map((prevInvestment) =>
                                    prevInvestment.id === investment.id
                                      ? { ...prevInvestment, type: value }
                                      : prevInvestment,
                                  ),
                                )
                              }
                            >
                              <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {investmentTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="editAmount">Amount</Label>
                            <Input
                              id="editAmount"
                              type="number"
                              value={investment.amount}
                              onChange={(e) =>
                                setInvestments((prevInvestments) =>
                                  prevInvestments.map((prevInvestment) =>
                                    prevInvestment.id === investment.id
                                      ? {
                                          ...prevInvestment,
                                          amount: Number(e.target.value),
                                        }
                                      : prevInvestment,
                                  ),
                                )
                              }
                              className="bg-[#2c2c2e] border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="editDate">Date</Label>
                            <Input
                              id="editDate"
                              type="date"
                              value={investment.date}
                              onChange={(e) =>
                                setInvestments((prevInvestments) =>
                                  prevInvestments.map((prevInvestment) =>
                                    prevInvestment.id === investment.id
                                      ? {
                                          ...prevInvestment,
                                          date: e.target.value,
                                        }
                                      : prevInvestment,
                                  ),
                                )
                              }
                              className="bg-[#2c2c2e] border-gray-700 text-white"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button type="submit" className="flex-1">
                              Save
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setEditingInvestmentId(null)}
                              className="flex-1 bg-gray-500 hover:bg-gray-600"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-medium text-white">
                            {investment.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {investment.type} - {investment.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-medium text-white">
                            ${investment.amount}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditingInvestmentId(investment.id)
                              }
                              className="text-[#28c45c] hover:text-[#28c45c]"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveInvestment(investment.id)
                              }
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold text-white">
                  Total Investment: ${totalInvestment}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
