"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: Date;
};

type EditingFunctionalityProps = {
  goal: Goal;
  onSave: (updatedGoal: Goal) => void;
  onCancel: () => void;
};

export function EditingFunctionality({
  goal,
  onSave,
  onCancel,
}: EditingFunctionalityProps) {
  const [editGoal, setEditGoal] = useState<Goal>(goal);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editGoal);
  };

  return (
    <form onSubmit={handleSave} className="w-full space-y-4">
      <div>
        <Label htmlFor="editName">Goal Name</Label>
        <Input
          id="editName"
          value={editGoal.name}
          onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="editTargetAmount">Target Amount</Label>
        <Input
          id="editTargetAmount"
          type="number"
          value={editGoal.targetAmount}
          onChange={(e) =>
            setEditGoal({
              ...editGoal,
              targetAmount: Number(e.target.value),
            })
          }
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="editCurrentAmount">Current Amount</Label>
        <Input
          id="editCurrentAmount"
          type="number"
          value={editGoal.currentAmount}
          onChange={(e) =>
            setEditGoal({
              ...editGoal,
              currentAmount: Number(e.target.value),
            })
          }
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="editCategory">Category</Label>
        <Input
          id="editCategory"
          value={editGoal.category}
          onChange={(e) =>
            setEditGoal({ ...editGoal, category: e.target.value })
          }
          className="bg-[#2c2c2e] border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="editDeadline">Deadline</Label>
        <Input
          id="editDeadline"
          type="date"
          value={editGoal.deadline.toISOString().split("T")[0]}
          onChange={(e) =>
            setEditGoal({
              ...editGoal,
              deadline: new Date(e.target.value),
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
          onClick={onCancel}
          className="flex-1 bg-gray-500 hover:bg-gray-600"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
