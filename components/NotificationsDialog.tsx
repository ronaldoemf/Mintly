import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

type Notification = {
  id: string
  title: string
  message: string
  date: Date
  isRead: boolean
}

type NotificationsDialogProps = {
  onClose: () => void
}

export default function NotificationsDialog({ onClose }: NotificationsDialogProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Bill Due Soon",
      message: "Your electricity bill is due in 3 days.",
      date: new Date(2024, 1, 15),
      isRead: false,
    },
    {
      id: "2",
      title: "Investment Update",
      message: "Your stock portfolio has increased by 5% this month.",
      date: new Date(2024, 1, 10),
      isRead: true,
    },
    {
      id: "3",
      title: "Goal Milestone",
      message: "Congratulations! You've reached 50% of your Emergency Fund goal.",
      date: new Date(2024, 1, 5),
      isRead: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
      <Card className="w-full max-w-md bg-[#1c1c1e] border-none text-white mt-16 mr-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-[#1c1c1e] z-10">
          <CardTitle className="text-xl font-bold">Notifications</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {unreadCount > 0 && (
            <div className="mb-4 text-sm text-gray-400">
              You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}.
            </div>
          )}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${notification.isRead ? "bg-[#2c2c2e]" : "bg-[#3a3a3c]"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{notification.title}</h3>
                    <p className="text-sm text-gray-400">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.date.toLocaleDateString()}</p>
                  </div>
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {notifications.length === 0 && <p className="text-center text-gray-400">No notifications at this time.</p>}
        </CardContent>
      </Card>
    </div>
  )
}

