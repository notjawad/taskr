import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 mx-auto py-12 lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary border-black/10 dark:border-white/10 border">
              <span className="text-sm font-medium text-primary">
                Lorem ipsum dolor sit
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Track your tasks with{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Taskr
              </span>
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              magnam reprehenderit, temporibus odio similique quos. Nostrum
              voluptatem veritatis necessitatibus velit esse praesentium non
              quas, blanditiis, possimus animi eveniet eius ipsam.
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
              <Button size="lg" className="">
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
