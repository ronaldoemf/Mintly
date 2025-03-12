// Hero.tsx
"use client";

import Image from "next/image";
import { PieChart, BarChart, Wallet, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const FinancePattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <pattern
      id="finance-pattern"
      x="0"
      y="0"
      width="50"
      height="50"
      patternUnits="userSpaceOnUse"
      patternContentUnits="userSpaceOnUse"
    >
      <path
        d="M25,2 L2,25 M48,25 L25,48 M25,2 L48,25 L25,48 L2,25 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </pattern>
    <rect
      id="bg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#finance-pattern)"
    ></rect>
  </svg>
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-20 pb-20 relative overflow-hidden bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900"
    >
      {/* Finance-themed Background */}
      <div className="absolute inset-0 z-0">
        <FinancePattern />
      </div>

      {/* Animated Gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 animate-gradient-x"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-600 dark:from-green-400 dark:to-cyan-400">
              Master Your Finances with AI
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Your Intelligent Financial Companion
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Harness the power of artificial intelligence to transform your
              financial life. FinanceAI provides personalized insights,
              automates your budgeting, and helps you achieve your financial
              goals with unprecedented ease and accuracy.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <div className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
                <PieChart className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
                <BarChart className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
                <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <motion.button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white rounded-full hover:from-green-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Features
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 dark:from-green-600 dark:to-cyan-600 rounded-3xl transform rotate-6 opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 dark:from-cyan-600 dark:to-green-600 rounded-3xl transform -rotate-6 opacity-50"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/money.webp" // Updated to WebP format
                  alt="AI Finance Tracker Dashboard"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-1 h-12 bg-gradient-to-b from-green-600 to-cyan-600 dark:from-green-400 dark:to-cyan-400 rounded-full animate-pulse"></div>
      </motion.div>
    </section>
  );
}
