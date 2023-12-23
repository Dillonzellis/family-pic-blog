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
    where: {
      id: {
        equals: albumId,
      },
    },
  });

  // console.log(albums);

  const [album] = albums;

  if (!album) return notFound();

  let thumbnailUrl: string | undefined;

  if (typeof album.thumbnail !== "string") {
    if (album.thumbnail.url) {
      thumbnailUrl = album.thumbnail.url;
    }
  }

  const userName =
    typeof album.user === "object" && album.user ? album.user.name : "Unknown";

  const isUploadEntry = (entry: string | UploadEntry): entry is UploadEntry => {
    return typeof entry !== "string";
  };

  const isUser = (user: string | User): user is User => {
    return typeof user === "object" && user !== null;
  };

  // @ts-expect-error
  let userId: string | undefined = isUser(album.user)
    ? album.user.id ?? "defaultId"
    : album.user;

  // const crumbUserUrl = `/profile/${album.user?.id}`;
  const crumbUserUrl = `/profile/${userId}`;
  const crumbAlbumTitle = album.title;
  const crumbAlbumTitleUrl = `/album/${albumId}`;

  const BREADCRUMBS = [
    { id: 1, name: "All Albums", href: "/all-albums" },
    { id: 2, name: userName, href: crumbUserUrl },
    { id: 3, name: crumbAlbumTitle, href: crumbAlbumTitleUrl },
  ];

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

        <div className="flex flex-col items-center justify-center pb-16 pt-20">
          <div>
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt="album thumbnail"
                height={370}
                width={370}
                className="w-full rounded-md object-cover lg:h-[370px] lg:w-[370px]"
              />
            )}
            <div className="pt-2">
              <div className="">{album.title}</div>
              <div className="text-sm text-muted-foreground">
                {album.description}
              </div>
            </div>
          </div>
        </div>

        {/* Album Images Section */}
        <div className="grid w-full grid-cols-2 gap-8">
          {album.images?.map((imageObj, index) => {
            let imageUrl = isUploadEntry(imageObj.image)
              ? imageObj.image.url
              : imageObj.image;

            if (typeof imageUrl !== "string") {
              return null;
            }

            let imageTitle = isUploadEntry(imageObj.image)
              ? imageObj.image.title
              : imageObj.image;

            if (typeof imageTitle !== "string") {
              return null;
            }

            let imageDesc = isUploadEntry(imageObj.image)
              ? imageObj.image.description
              : imageObj.image;

            if (typeof imageDesc !== "string") {
              return null;
            }

            return (
              <Link href={imageUrl} key={index}>
                <div className="">
                  <Image
                    src={imageUrl}
                    alt="Album Image"
                    width={500}
                    height={500}
                    className="h-auto max-h-full w-auto max-w-full rounded-md"
                  />
                  <p className="pt-2 text-base">{imageTitle}</p>
                  <p className="text-sm text-muted-foreground">{imageDesc}</p>
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
