// models/Expense.ts
import { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema({
  date: { type: Date, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;
