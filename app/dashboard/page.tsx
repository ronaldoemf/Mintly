"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFinancialProfile } from "@/contexts/FinancialProfileContext";
import Dashboard from "@/components/Dashboard";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const router = useRouter();
  const { profile } = useFinancialProfile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if profile exists in localStorage
    const savedProfile = localStorage.getItem("financialProfile");

    if (!savedProfile && !profile) {
      router.push("/onboarding");
    } else {
      // Add a minimum loading time of 1.5 seconds for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [profile, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Dashboard transactions={[]} />;
}
