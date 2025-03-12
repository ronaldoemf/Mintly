"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { slideIn, transition } from "@/utils/animations";
import {
  LayoutDashboard,
  BarChart2,
  PieChart,
  Wallet,
  Receipt,
  Target,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { useState } from "react"; // Import useState for managing pop-up state

const navigation = {
  overview: [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Analytics", icon: BarChart2, href: "/statistics" },
    { name: "Smart Budgeting", icon: PieChart, href: "/budgeting" },
  ],
  finance: [
    { name: "Expense Tracking", icon: Wallet, href: "/expenses" },
    { name: "Investments", icon: TrendingUp, href: "/investments" },
    { name: "Bills", icon: Receipt, href: "/bills" },
    { name: "Goals", icon: Target, href: "/goals" },
  ],
  other: [
    // Removed the Settings button
    { name: "Help", icon: HelpCircle, href: "#" }, // href is set to "#" to prevent navigation
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false); // State for managing pop-up visibility

  const toggleHelpPopup = () => {
    setIsHelpPopupOpen(!isHelpPopupOpen); // Toggle pop-up visibility
  };

  return (
    <motion.div
      className="fixed left-0 top-0 h-screen w-64 bg-card/80 backdrop-blur-sm border-r border-border"
      initial="initial"
      animate="animate"
      variants={slideIn}
      transition={transition}
    >
      <div className="pt-2 px-6 pb-6">
        <Link href="/" className="flex items-center gap-2 mb-4 px-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mintly_logo-zdSJjKon3rIq8LjxNCnVOa6rdN5ntl.png"
            alt="Mintly Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <div className="space-y-8">
          {!isOnboarding && (
            <>
              <div>
                <h2 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Overview
                </h2>
                <nav className="space-y-1">
                  {navigation.overview.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h2 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Finance
                </h2>
                <nav className="space-y-1">
                  {navigation.finance.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-6">
        <nav className="space-y-1">
          {!isOnboarding &&
            navigation.other.map((item) => (
              <button
                key={item.name}
                onClick={toggleHelpPopup} // Trigger pop-up on click
                className="flex items-center px-4 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors w-full"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
        </nav>
      </div>

      {/* Help Pop-up */}
      {isHelpPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Help Center</h2>
            <p className="text-sm text-muted-foreground">
              Here you can find answers to common questions and get support.
            </p>
            <button
              onClick={toggleHelpPopup}
              className="mt-4 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
