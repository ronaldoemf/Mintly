import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FinancialProfileProvider } from "@/contexts/FinancialProfileContext";
import { AuthProvider } from "@/lib/auth-context";
import ClientWrapper from "@/app/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mintly - AI Personal Finance Tracker",
  description: "Manage your finances with AI-powered insights",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-bg min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <FinancialProfileProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </FinancialProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
