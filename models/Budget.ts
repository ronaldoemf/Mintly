import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  allocated: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);
