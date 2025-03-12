"use client";

import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Expense } from "./FinanceTracker";
import { expenseCategories } from "../utils/categories";
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

type ExpenseFormProps = {
  addExpense: (expense: Expense) => void;
};

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount
    const amountValue = Number.parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }

    if (!description || !category) {
      setError("Please fill out all fields.");
      return;
    }

    const newExpense: Expense = {
      id: uuidv4(),
      description,
      amount: amountValue,
      category,
      date: new Date().toISOString(),
    };

    addExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategory("");
    setError(null); // Clear any previous errors
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description" className="text-gray-300">
          Description
        </Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="amount" className="text-gray-300">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="category" className="text-gray-300">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-[#2c2c2e] border-gray-700 text-white">
            {expenseCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id} className="text-white">
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        className="w-full bg-[#ff6b00] hover:bg-[#ff8533] text-white"
      >
        Add Expense
      </Button>
    </form>
  );
}
