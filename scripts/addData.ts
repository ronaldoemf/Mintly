import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Create a user
  const newUser = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      passwordHash: "hashedPassword123",
    },
  });
  console.log("Created user:", newUser);

  // 2) Create an expense for that user
  const expense = await prisma.expense.create({
    data: {
      userId: newUser.id, // referencing the user we just created
      amount: 42.5,
      category: "Groceries",
      description: "Weekly shopping",
    },
  });
  console.log("Created expense:", expense);

  // 3) Create a financial goal
  const goal = await prisma.financialGoal.create({
    data: {
      userId: newUser.id,
      goalName: "Emergency Fund",
      targetAmount: 1000,
      currentAmount: 100,
    },
  });
  console.log("Created goal:", goal);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
