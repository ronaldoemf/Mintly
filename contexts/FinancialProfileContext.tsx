"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FinancialProfile = {
  monthlyIncome: number;
  monthlyExpenses: number;
  topExpenseCategory: string;
  savingsGoal: string;
  financialRiskTolerance: string;
};

type FinancialProfileContextType = {
  profile: FinancialProfile | null;
  setProfile: (profile: FinancialProfile) => void;
};

const FinancialProfileContext = createContext<
  FinancialProfileContextType | undefined
>(undefined);

export const useFinancialProfile = () => {
  const context = useContext(FinancialProfileContext);
  if (!context) {
    throw new Error(
      "useFinancialProfile must be used within a FinancialProfileProvider",
    );
  }
  return context;
};

export const FinancialProfileProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [profile, setProfile] = useState<FinancialProfile | null>(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("financialProfile");
      return savedProfile ? JSON.parse(savedProfile) : null;
    }
    return null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem("financialProfile", JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <FinancialProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </FinancialProfileContext.Provider>
  );
};
