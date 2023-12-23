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
        <div>No albums found</div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="pt-16">
        <div className="pb-16 text-5xl font-semibold">All Albums</div>
        <div className="flex flex-wrap gap-10">
          {albums.map((album, index) => (
            <div key={index} className="mx-auto">
              <Link href={`/album/${album.id}`}>
                <Image
                  src={album.thumbnail.url}
                  alt={`Thumbnail for ${album.title}`}
                  height={279}
                  width={325}
                  className="mx-auto h-[279px] w-[325px] rounded-lg object-cover"
                />
              </Link>
              <Link
                href={`/profile/${album.user.id}`}
                className="inline-block py-1.5 text-base font-medium"
              >
                {album.user.name}
              </Link>
              <p className="pb-0.5 text-base">{album.title}</p>
              <p className="text-sm text-muted-foreground">
                {album.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AllAlbumsPage;
