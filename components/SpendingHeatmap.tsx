"use client"

import type React from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/types/finance"

type SpendingHeatmapProps = {
  transactions: Transaction[]
}

const SpendingHeatmap: React.FC<SpendingHeatmapProps> = ({ transactions }) => {
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1)

  const spendingByDate = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "expense") {
        const date = transaction.date.split("T")[0]
        acc[date] = (acc[date] || 0) + transaction.amount
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const heatmapValues = Object.entries(spendingByDate).map(([date, amount]) => ({
    date,
    count: amount,
  }))

  const getColor = (value: number) => {
    if (!value) return "color-empty"
    const maxSpending = Math.max(...Object.values(spendingByDate))
    const intensity = Math.min(Math.floor((value / maxSpending) * 4) + 1, 4)
    return `color-scale-${intensity}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={heatmapValues}
          classForValue={(value) => getColor(value ? value.count : 0)}
          titleForValue={(value) => (value ? `$${value.count.toFixed(2)} on ${value.date}` : "No spending")}
        />
      </CardContent>
    </Card>
  )
}

export default SpendingHeatmap

