"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import { useFinancialProfile } from "@/contexts/FinancialProfileContext";

type OnboardingData = {
  monthlyIncome: number;
  monthlyExpenses: number;
  currentBalance: number; // New field
  totalIncome: number; // New field
  totalExpenses: number; // New field
  topExpenseCategory: string;
  otherTopExpenseCategory?: string;
  savingsGoal: string;
  otherSavingsGoal?: string;
  financialRiskTolerance: string;
};

const expenseCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Clothing",
  "Debt Payments",
  "Other",
];

const savingsGoals = [
  "Emergency Fund",
  "Retirement",
  "Home Purchase",
  "Debt Repayment",
  "Travel",
  "Education",
  "Other",
];

export default function UserOnboardingForm() {
  const router = useRouter();
  const { setProfile } = useFinancialProfile();
  const [formData, setFormData] = useState<OnboardingData>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    currentBalance: 0, // Initialize new fields
    totalIncome: 0,
    totalExpenses: 0,
    topExpenseCategory: "",
    savingsGoal: "",
    financialRiskTolerance: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("monthly") ||
        name.includes("total") ||
        name.includes("current")
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = { ...formData };

    if (profileData.topExpenseCategory === "Other") {
      profileData.topExpenseCategory =
        profileData.otherTopExpenseCategory || "Other";
    }

    if (profileData.savingsGoal === "Other") {
      profileData.savingsGoal = profileData.otherSavingsGoal || "Other";
    }

    delete profileData.otherTopExpenseCategory;
    delete profileData.otherSavingsGoal;

    // Set the profile first
    setProfile(profileData);

    router.push("/dashboard");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 gradient-bg"
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transition}
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to Mintly
          </h1>
          <p className="mt-2 text-muted-foreground">
            Let's set up your financial profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">
              1. What is your monthly income?
            </Label>
            <Input
              id="monthlyIncome"
              name="monthlyIncome"
              type="number"
              placeholder="Enter amount"
              value={formData.monthlyIncome}
              onChange={handleInputChange}
              className="bg-background/50 backdrop-blur-sm border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyExpenses">
              2. Approximately how much are your monthly expenses?
            </Label>
            <Input
              id="monthlyExpenses"
              name="monthlyExpenses"
              type="number"
              placeholder="Enter amount"
              value={formData.monthlyExpenses}
              onChange={handleInputChange}
              className="bg-background/50 backdrop-blur-sm border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentBalance">
              3. What is your current balance?
            </Label>
            <Input
              id="currentBalance"
              name="currentBalance"
              type="number"
              placeholder="Enter amount"
              value={formData.currentBalance}
              onChange={handleInputChange}
              className="bg-background/50 backdrop-blur-sm border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalIncome">4. What is your total income?</Label>
            <Input
              id="totalIncome"
              name="totalIncome"
              type="number"
              placeholder="Enter amount"
              value={formData.totalIncome}
              onChange={handleInputChange}
              className="bg-background/50 backdrop-blur-sm border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalExpenses">
              5. What is your total expenses?
            </Label>
            <Input
              id="totalExpenses"
              name="totalExpenses"
              type="number"
              placeholder="Enter amount"
              value={formData.totalExpenses}
              onChange={handleInputChange}
              className="bg-background/50 backdrop-blur-sm border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topExpenseCategory">
              6. Where do you spend most of your monthly salary?
            </Label>
            <Select
              value={formData.topExpenseCategory}
              onValueChange={(value) =>
                handleSelectChange("topExpenseCategory", value)
              }
            >
              <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.topExpenseCategory === "other" && (
              <Input
                id="otherTopExpenseCategory"
                name="otherTopExpenseCategory"
                placeholder="Please specify"
                value={formData.otherTopExpenseCategory || ""}
                onChange={handleInputChange}
                className="mt-2 bg-background/50 backdrop-blur-sm border-border"
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="savingsGoal">
              7. What is your primary savings goal?
            </Label>
            <Select
              value={formData.savingsGoal}
              onValueChange={(value) =>
                handleSelectChange("savingsGoal", value)
              }
            >
              <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                {savingsGoals.map((goal) => (
                  <SelectItem key={goal} value={goal.toLowerCase()}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.savingsGoal === "other" && (
              <Input
                id="otherSavingsGoal"
                name="otherSavingsGoal"
                placeholder="Please specify"
                value={formData.otherSavingsGoal || ""}
                onChange={handleInputChange}
                className="mt-2 bg-background/50 backdrop-blur-sm border-border"
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="financialRiskTolerance">
              8. How would you describe your financial risk tolerance?
            </Label>
            <Select
              value={formData.financialRiskTolerance}
              onValueChange={(value) =>
                handleSelectChange("financialRiskTolerance", value)
              }
            >
              <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border">
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">
                  Conservative (Low risk)
                </SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">
                  Aggressive (High risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Complete Profile
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
