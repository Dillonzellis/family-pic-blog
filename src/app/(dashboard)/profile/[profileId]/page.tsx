// @ts-nocheck

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
  // @ts-expect-error
  const albumUser = albums[0].user.name;

  return (
    <MaxWidthWrapper>
      <div className="pt-16">
        <div className="pb-16 text-3xl font-medium">
          {albumUser}&apos;s Albums
        </div>
        <div className="flex flex-wrap gap-10">
          {albums.map((album, index) => (
            <Link href={`/album/${album.id}`} key={index}>
              <div>
                <Image
                  src={album.thumbnail.url}
                  alt={`Thumbnail for ${album.title}`}
                  height={279}
                  width={325}
                  className="h-[279px] w-[325px] rounded-lg object-cover"
                />

                <p className="pb-0.5 pt-3 text-base">{album.title}</p>
                <p className="text-sm text-muted-foreground">
                  {album.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
