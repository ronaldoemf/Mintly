"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { motion } from "framer-motion";

interface UndoButtonProps {
  showUndo: boolean;
  lastAction: { type: "add" | "remove" } | null;
  onUndo: () => void;
}

export default function UndoButton({
  showUndo,
  lastAction,
  onUndo,
}: UndoButtonProps) {
  if (!showUndo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-[90px] right-4 p-2 rounded-lg shadow-lg z-50"
      style={{ backgroundColor: "#080c14" }} // Updated background color
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onUndo}
        className="flex items-center space-x-2"
        style={{
          backgroundColor: "#28c45c",
          borderColor: "#28c45c",
          color: "white",
        }}
      >
        <Undo2 className="h-4 w-4" />
        <span>Undo {lastAction?.type === "add" ? "Add" : "Remove"}</span>
      </Button>
    </motion.div>
  );
}
