// AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900"
    >
      <div className="container mx-auto px-4">
        <AnimatedSectionHeader title="About Mintly" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At Mintly, we're on a mission to democratize financial
              intelligence and empower individuals to take control of their
              financial future. We believe that everyone, regardless of their
              background or expertise, should have access to sophisticated
              financial tools and insights traditionally reserved for the
              wealthy.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Our AI-powered platform combines cutting-edge technology with
              user-friendly design to provide personalized financial guidance.
              We're not just another budgeting app – we're your intelligent
              financial companion, helping you navigate the complex world of
              personal finance with confidence and ease.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              From budgeting and expense tracking to investment insights and
              predictive analysis, FinanceAI is designed to grow with you on
              your financial journey. Whether you're just starting to manage
              your money or you're looking to optimize your investments, we're
              here to provide the tools and knowledge you need to succeed.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Learn how we can help you <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="/images/graphics.webp" // Updated to WebP format
              alt="FinanceAI Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly push the boundaries of what's possible in fintech. Our team of data scientists and financial experts work tirelessly to develop new algorithms and features that provide unparalleled insights into your financial life.",
              },
              {
                title: "Transparency",
                description:
                  "We believe in clear, honest communication with our users and partners. From our pricing model to our data handling practices, we strive to be open and transparent in everything we do.",
              },
              {
                title: "Empowerment",
                description:
                  "Our goal is to give you the knowledge and tools to take control of your finances. We don't just provide information – we offer actionable insights and education to help you make informed decisions and achieve your financial goals.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
