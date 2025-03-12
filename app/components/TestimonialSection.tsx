"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "Mintly has transformed the way I manage my business finances. The insights and predictions are incredibly accurate!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Personal Finance Enthusiast",
    content:
      "I've tried many finance apps, but Mintly stands out with its AI-powered recommendations. It's like having a personal financial advisor.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    content:
      "As a freelancer, managing finances was always a challenge. Mintly has made it so much easier to track income, expenses, and plan for taxes.",
    avatar: "/placeholder.svg",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, []) // Removed nextTestimonial from dependencies

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-teal-900 dark:to-green-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{testimonials[currentIndex].content}"</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  )
}

