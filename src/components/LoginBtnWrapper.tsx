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
            className={buttonVariants({
              variant: "outline",
              className: "self-start",
            })}
          >
            Profile
          </Link>

          <Link
            href="/all-albums"
            className={buttonVariants({
              variant: "outline",
              className: "self-start",
            })}
          >
            All Albums
          </Link>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({
            variant: "outline",
            className: "self-start",
          })}
        >
          Sign In
        </Link>
      )}
    </>
  );
};
