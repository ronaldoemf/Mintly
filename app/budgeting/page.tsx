"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import TopBar from "@/components/TopBar"; // Import the TopBar component
import { Trash2, Undo2, Pencil } from "lucide-react"; // Import the edit icon

type Budget = {
  category: string;
  allocated: number;
  spent: number;
};

type Action = {
  type: "add" | "remove";
  budget: Budget;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function BudgetingPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { category: "Housing", allocated: 2000, spent: 1800 },
    { category: "Food", allocated: 600, spent: 450 },
    { category: "Transportation", allocated: 400, spent: 380 },
    { category: "Entertainment", allocated: 300, spent: 250 },
    { category: "Utilities", allocated: 200, spent: 180 },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    allocated: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editBudget, setEditBudget] = useState<Budget>({
    category: "",
    allocated: 0,
    spent: 0,
  });

  const [lastAction, setLastAction] = useState<Action | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lastAction) {
      setShowUndo(true);
      timer = setTimeout(() => {
        setShowUndo(false);
        setLastAction(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [lastAction]);

  const totalAllocated = budgets.reduce(
    (sum, budget) => sum + budget.allocated,
    0,
  );
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBudget.category && newBudget.allocated) {
      const budget: Budget = {
        category: newBudget.category,
        allocated: Number(newBudget.allocated),
        spent: 0,
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: "", allocated: "" });
      setLastAction({ type: "add", budget });
    }
  };

  const handleEditBudget = (index: number) => {
    setEditingIndex(index);
    setEditBudget(budgets[index]);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedBudgets = [...budgets];
      updatedBudgets[editingIndex] = editBudget;
      setBudgets(updatedBudgets);
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleRemoveBudget = (index: number) => {
    const budgetToRemove = budgets[index];
    if (budgetToRemove) {
      setBudgets(budgets.filter((_, i) => i !== index));
      setLastAction({ type: "remove", budget: budgetToRemove });
    }
  };

  const handleUndo = () => {
    if (lastAction) {
      if (lastAction.type === "add") {
        setBudgets(budgets.filter((budget) => budget !== lastAction.budget));
      } else {
        setBudgets([...budgets, lastAction.budget]);
      }
      setLastAction(null);
      setShowUndo(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {" "}
      {/* Removed bg-[#0e0e10] */}
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
            Smart Budgeting
          </h1>

          <AnimatePresence>
            {showUndo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 right-4 bg-[#2c2c2e] p-2 rounded-lg shadow-lg"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  className="flex items-center space-x-2"
                >
                  <Undo2 className="h-4 w-4" />
                  <span>
                    Undo {lastAction?.type === "add" ? "Add" : "Remove"}
                  </span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgets}
                        dataKey="allocated"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {budgets.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">
                    Total Allocated: ${totalAllocated}
                  </p>
                  <p className="text-sm text-gray-400">
                    Total Spent: ${totalSpent}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBudget} className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newBudget.category}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, category: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newBudget.allocated}
                      onChange={(e) =>
                        setNewBudget({
                          ...newBudget,
                          allocated: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Budget
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.map((budget, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#2c2c2e] rounded-lg"
                  >
                    {editingIndex === index ? (
                      <form
                        onSubmit={handleSaveEdit}
                        className="w-full space-y-4"
                      >
                        <div>
                          <Label htmlFor="editCategory">Category</Label>
                          <Input
                            id="editCategory"
                            value={editBudget.category}
                            onChange={(e) =>
                              setEditBudget({
                                ...editBudget,
                                category: e.target.value,
                              })
                            }
                            className="bg-[#2c2c2e] border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="editAllocated">Target Amount</Label>
                          <Input
                            id="editAllocated"
                            type="number"
                            value={editBudget.allocated}
                            onChange={(e) =>
                              setEditBudget({
                                ...editBudget,
                                allocated: Number(e.target.value),
                              })
                            }
                            className="bg-[#2c2c2e] border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="editSpent">Current Amount</Label>
                          <Input
                            id="editSpent"
                            type="number"
                            value={editBudget.spent}
                            onChange={(e) =>
                              setEditBudget({
                                ...editBudget,
                                spent: Number(e.target.value),
                              })
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
                            onClick={handleCancelEdit}
                            className="flex-1 bg-gray-500 hover:bg-gray-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-medium text-white">
                            {budget.category}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Spent: ${budget.spent} / ${budget.allocated}
                          </p>
                        </div>
                        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${(budget.spent / budget.allocated) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBudget(index)}
                            className="text-[#6BCB5E] hover:text-[#5CAF4E]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBudget(index)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
