import MaxWidthWrapper from "./MaxWidthWrapper";

import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <nav>
      <MaxWidthWrapper>
        <div className="flex items-center justify-between gap-4 border-b pb-2 pt-3 text-sm font-normal">
          <div className="flex items-center">
            <Link className="pr-20 font-serif text-2xl" href="/">
              Walking After Midnight
            </Link>
            <div>
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
          </div>

          <Menu className="h-7 w-7" />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
