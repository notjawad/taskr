import { cn } from "@/lib/utils";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ComponentProps } from "react";

import Link from "next/link";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";

export default async function Navbar({
  className,
  ...props
}: ComponentProps<"nav">) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav
      {...props}
      className={cn(
        "border-b bg-background h-[10vh] flex items-center",
        className
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">Taskr</h1>
        </Link>
        <div className="flex items-center gap-x-3">
          <ThemeToggle />
          {(await isAuthenticated()) ? (
            <UserNav user={user} />
          ) : (
            <div className="flex items-center gap-x-3">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
