// @ts-nocheck

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import AlbumPreview from "@/components/AlbumPreview";

const AllAlbumsPage = async () => {
  const payload = await getPayloadClient();

  const { docs: albums } = await payload.find({
    collection: "albums",
  });

  if (albums.length === 0) {
    return (
      <MaxWidthWrapper>
        <div className="pt-20">No albums found</div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <div className="pb-12 text-5xl font-semibold text-center lg:text-start">All Albums</div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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

export default AllAlbumsPage;
