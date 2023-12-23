import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServerSideUser(cookies);

  // Paths that require user to be signed in
  const protectedPaths = ["/profile/", "/all-albums", "/dashboard", "/album/"];

  // Redirect signed-in users trying to access sign-in or sign-up pages to the home page
  if (user && ["/sign-in", "/sign-up"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  // Redirect users who are not signed in and trying to access protected paths to the sign-in page
  if (
    !user &&
    protectedPaths.some((path) => nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`,
    );
  }

  return NextResponse.next();
}
