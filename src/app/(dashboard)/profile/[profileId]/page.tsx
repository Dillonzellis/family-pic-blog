import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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

  const { docs: albums } = await payload.find({
    collection: "albums",
    where: {
      user: {
        equals: profileId,
      },
    },
  });

  // If no albums, you can return a message or handle it as needed
  // TODO: add guard clause for no albums
  if (albums.length === 0) {
    return <div>No albums found</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="pb-6">Profile Page</div>
        <div className="text-xl pb-12">Welcome {user?.name}!</div>

        <Link href="/dashboard" className={buttonVariants()}>
          Upload Media
        </Link>

        {albums.map((album, index) => (
          <Link href={`/album/${album.id}`} key={index}>
            <div>
              <h2 className="text-2xl">{album.title}</h2>
              <Image
                src={album.thumbnail.url}
                alt={`Thumbnail for ${album.title}`}
                height={500}
                width={500}
              />
              <p>Description: {album.description}</p>
              <p>Created At: {album.createdAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
