import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "./ui/button";

export const LoginBtnWrapper = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  //TODO: Make this into parent component and conditional dashboard for uploads or visit profile page or home page

  return (
    <>
      {user ? (
        <Link
          href="/home"
          className={buttonVariants({ className: "self-start" })}
        >
          Home Page
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
