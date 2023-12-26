// @ts-nocheck

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { UploadEntry } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User } from "@/payload-types";

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

  const userName =
    typeof album.user === "object" && album.user ? album.user.name : "Unknown";

  const isUser = (user: string | User): user is User => {
    return typeof user === "object" && user !== null;
  };

  // @ts-expect-error
  let userId: string | undefined = isUser(album.user)
    ? album.user.id ?? "defaultId"
    : album.user;

  const crumbUserUrl = `/profile/${userId}`;
  const crumbAlbumTitle = album.title;
  const crumbAlbumTitleUrl = `/album/${albumId}`;

  const BREADCRUMBS = [
    { id: 1, name: "All Albums", href: "/all-albums" },
    { id: 2, name: userName, href: crumbUserUrl },
    { id: 3, name: crumbAlbumTitle, href: crumbAlbumTitleUrl },
  ];

  let thumbnailDank;

  if (album.thumbnail) {
    thumbnailDank = album.thumbnail.url;
  } else {
    thumbnailDank = album.images[0].image.url;
  }

  console.log(thumbnailDank);

  // console.log(album.thumbnail.url);
  return (
    <MaxWidthWrapper>
      <div>
        <ol className="flex items-center space-x-1 pt-8">
          {BREADCRUMBS.map((breadcrumb, i) => (
            <li key={breadcrumb.href}>
              <div className="flex items-center text-sm">
                <Link
                  href={breadcrumb.href}
                  className="text-sm font-medium text-muted-foreground hover:text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
                {i !== BREADCRUMBS.length - 1 ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-zinc-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-col justify-center py-16">
          <div>
            {album.thumbnail && (
              <Image
                src={album.thumbnail.url}
                alt=""
                height={300}
                width={300}
              />
            )}
            <div className="pb-2 text-2xl font-semibold">{album.title}</div>
            <div className="text-base text-muted-foreground">
              {album.description}
            </div>
          </div>
        </div>

        {/* Album Images Section */}
        <div className="grid w-full gap-8 lg:grid-cols-2">
          {album.images?.map((imageObj, index) => {
            return (
              <Link href={imageObj.image.url} key={index}>
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
