"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center -mt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="mb-4"
        >
          <div className="w-24 h-24 mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mintly_simple-2XomT29sZCrrxaZxHvwWAtrNMjQypD.png"
              alt="Mintly Logo"
              width={120}
              height={120}
              className="w-24 h-24"
            />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Loading Mintly
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          Preparing your financial dashboard...
        </motion.p>
      </div>
    </div>
  )
}

