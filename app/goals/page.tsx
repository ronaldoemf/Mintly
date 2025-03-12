"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import { Trash2, Pencil } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { EditingFunctionality } from "@/components/EditingFunctionality";
import UndoButton from "@/components/UndoButton"; // Import the UndoButton component

type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: Date;
};

type Action = {
  type: "add" | "remove";
  goal: Goal;
};

const goalCategories = [
  "Emergency Fund",
  "Retirement",
  "Home Purchase",
  "Vacation",
  "Education",
  "Debt Repayment",
  "Other",
];

export default function FinancialGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 5000,
      category: "Emergency Fund",
      deadline: new Date(2024, 11, 31),
    },
    {
      id: "2",
      name: "Down Payment for House",
      targetAmount: 50000,
      currentAmount: 20000,
      category: "Home Purchase",
      deadline: new Date(2026, 5, 30),
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    category: "",
    deadline: "",
  });

  const [lastAction, setLastAction] = useState<Action | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

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

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newGoal.name &&
      newGoal.targetAmount &&
      newGoal.category &&
      newGoal.deadline
    ) {
      const goal: Goal = {
        id: Math.random().toString(),
        name: newGoal.name,
        targetAmount: Number(newGoal.targetAmount),
        currentAmount: Number(newGoal.currentAmount) || 0,
        category: newGoal.category,
        deadline: new Date(newGoal.deadline),
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: "",
        targetAmount: "",
        currentAmount: "",
        category: "",
        deadline: "",
      });
      setLastAction({ type: "add", goal });
    }
  };

  const handleRemoveGoal = (id: string) => {
    const goalToRemove = goals.find((goal) => goal.id === id);
    if (goalToRemove) {
      setGoals(goals.filter((goal) => goal.id !== id));
      setLastAction({ type: "remove", goal: goalToRemove });
    }
  };

  const handleUndo = () => {
    if (lastAction) {
      if (lastAction.type === "add") {
        setGoals(goals.filter((goal) => goal.id !== lastAction.goal.id));
      } else {
        setGoals([...goals, lastAction.goal]);
      }
      setLastAction(null);
      setShowUndo(false);
    }
  };

  const handleEditGoal = (id: string) => {
    setEditingGoalId(id);
  };

  const handleSaveEdit = (updatedGoal: Goal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal,
      ),
    );
    setEditingGoalId(null);
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
  };

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
          className="p-8 pt-24"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="text-2xl font-bold mb-6" style={{ color: "#28c45c" }}>
            Financial Goals
          </h1>

          {/* Undo Button */}
          <UndoButton
            showUndo={showUndo}
            lastAction={lastAction}
            onUndo={handleUndo}
          />

          {/* Add New Goal Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGoal} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Goal Name</Label>
                    <Input
                      id="name"
                      value={newGoal.name}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, name: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetAmount: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentAmount">
                      Current Amount (Optional)
                    </Label>
                    <Input
                      id="currentAmount"
                      type="number"
                      value={newGoal.currentAmount}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          currentAmount: e.target.value,
                        })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) =>
                        setNewGoal({ ...newGoal, category: value })
                      }
                    >
                      <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, deadline: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Goal
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Your Financial Goals Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Financial Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      {editingGoalId === goal.id ? (
                        <EditingFunctionality
                          goal={goal}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                        />
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-white">
                              {goal.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-400">
                                ${goal.currentAmount} / ${goal.targetAmount}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditGoal(goal.id)}
                                className="text-[#6BCB5E] hover:text-[#5CAF4E]"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveGoal(goal.id)}
                                className="text-red-500 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Progress
                            value={
                              (goal.currentAmount / goal.targetAmount) * 100
                            }
                            className="h-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{goal.category}</span>
                            <span>
                              Deadline: {goal.deadline.toLocaleDateString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goal Insights Card */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Based on your current savings rate and financial goals, here are
                some insights:
              </p>
              <ul
                className="list-disc list-inside space-y-2"
                style={{ color: "#28c45c" }}
              >
                <li>
                  You're on track to reach your{" "}
                  <span style={{ color: "#28c45c" }}>Emergency Fund</span> goal
                  by the deadline.
                </li>
                <li>
                  Consider increasing your monthly savings for the{" "}
                  <span style={{ color: "#28c45c" }}>Home Purchase</span> goal
                  to meet the target.
                </li>
                <li>
                  You might want to set up automatic transfers to your
                  goal-specific savings accounts.
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
