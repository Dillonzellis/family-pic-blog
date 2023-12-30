// @ts-nocheck

import AlbumPreview from "@/components/AlbumPreview";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";

interface ProfilePageProps {
  params: {
    profileId: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
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
        <div className="pt-20">No albums found</div>
      </MaxWidthWrapper>
    );
  }
  const albumUser = albums[0].user.name;

  return (
    <MaxWidthWrapper>
      <div className="pt-16">
        <div className="pb-16 text-3xl font-medium">
          {albumUser}&apos;s Albums
        </div>
        <div className="flex flex-wrap justify-center gap-10 lg:justify-start">
          {albums.map((album, index) => {
            const thumbnailUrl = album.thumbnail
              ? album.thumbnail.url
              : album.images[0].image.url;

            return (
              <AlbumPreview
                key={index}
                userName={album.user.name}
                userId={album.user.id}
                albumUrl={thumbnailUrl}
                albumId={album.id}
                albumDesc={album.description}
                albumTitle={album.title}
              />
            );
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
