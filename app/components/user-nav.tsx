"use client";

import { ComponentProps } from "react";
import Link from "next/link";

import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];

interface UserNavProps extends ComponentProps<"nav"> {
  user: KindeUser | null;
}

export function UserNav({ user, className, ...props }: UserNavProps) {
  return (
    <nav {...props} className={cn("", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer select-none">
            <AvatarImage
              src={user?.picture || ""}
              alt={user?.given_name || "User Avatar"}
            />
            <AvatarFallback>
              {user?.given_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium truncate">{user?.given_name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {navItems.map((item, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link
                  className="w-full flex justify-between items-center"
                  href={item.href}
                >
                  <span>{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full flex justify-between items-center text-rose-500"
            asChild
          >
            <LogoutLink>
              Logout
              <span>
                <DoorClosed className="h-5 w-5" />
              </span>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
