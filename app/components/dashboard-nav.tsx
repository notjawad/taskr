"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/app/components/user-nav";

export function DashboardNav({ className, ...props }: ComponentProps<"nav">) {
  const pathname = usePathname();

  return (
    <nav {...props} className={cn("grid items-start gap-2", className)}>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
