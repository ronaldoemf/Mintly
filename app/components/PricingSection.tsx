// PricingSection.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const plans = [
  {
    name: "Free",
    price: "Free",
    features: [
      "5 AI interactions per day",
      "Basic AI financial analysis",
      "Limited AI chat assistance",
      "Basic Budgeting",
      "Monthly Reports",
      "Mobile App Access",
    ],
  },
  {
    name: "Pro",
    price: "€4.99",
    features: [
      "All Basic Features",
      "Advanced Budgeting",
      "Investment Tracking",
      "Bill Reminders",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "€30.00",
    features: [
      "All Pro Features",
      "Multi-User Access",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Advanced Analytics",
    ],
  },
];

export default function PricingSection() {
  const router = useRouter();

  const handlePlanSelection = (plan: string, price: string) => {
    if (plan === "Free") {
      router.push("/dashboard");
    } else {
      const params = new URLSearchParams({
        plan,
        amount: price,
      });
      router.push(`/payment?${params.toString()}`);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSectionHeader title="Choose Your Plan" />
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-700">
                <button
                  onClick={() => handlePlanSelection(plan.name, plan.price)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
