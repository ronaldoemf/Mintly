"use client"

import { motion } from "framer-motion"
import { Calculator, LineChart, TrendingUp, BrainCircuit, Shield, Bell, CreditCard, Zap } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function Features() {
  const features = [
    {
      icon: <Calculator className="w-12 h-12 text-green-500" />,
      title: "Smart Budgeting",
      description:
        "Our AI-powered budget recommendations adapt to your spending habits and financial goals. Get personalized insights on where to cut back and how to allocate your resources more effectively.",
    },
    {
      icon: <LineChart className="w-12 h-12 text-cyan-500" />,
      title: "Advanced Expense Tracking",
      description:
        "Automatically categorize and visualize your expenses with machine learning. Gain deeper insights into your spending patterns with detailed breakdowns and trend analysis.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-teal-500" />,
      title: "Investment Insights",
      description:
        "Receive personalized investment suggestions based on your risk profile and financial goals. Track your portfolio performance in real-time and get AI-driven recommendations for optimizing your investments.",
    },
    {
      icon: <BrainCircuit className="w-12 h-12 text-blue-500" />,
      title: "Predictive Financial Analysis",
      description:
        "Leverage the power of machine learning to forecast your financial future. Our models consider your income, expenses, and market trends to help you make informed decisions about savings, investments, and major purchases.",
    },
    {
      icon: <Shield className="w-12 h-12 text-indigo-500" />,
      title: "Bank-Level Security",
      description:
        "Rest easy knowing your financial data is protected with state-of-the-art encryption and security measures. We employ the same level of security as major banks to keep your sensitive information safe.",
    },
    {
      icon: <Bell className="w-12 h-12 text-purple-500" />,
      title: "Smart Alerts and Notifications",
      description:
        "Stay on top of your finances with intelligent alerts. Get notified about unusual spending, upcoming bills, investment opportunities, and potential savings based on your financial behavior.",
    },
    {
      icon: <CreditCard className="w-12 h-12 text-pink-500" />,
      title: "Credit Score Optimization",
      description:
        "Understand and improve your credit score with AI-driven recommendations. Receive personalized advice on how to boost your creditworthiness and track your progress over time.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Automated Financial Goals",
      description:
        "Set and achieve your financial goals with ease. Our AI assistant helps you create realistic targets, tracks your progress, and automatically adjusts your budget to keep you on track.",
    },
  ]

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Powerful Features for Your Financial Success" />
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Harness the power of artificial intelligence to take control of your finances. Our comprehensive suite of
          features is designed to help you budget, save, invest, and grow your wealth with confidence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-green-300 to-cyan-400 text-white shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}

