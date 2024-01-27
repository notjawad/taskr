"use client";

import { ComponentProps } from "react";
import { toast } from "sonner";

interface DeleteTaskButtonProps extends ComponentProps<"button"> {
  taskId: string;
  taskTitle: string;
  deleteTask: (taskId: string) => Promise<void>;
}

export default function DeleteTaskButton({
  taskId,
  taskTitle,
  deleteTask,
  className,
  ...props
}: DeleteTaskButtonProps) {
  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    toast.success(`Deleted "${taskTitle}"`);
  };

  return (
    <button className={className} onClick={handleDeleteTask} {...props}>
      Delete
    </button>
  );
}
