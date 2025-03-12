"use client";

import { useState } from "react";
import type { Expense } from "./FinanceTracker";
import { expenseCategories } from "../utils/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditingFunctionality } from "./EditingFunctionality"; // Adjust the import path as needed
import { RemoveFunctionality } from "./RemoveFunctionality"; // Adjust the import path as needed

type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (updatedExpense: Expense) => void;
  onRemove: (expenseId: string) => void;
};

export default function ExpenseList({
  expenses,
  onEdit,
  onRemove,
}: ExpenseListProps) {
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const getCategoryIcon = (categoryId: string) => {
    const category = expenseCategories.find((cat) => cat.id === categoryId);
    return category ? category.icon : "❓";
  };

  const handleSave = (updatedExpense: Expense) => {
    onEdit(updatedExpense);
    setEditingExpenseId(null);
  };

  const handleCancel = () => {
    setEditingExpenseId(null);
  };

  return (
    <Card className="bg-[#1c1c1e] border-none text-white">
      <CardHeader>
        <CardTitle>Expense List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-700">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="py-4 flex justify-between items-center"
            >
              {editingExpenseId === expense.id ? (
                <EditingFunctionality
                  goal={{
                    id: expense.id,
                    name: expense.description,
                    targetAmount: expense.amount,
                    currentAmount: 0, // Adjust as needed
                    category: expense.category,
                    deadline: new Date(expense.date),
                  }}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <div className="flex items-center">
                    <span className="mr-2">
                      {getCategoryIcon(expense.category)}
                    </span>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-400">
                        {
                          expenseCategories.find(
                            (cat) => cat.id === expense.category,
                          )?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingExpenseId(expense.id)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <RemoveFunctionality
                      onRemove={() => onRemove(expense.id)}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
