"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CreditCard, Calendar, Lock } from "lucide-react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const formSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format",
    ),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const amount = searchParams.get("amount");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the payment data to your payment processor
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setSubmitSuccess(true);
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard after successful payment
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!plan || !amount) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Payment Request</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please select a plan from our pricing page to proceed with payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSectionHeader title="Complete Your Payment" />
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {plan} Plan
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {amount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                per month
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Cardholder Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Card Number
                </label>
                <div className="relative">
                  <input
                    {...register("cardNumber")}
                    type="text"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.cardNumber
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white pl-10`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      {...register("expiryDate")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.expiryDate
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white pl-10`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      {...register("cvv")}
                      type="text"
                      className={`w-full px-4 py-2 rounded-md border ${
                        errors.cvv
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white pl-10`}
                      placeholder="123"
                      maxLength={4}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>Pay {amount}</>
                )}
              </button>
            </form>
          </div>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-center"
            >
              <p className="text-green-700 dark:text-green-300">
                Payment successful! Redirecting to dashboard...
              </p>
            </motion.div>
          )}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Your payment is secured with bank-level encryption
          </p>
        </motion.div>
      </div>
    </section>
  );
}
