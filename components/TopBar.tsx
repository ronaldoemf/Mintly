"use client";

import { Bell, Sun, Moon, Settings, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import NotificationsDialog from "./NotificationsDialog";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import SettingsDialog from "./SettingsDialog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false); // State for Terms pop-up
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const pageTitles: Record<string, string> = {
    statistics: "Statistics & Income",
    budgeting: "Budgeting",
    expenses: "Expenses Tracking",
    investments: "Investments",
    bills: "Bill Management",
    goals: "Financial Goals",
    onboarding: "Onboarding",
  };

  const breadcrumb =
    pathname === "/"
      ? "Dashboard"
      : pageTitles[pathname.slice(1)] || pathname.slice(1);

  // Handle logout
  const handleLogout = () => {
    router.push("/"); // Redirect to landing page
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-64 right-0 h-16 bg-card/80 backdrop-blur-sm border-b border-border px-6 flex items-center justify-between z-40"
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={transition}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Mintly
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{breadcrumb}</span>
        </div>

        <div className="flex items-center gap-2">
          {!pathname.includes("onboarding") && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsNotificationsOpen(true)}
              >
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        Financial Planner
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowTermsPopup(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Terms & Policies</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </motion.div>

      {isNotificationsOpen && (
        <NotificationsDialog onClose={() => setIsNotificationsOpen(false)} />
      )}
      {showSettings && (
        <SettingsDialog onClose={() => setShowSettings(false)} />
      )}

      {/* Terms & Policies Pop-up */}
      {showTermsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Terms & Policies
            </h2>
            <p className="text-sm text-muted-foreground">
              Here are the terms and policies for using Mintly. Please review
              them carefully.
            </p>
            <Button
              onClick={() => setShowTermsPopup(false)}
              className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
