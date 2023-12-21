import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";

// TODO: add gaurd check for if no albums

interface ProfilePageProps {
  params: {
    profileId: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const { profileId } = params;

  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "users",
    where: {
      id: {
        equals: profileId,
      },
    },
  });

  docs.forEach((doc) => {
    console.log("User:", doc.name);
    console.log("Albums:", doc.albums);
    // If albums are objects, you can iterate over them and log their properties
    doc.albums?.forEach((album) => {
      console.log("Album details:", album.title);
    });
  });

  const albumTitles = docs.flatMap((doc) =>
    doc.albums.map((album) => album.title)
  );

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="pb-6">Profile Page</div>
        <div className="text-xl pb-12">Welcome {user?.name}!</div>
        <div className="text-xl pb-12">Album Titles:</div>
        {albumTitles.map((title, index) => (
          <div key={index} className="pb-2">
            {title}
          </div>
        ))}
        <Link href="/dashboard" className={buttonVariants()}>
          Upload Media
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
