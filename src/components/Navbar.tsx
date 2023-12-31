import MaxWidthWrapper from "./MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "./ui/button";
import { SheetMenu } from "./SheetMenu";
import { DarkModeToggle } from "./DarkModeToggle";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  const { docs: users } = await payload.find({
    collection: "users",
    where: {
      role: {
        in: ["editor", "admin"],
      },
    },
  });

  const usersInfo = users.map((user) => ({
    id: user.id,
    name: user.name || "Unamed User",
  }));

  const UserNav = () => {
    return (
      <div className="hidden lg:block">
        <Link
          href={`/profile/${user?.id}`}
          className={buttonVariants({ variant: "link" })}
        >
          {user?.name}
        </Link>

        <Link
          href="/all-albums"
          className={buttonVariants({
            variant: "link",
          })}
        >
          All Albums
        </Link>
        <Link
          href="/dashboard/collections/albums?limit=10"
          className={buttonVariants({ variant: "link" })}
        >
          Upload Albums
        </Link>
      </div>
    );
  };

  const GuestNav = () => {
    return (
      <div className="hidden lg:block">
        <Link
          href="/all-albums"
          className={buttonVariants({
            variant: "link",
          })}
        >
          All Albums
        </Link>
        <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
          Sign In
        </Link>
      </div>
    );
  };

  return (
    <nav>
      <MaxWidthWrapper>
        <div className="flex items-center justify-between gap-4 border-b pb-2 pt-3 text-sm font-normal">
          <div className="flex items-center">
            <Link
              className="pr-6 font-serif text-xl lg:pr-12 lg:text-2xl"
              href="/"
            >
              Walking After Midnight
            </Link>
            {user ? <UserNav /> : <GuestNav />}
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <SheetMenu user={user} userInfo={usersInfo} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
