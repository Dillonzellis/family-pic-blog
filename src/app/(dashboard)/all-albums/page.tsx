// @ts-nocheck

import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";

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
        <div className="pb-12 text-5xl font-semibold">All Albums</div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, index) => {
            const thumbnailUrl = album.thumbnail
              ? album.thumbnail.url
              : album.images[0].image.url;
            return (
              <div key={index} className="mx-auto lg:mx-0">
                <Link href={`/album/${album.id}`}>
                  <Image
                    src={thumbnailUrl}
                    alt={`Thumbnail for ${album.title}`}
                    height={279}
                    width={325}
                    className="mx-auto h-[279px] w-[325px] rounded-lg object-cover lg:mx-0"
                  />
                </Link>
                <Link
                  href={`/profile/${album.user.id}`}
                  className="inline-block pt-1 font-serif text-2xl"
                >
                  {album.user.name}
                </Link>
                <p className="text-base">{album.title}</p>
                <p className="text-sm text-muted-foreground">
                  {album.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AllAlbumsPage;
