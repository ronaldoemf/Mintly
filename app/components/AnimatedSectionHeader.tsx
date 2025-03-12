"use client"

import { motion } from "framer-motion"

export default function AnimatedSectionHeader({ title }: { title: string }) {
  return (
    <motion.h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
  )
}

