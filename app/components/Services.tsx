"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Banknote,
  PiggyBank,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";
import Image from "next/image";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const services = [
  {
    icon: <Wallet className="w-12 h-12 text-white" />,
    title: "Comprehensive Personal Finance Management",
    description:
      "Take control of your finances with our all-in-one platform. Track income, expenses, and investments in real-time.",
    color: "from-green-400 to-blue-500",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-white" />,
    title: "Advanced Credit Score Monitoring",
    description:
      "Stay on top of your credit health with our advanced monitoring system. Receive real-time alerts for any changes.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: <Banknote className="w-12 h-12 text-white" />,
    title: "Intelligent Bill Management",
    description:
      "Never miss a payment again. Our smart system tracks all your bills and sends timely reminders.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-white" />,
    title: "Smart Investment Portfolio Management",
    description:
      "Make informed investment decisions with our AI-driven portfolio management tool.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-white" />,
    title: "AI-Powered Savings Goals",
    description:
      "Achieve your financial goals faster with our AI-powered savings planner. Set custom goals and track progress.",
    color: "from-teal-400 to-green-500",
  },
  {
    icon: <HeadphonesIcon className="w-12 h-12 text-white" />,
    title: "24/7 AI-Assisted Customer Support",
    description:
      "Get help whenever you need it with our round-the-clock AI-assisted customer support.",
    color: "from-green-400 to-teal-500",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-teal-900 dark:to-green-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionHeader title="Our Comprehensive Services" />
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover the full range of AI-powered financial services designed to
          transform your financial life. From daily management to long-term
          planning, we've got you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-75`}
              />
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white text-opacity-90">
                    {service.description}
                  </p>
                </div>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <a href="/signup" className="text-white underline">
                    Learn more
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-20">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Decorative background"
          width={256}
          height={256}
        />
      </div>
    </section>
  );
}
