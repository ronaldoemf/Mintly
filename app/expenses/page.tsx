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
  BarChart,
  Bar,
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
import { Pencil, Trash2 } from "lucide-react";

type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
};

const categories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Entertainment",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      date: "2024-02-01",
      category: "Housing",
      description: "Rent",
      amount: 1500,
    },
    {
      id: "2",
      date: "2024-02-02",
      category: "Food",
      description: "Groceries",
      amount: 200,
    },
    {
      id: "3",
      date: "2024-02-03",
      category: "Transportation",
      description: "Gas",
      amount: 50,
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newExpense.date &&
      newExpense.category &&
      newExpense.description &&
      newExpense.amount
    ) {
      setExpenses([
        ...expenses,
        {
          id: Math.random().toString(),
          date: newExpense.date,
          category: newExpense.category,
          description: newExpense.description,
          amount: Number(newExpense.amount),
        },
      ]);
      setNewExpense({ date: "", category: "", description: "", amount: "" });
    }
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );
    setEditingExpenseId(null);
  };

  const handleRemoveExpense = (expenseId: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId),
    );
  };

  const expensesByCategory = categories.map((category) => ({
    category,
    amount: expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));

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
          className="p-8 pt-24" // Added pt-24 for padding-top
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="text-2xl font-bold text-white mb-6">
            Expense Tracking
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) =>
                        setNewExpense({ ...newExpense, category: value })
                      }
                    >
                      <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newExpense.description}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          description: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Expense
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expensesByCategory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-[#2c2c2e] rounded-lg"
                  >
                    {editingExpenseId === expense.id ? (
                      <div className="w-full">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleEditExpense(expense);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="editDate">Date</Label>
                            <Input
                              id="editDate"
                              type="date"
                              value={expense.date}
                              onChange={(e) =>
                                setExpenses((prevExpenses) =>
                                  prevExpenses.map((prevExpense) =>
                                    prevExpense.id === expense.id
                                      ? { ...prevExpense, date: e.target.value }
                                      : prevExpense,
                                  ),
                                )
                              }
                              className="bg-[#2c2c2e] border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="editCategory">Category</Label>
                            <Select
                              value={expense.category}
                              onValueChange={(value) =>
                                setExpenses((prevExpenses) =>
                                  prevExpenses.map((prevExpense) =>
                                    prevExpense.id === expense.id
                                      ? { ...prevExpense, category: value }
                                      : prevExpense,
                                  ),
                                )
                              }
                            >
                              <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="editDescription">Description</Label>
                            <Input
                              id="editDescription"
                              value={expense.description}
                              onChange={(e) =>
                                setExpenses((prevExpenses) =>
                                  prevExpenses.map((prevExpense) =>
                                    prevExpense.id === expense.id
                                      ? {
                                          ...prevExpense,
                                          description: e.target.value,
                                        }
                                      : prevExpense,
                                  ),
                                )
                              }
                              className="bg-[#2c2c2e] border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="editAmount">Amount</Label>
                            <Input
                              id="editAmount"
                              type="number"
                              value={expense.amount}
                              onChange={(e) =>
                                setExpenses((prevExpenses) =>
                                  prevExpenses.map((prevExpense) =>
                                    prevExpense.id === expense.id
                                      ? {
                                          ...prevExpense,
                                          amount: Number(e.target.value),
                                        }
                                      : prevExpense,
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
                              onClick={() => setEditingExpenseId(null)}
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
                            {expense.description}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {expense.category} - {expense.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-medium text-white">
                            ${expense.amount}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingExpenseId(expense.id)}
                              className="text-[#28c45c] hover:text-[#28c45c]" // Updated color
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveExpense(expense.id)}
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
