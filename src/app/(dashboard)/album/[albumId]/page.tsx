// @ts-nocheck

import AlbumPreview from "@/components/AlbumPreview";
import BreadCrumbs from "@/components/BreadCrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AlbumPageProps {
  params: {
    albumId: string;
  };
}

const AlbumPage = async ({ params }: AlbumPageProps) => {
  const { albumId } = params;

  const payload = await getPayloadClient();

  const { docs: albums } = await payload.find({
    collection: "albums",
    limit: 1,
    depth: 1,
    where: {
      id: {
        equals: albumId,
      },
    },
  });

  const [album] = albums;

  if (!album) return notFound();

  return (
    <MaxWidthWrapper className="pb-12">
      <div>
        <BreadCrumbs
          userName={album.user.name}
          userNameUrl={`/profile/${album.user.id}`}
          albumTitle={album.title}
          albumTitleUrl={`/album/${albumId}`}
        />
        <div className="flex flex-col justify-center py-16">
          <div className="mx-auto text-center">
            {album.thumbnail && (
              <Image
                src={album.thumbnail.url}
                alt=""
                height={279}
                width={325}
                className="h-[279px] w-[325px] rounded-lg object-cover"
              />
            )}
            <div className="py-2 text-3xl font-semibold">{album.title}</div>
            <div className="text-base text-muted-foreground">
              {album.description}
            </div>
          </div>
        </div>

        {/* Album Images Section */}
        <div className="grid w-full gap-8 lg:grid-cols-2">
          {album.images?.map((imageObj, index) => {
            return (
              <Link href={`/uploadEntry/${imageObj.image.id}`} key={index}>
                <div className="">
                  <Image
                    src={imageObj.image.url}
                    alt="Album Image"
                    width={500}
                    height={500}
                    className="h-auto max-h-full w-auto max-w-full rounded-md"
                  />

                  {imageObj.image.title && (
                    <p className="pt-2 text-base">{imageObj.image.title}</p>
                  )}
                  {imageObj.image.description && (
                    <p className="text-sm text-muted-foreground">
                      {imageObj.image.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AlbumPage;
