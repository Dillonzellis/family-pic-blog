import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { buttonVariants } from "@/components/ui/button";

const ProfilePage = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="pb-6">Profile Page</div>
        <div className="text-xl pb-12">Welcome {user?.name}!</div>
        <Link href="/dashboard" className={buttonVariants()}>
          Upload Media
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
