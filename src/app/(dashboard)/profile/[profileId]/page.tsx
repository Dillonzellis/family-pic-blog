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

  if (albums.length === 0) {
    return (
      <MaxWidthWrapper>
        <div>No albums found</div>
      </MaxWidthWrapper>
    );
  }

  const albumUser = albums[0].user.name;

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="pb-6">{albumUser}&apos;s Albums</div>
        <div className="flex flex-wrap gap-8">
          {albums.map((album, index) => (
            <Link href={`/album/${album.id}`} key={index}>
              <div>
                <Image
                  src={album.thumbnail.url}
                  alt={`Thumbnail for ${album.title}`}
                  height={310}
                  width={265}
                  className="h-[265px] w-[310px] rounded-lg object-cover"
                />

                <p>Title: {album.title}</p>
                <p>Description: {album.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
