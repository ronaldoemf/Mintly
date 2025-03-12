"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type RemoveFunctionalityProps = {
  onRemove: () => void; // Function to handle the removal
};

export function RemoveFunctionality({ onRemove }: RemoveFunctionalityProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onRemove}
      className="text-red-500 hover:text-red-400"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
