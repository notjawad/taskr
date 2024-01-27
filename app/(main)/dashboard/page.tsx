import moment from "moment";
import prisma from "@/lib/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlusCircleIcon, Clock3, MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import MarkCompleteButton from "@/app/components/mark-complete-button";
import DeleteTaskButton from "@/app/components/delete-task.button";
import CreateTaskDialog from "@/app/components/create-task-dialog";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const tasks = await prisma.task.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  async function markTaskAsComplete(taskId: string) {
    "use server";
    const task = await prisma.task.findUnique({
      where: {
        taskId: taskId,
      },
    });

    if (!task) {
      return;
    }

    await prisma.task.update({
      where: {
        taskId: taskId,
      },
      data: {
        completed: !task.completed,
      },
    });

    revalidatePath("/", "layout");
  }

  async function deleteTask(taskId: string) {
    "use server";
    await prisma.task.delete({
      where: {
        taskId: taskId,
      },
    });

    revalidatePath("/", "layout");
  }

  async function createTask(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");

    if (title && description) {
      await prisma.task.create({
        data: {
          userId: user?.id as string,
          title: title as string,
          description: description as string,
          createdAt: new Date(),
          taskId: (Date.now() + Math.random()).toString(36),
        },
      });

      revalidatePath("/", "layout");
    }
  }

  // Completed tasks appear at the bottom of the list
  tasks.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    }

    if (!a.completed && b.completed) {
      return -1;
    }

    return 0;
  });

  return (
    <div className="flex flex-col justify-center border rounded p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        <CreateTaskDialog createTask={createTask} />
      </div>
      <div className="overflow-y-auto max-h-[600px] no-scrollbar">
        {tasks.length > 0 ? (
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <div
                key={task.taskId}
                className="flex items-center justify-between bg-accent/10 p-4 rounded"
              >
                <div>
                  <h3
                    className={cn(
                      "font-bold",
                      task.completed && "line-through"
                    )}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground",
                      task.completed && "line-through"
                    )}
                  >
                    {task.description}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-x-1 mt-1">
                      <Clock3 className="w-3 h-3" />
                      {moment(task.createdAt).fromNow()}
                    </span>
                    <div className="text-xs text-muted-foreground flex items-center gap-x-1 mt-1">
                      {task.completed && (
                        <div className="flex items-center gap-x-1 text-green-500">
                          <div className="bg-green-500 rounded-full w-2 h-2"></div>
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="select-none outline-none">
                    <MoreVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <MarkCompleteButton
                        taskId={task.taskId}
                        taskTitle={task.title}
                        markTaskAsComplete={markTaskAsComplete}
                        completed={task.completed}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DeleteTaskButton
                        taskId={task.taskId}
                        taskTitle={task.title}
                        deleteTask={deleteTask}
                        className="text-rose-500 w-full text-left"
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground">
              You have no tasks, add one by clicking the{" "}
              <PlusCircleIcon className="inline-block w-4 h-4 mb-1" /> icon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
