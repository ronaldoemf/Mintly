import type { Expense } from "./FinanceTracker"
import { expenseCategories } from "../utils/categories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

type FinancialInsightsProps = {
  expenses: Expense[]
}

export default function FinancialInsights({ expenses }: FinancialInsightsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const categorySums = expenses.reduce(
    (sums, expense) => {
      sums[expense.category] = (sums[expense.category] || 0) + expense.amount
      return sums
    },
    {} as Record<string, number>,
  )

  const topCategories = Object.entries(categorySums)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const getCategoryName = (categoryId: string) => {
    const category = expenseCategories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Other"
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = expenseCategories.find((cat) => cat.id === categoryId)
    return category ? category.icon : "❓"
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <Card className="bg-[#1c1c1e] border-none text-white">
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Top Spending Categories</h3>
          <ul className="space-y-2">
            {topCategories.map(([category, amount]) => (
              <li key={category} className="flex justify-between items-center">
                <span>
                  {getCategoryIcon(category)} {getCategoryName(category)}
                </span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Expense Distribution</h3>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCategories.map(([category, value]) => ({ name: getCategoryName(category), value }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

