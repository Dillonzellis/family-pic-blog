import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "./ui/button";

export const LoginBtnWrapper = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
      {user ? (
        <div className="space-x-8">
          <Link
            href={`/profile/${user.id}`}
            className={buttonVariants({ className: "self-start" })}
          >
            Profile Page
          </Link>

          <Link
            href="/home"
            className={buttonVariants({ className: "self-start" })}
          >
            Home Page
          </Link>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({ className: "self-start" })}
        >
          Sign In
        </Link>
      )}
    </>
  );
};
