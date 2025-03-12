import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Import your dbConnect function
import Budget from "@/models/Budget"; // Import the Budget model

// GET request - fetch budgets
export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB
    const budgets = await Budget.find(); // Fetch all budgets from the database
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching budgets", error },
      { status: 500 },
    );
  }
}

// POST request - add a new budget
export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const newBudget = await req.json(); // Parse the request body

    // Validate the request body
    if (!newBudget.category || !newBudget.allocated) {
      return NextResponse.json(
        { message: "Category and allocated amount are required" },
        { status: 400 },
      );
    }

    // Create a new budget in the database
    const budget = await Budget.create({
      category: newBudget.category,
      allocated: newBudget.allocated,
      spent: newBudget.spent || 0, // Default to 0 if not provided
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding budget", error },
      { status: 500 },
    );
  }
}

// PUT request - update a budget
export async function PUT(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const { id, ...updatedData } = await req.json(); // Parse the request body

    // Validate the request body
    if (!id || !updatedData.category || !updatedData.allocated) {
      return NextResponse.json(
        { message: "ID, category, and allocated amount are required" },
        { status: 400 },
      );
    }

    // Update the budget in the database
    const budget = await Budget.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating budget", error },
      { status: 500 },
    );
  }
}

// DELETE request - delete a budget
export async function DELETE(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const { id } = await req.json(); // Parse the request body

    // Validate the request body
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Delete the budget from the database
    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Budget deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting budget", error },
      { status: 500 },
    );
  }
}
