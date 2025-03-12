"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn, scaleIn, transition } from "@/utils/animations"

type SettingsDialogProps = {
  onClose: () => void
}

export default function SettingsDialog({ onClose }: SettingsDialogProps) {
  const [username, setUsername] = useState("JohnDoe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg")
  const [currency, setCurrency] = useState("USD")
  const [notifications, setNotifications] = useState(true)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // In a real application, you would save the settings to the backend here
    console.log("Settings saved:", { username, email, currency, notifications })
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={transition}
    >
      <motion.div className="bg-[#1c1c1e] p-6 rounded-lg w-full max-w-md" variants={scaleIn} transition={transition}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-white">{username}</h3>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="avatar-upload" className="text-gray-300">
              Change Profile Picture
            </Label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 bg-[#2c2c2e] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-gray-300">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 bg-[#2c2c2e] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-[#2c2c2e] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="currency" className="text-gray-300">
              Preferred Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="mt-1 bg-[#2c2c2e] border-gray-700 text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#2c2c2e] border-gray-700 text-white">
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-gray-300">
                Notifications
              </Label>
              <p className="text-sm text-gray-400">Receive email notifications about your finances</p>
            </div>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <Button className="w-full bg-[#ff6b00] hover:bg-[#ff8533] text-white" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

