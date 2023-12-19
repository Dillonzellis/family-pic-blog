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
        <Link
          href="/profile"
          className={buttonVariants({ className: "self-start" })}
        >
          Profile Page
        </Link>
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
