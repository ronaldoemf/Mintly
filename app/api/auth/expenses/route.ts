// app/api/expenses/route.ts
import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import db from "@/lib/db";

export async function GET() {
  await db;
  const expenses = await Expense.find({});
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  await db;
  const { date, category, description, amount } = await request.json();
  const newExpense = new Expense({ date, category, description, amount });
  await newExpense.save();
  return NextResponse.json(newExpense);
}

export async function PUT(request: Request) {
  await db;
  const { id, date, category, description, amount } = await request.json();
  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    { date, category, description, amount },
    { new: true },
  );
  return NextResponse.json(updatedExpense);
}

export async function DELETE(request: Request) {
  await db;
  const { id } = await request.json();
  await Expense.findByIdAndDelete(id);
  return NextResponse.json({ message: "Expense deleted" });
}
