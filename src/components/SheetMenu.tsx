"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { User } from "@/payload-types";

interface ParsedUser {
  id: string;
  name: string;
}

interface SheetMenuProps {
  user: User | null;
  userInfo: ParsedUser[];
}

export const SheetMenu = ({ user, userInfo }: SheetMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center">
        <span className="p-2 font-medium text-zinc-700 group-hover:text-zinc-800">
          <Menu className="h-7 w-7" />
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <SheetHeader>
          <div className="pb-8 font-serif text-2xl">Walking After Midnight</div>
        </SheetHeader>

        <div className="flex flex-col items-start lg:hidden">
          <SheetClose asChild>
            <Link
              href={`/profile/${user?.id}`}
              className={buttonVariants({ variant: "link", className: "pl-0" })}
            >
              {user?.name}
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/all-albums"
              className={buttonVariants({
                variant: "link",
                className: "pl-0",
              })}
            >
              All Albums
            </Link>
          </SheetClose>
          <Link
            href="/dashboard/collections/albums?limit=10"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Upload Albums
          </Link>
        </div>

        <div className="flex flex-col items-start pt-8">
          <SheetTitle className="">Profiles</SheetTitle>
          {userInfo &&
            userInfo.map((userItem) => (
              <SheetClose asChild key={userItem.id}>
                <Link
                  href={`/profile/${userItem.id}`}
                  className={buttonVariants({
                    variant: "link",
                    className: "pl-0",
                  })}
                >
                  {userItem.name}
                </Link>
              </SheetClose>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
