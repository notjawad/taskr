import { DashboardNav } from "@/app/components/dashboard-nav";
import { ReactNode } from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getData({
  email,
  id,
  firstName,
  lastName,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
    select: {
      userId: true,
    },
  });

  if (!user) {
    const name = `${firstName || ""} ${lastName || ""}`;
    const newUser = await prisma.user.create({
      data: {
        userId: id,
        email: email,
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create a default task for the new user
    await prisma.task.create({
      data: {
        taskId: "1",
        title: "This is your first task",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: newUser.userId,
      },
    });

    revalidatePath("/", "layout");
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getData({
    email: user.email as string,
    id: user.id as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
