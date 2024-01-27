"use client";

import { ComponentProps } from "react";
import { toast } from "sonner";

interface MarkCompleteButtonProps extends ComponentProps<"button"> {
  taskId: string;
  taskTitle: string;
  completed: boolean;
  markTaskAsComplete: (taskId: string) => Promise<void>;
}

export default function MarkCompleteButton({
  taskId,
  taskTitle,
  completed,
  markTaskAsComplete,
  className,
  ...props
}: MarkCompleteButtonProps) {
  const handleMarkComplete = async () => {
    await markTaskAsComplete(taskId);
    toast.success(
      `Task "${taskTitle}" marked as ${completed ? "incomplete" : "complete"}`
    );
  };

  return (
    <button className={className} onClick={handleMarkComplete} {...props}>
      {completed ? "Mark  as incomplete" : "Mark as complete"}
    </button>
  );
}
