import MaxWidthWrapper from "./MaxWidthWrapper";

import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "./ui/button";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <nav>
      <MaxWidthWrapper>
        <div className="flex gap-6 py-4 border-b">
          <div>
            <Link
              href={`/profile/${user?.id}`}
              className={buttonVariants({ variant: "link" })}
            >
              {user.name}
            </Link>
          </div>
          <div>
            <Link
              href="/home"
              className={buttonVariants({
                variant: "link",
              })}
            >
              All Albums
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/collections/albums?limit=10"
              className={buttonVariants({ variant: "link" })}
            >
              Upload Albums
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
