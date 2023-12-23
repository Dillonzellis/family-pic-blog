"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { User } from "@/payload-types";

interface SheetMenuProps {
  user: User | null;
}

export const SheetMenu = ({ user }: SheetMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center">
        <span className="p-2 font-medium text-zinc-700 group-hover:text-zinc-800">
          <Menu className="h-7 w-7" />
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <SheetHeader className="">
          <SheetTitle className="pb-8 font-serif">
            Walking After Midnight
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start lg:hidden">
          <Link
            href={`/profile/${user?.id}`}
            className={buttonVariants({ variant: "link", className: "pl-0" })}
          >
            {user?.name}
          </Link>
          <Link
            href="/all-albums"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            All Albums
          </Link>
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

        <div className="flex flex-col items-start">
          <SheetTitle className="">Profiles</SheetTitle>
          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Brittany
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Dillon
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Lindsey
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Luke
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Nana & Papaw
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Nishala
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Resia
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Ronnie
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Sam
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Tucker
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Victoria
          </Link>

          <Link
            href="/profile/"
            className={buttonVariants({
              variant: "link",
              className: "pl-0",
            })}
          >
            Zoey
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
