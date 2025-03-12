"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/utils/animations";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import TopBar from "@/components/TopBar"; // Import the TopBar component
import { Pencil, Trash2 } from "lucide-react"; // Import icons for edit and delete

type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  category: string;
  isPaid: boolean;
};

const billCategories = [
  "Utilities",
  "Rent/Mortgage",
  "Insurance",
  "Subscriptions",
  "Credit Card",
  "Other",
];

export default function BillManagementPage() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      name: "Electricity",
      amount: 80,
      dueDate: new Date(2024, 1, 15),
      category: "Utilities",
      isPaid: false,
    },
    {
      id: "2",
      name: "Rent",
      amount: 1200,
      dueDate: new Date(2024, 2, 1),
      category: "Rent/Mortgage",
      isPaid: false,
    },
    {
      id: "3",
      name: "Internet",
      amount: 60,
      dueDate: new Date(2024, 1, 20),
      category: "Utilities",
      isPaid: true,
    },
  ]);

  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: new Date(),
    category: "",
  });

  const [editingBillId, setEditingBillId] = useState<string | null>(null);

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBill.name && newBill.amount && newBill.category) {
      setBills([
        ...bills,
        {
          id: Math.random().toString(),
          name: newBill.name,
          amount: Number(newBill.amount),
          dueDate: newBill.dueDate,
          category: newBill.category,
          isPaid: false,
        },
      ]);
      setNewBill({ name: "", amount: "", dueDate: new Date(), category: "" });
    }
  };

  const togglePaidStatus = (id: string) => {
    setBills(
      bills.map((bill) =>
        bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill,
      ),
    );
  };

  const handleEditBill = (updatedBill: Bill) => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === updatedBill.id ? updatedBill : bill,
      ),
    );
    setEditingBillId(null);
  };

  const handleRemoveBill = (billId: string) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== billId));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* TopBar */}
        <TopBar />

        {/* Page Content */}
        <motion.div
          className="p-8 pt-24" // Added pt-24 to account for the TopBar height
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="text-2xl font-bold text-white mb-6">
            Bill Management
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBill} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Bill Name</Label>
                    <Input
                      id="name"
                      value={newBill.name}
                      onChange={(e) =>
                        setNewBill({ ...newBill, name: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newBill.amount}
                      onChange={(e) =>
                        setNewBill({ ...newBill, amount: e.target.value })
                      }
                      className="bg-[#2c2c2e] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newBill.category}
                      onValueChange={(value) =>
                        setNewBill({ ...newBill, category: value })
                      }
                    >
                      <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {billCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Calendar
                      mode="single"
                      selected={newBill.dueDate}
                      onSelect={(date) =>
                        date && setNewBill({ ...newBill, dueDate: date })
                      }
                      className="rounded-md border border-gray-700"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Bill
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bills
                    .filter((bill) => !bill.isPaid)
                    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                    .map((bill) => (
                      <div
                        key={bill.id}
                        className="flex items-center justify-between p-4 bg-[#2c2c2e] rounded-lg"
                      >
                        {editingBillId === bill.id ? (
                          <div className="w-full">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleEditBill(bill);
                              }}
                              className="space-y-4"
                            >
                              <div>
                                <Label htmlFor="editName">Name</Label>
                                <Input
                                  id="editName"
                                  value={bill.name}
                                  onChange={(e) =>
                                    setBills((prevBills) =>
                                      prevBills.map((prevBill) =>
                                        prevBill.id === bill.id
                                          ? {
                                              ...prevBill,
                                              name: e.target.value,
                                            }
                                          : prevBill,
                                      ),
                                    )
                                  }
                                  className="bg-[#2c2c2e] border-gray-700 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="editAmount">Amount</Label>
                                <Input
                                  id="editAmount"
                                  type="number"
                                  value={bill.amount}
                                  onChange={(e) =>
                                    setBills((prevBills) =>
                                      prevBills.map((prevBill) =>
                                        prevBill.id === bill.id
                                          ? {
                                              ...prevBill,
                                              amount: Number(e.target.value),
                                            }
                                          : prevBill,
                                      ),
                                    )
                                  }
                                  className="bg-[#2c2c2e] border-gray-700 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="editCategory">Category</Label>
                                <Select
                                  value={bill.category}
                                  onValueChange={(value) =>
                                    setBills((prevBills) =>
                                      prevBills.map((prevBill) =>
                                        prevBill.id === bill.id
                                          ? { ...prevBill, category: value }
                                          : prevBill,
                                      ),
                                    )
                                  }
                                >
                                  <SelectTrigger className="bg-[#2c2c2e] border-gray-700 text-white">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {billCategories.map((category) => (
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
                                        {category}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Due Date</Label>
                                <Calendar
                                  mode="single"
                                  selected={bill.dueDate}
                                  onSelect={(date) =>
                                    date &&
                                    setBills((prevBills) =>
                                      prevBills.map((prevBill) =>
                                        prevBill.id === bill.id
                                          ? { ...prevBill, dueDate: date }
                                          : prevBill,
                                      ),
                                    )
                                  }
                                  className="rounded-md border border-gray-700"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button type="submit" className="flex-1">
                                  Save
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => setEditingBillId(null)}
                                  className="flex-1 bg-gray-500 hover:bg-gray-600"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <>
                            <div>
                              <h3 className="font-medium text-white">
                                {bill.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {bill.category} - Due:{" "}
                                {bill.dueDate.toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="font-medium text-white">
                                ${bill.amount}
                              </p>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingBillId(bill.id)}
                                  className="text-[#28c45c] hover:text-[#28c45c]"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveBill(bill.id)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => togglePaidStatus(bill.id)}
                                >
                                  Mark as Paid
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Paid Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bills
                  .filter((bill) => bill.isPaid)
                  .map((bill) => (
                    <div
                      key={bill.id}
                      className="flex items-center justify-between p-4 bg-[#2c2c2e] rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-white">{bill.name}</h3>
                        <p className="text-sm text-gray-400">
                          {bill.category} - Paid on:{" "}
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-medium text-white">${bill.amount}</p>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingBillId(bill.id)}
                            className="text-[#28c45c] hover:text-[#28c45c]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBill(bill.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePaidStatus(bill.id)}
                          >
                            Mark as Unpaid
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
