import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/get-payload";
import Link from "next/link";
import Image from "next/image";

interface AlbumPageProps {
  params: {
    albumId: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/home" },
  { id: 2, name: "placeholder", href: "/products" },
];

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

  console.log(album.images);

  if (!album) return notFound();

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="w-20 h-20 relative">
              <Image src={album.thumbnail.url} alt="" fill />
            </div>
            <div className="mt-4">{album.title}</div>
            <div className="mt-4">{album.description}</div>
            <div className="mt-4">Album by {album.user.name}</div>

            {/* Album Images Section */}
            <div className="mt-8">
              {album.images &&
                album.images.map((imageObj, index) => (
                  <Link
                    href={imageObj.image.url}
                    key={imageObj.image.id || index}
                  >
                    <div className="mb-4">
                      <Image
                        src={imageObj.image.url}
                        alt={imageObj.image.title || `Album Image ${index + 1}`}
                        width={imageObj.image.width}
                        height={imageObj.image.height}
                        layout="responsive"
                      />
                      <p className="text-sm mt-2">{imageObj.image.title}</p>
                      <p className="text-sm mt-2">
                        {imageObj.image.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AlbumPage;
