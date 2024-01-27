"use client";

import { ComponentProps, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface CreateTaskDialogProps extends ComponentProps<typeof Dialog> {
  createTask: (formData: FormData) => Promise<void>;
}
export default function CreateTaskDialog({
  createTask,
}: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlusCircleIcon className="w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
          <DialogDescription>
            You can create a new task by filling the form below.
          </DialogDescription>
        </DialogHeader>
        <form action={createTask}>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title"
              required
              defaultValue="My new task"
              maxLength={50}
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-4">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Enter a description"
              required
              defaultValue="My new task description"
              maxLength={100}
            />
          </div>
          <Button onClick={() => setOpen(false)} className="mt-4" type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
