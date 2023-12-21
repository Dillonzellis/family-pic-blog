import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Link from "next/link";

// TODO: add gaurd check for if no albums

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

  // console.log(albums);

  albums.forEach((album) => {
    console.log(album.thumbnail.url);
  });

  const albumTitles = albums.map((album) => album.title);
  const desc = albums.map((album) => album.description);

  const createdAt = albums.map((album) => album.createdAt);
  const thumbnail = albums.map((album) => album.thumbnail.url);

  const allImagesFlattened = albums.flatMap((album) => album.images);

  const imageTitles = allImagesFlattened.map((item) => item.image.title);

  console.log(allImagesFlattened);

  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div className="pb-6">Profile Page</div>
        <div className="text-xl pb-12">Welcome {user?.name}!</div>
        <div className="text-xl pb-12">Album Titles:</div>
        {albumTitles.map((title, index) => (
          <div key={index} className="pb-2">
            {title}
          </div>
        ))}
        <div>{thumbnail}</div>
        <div>{createdAt}</div>
        <div>{desc}</div>
        {imageTitles.map((imgTitle, i) => (
          <div key={i}>Image Titles {imgTitle}</div>
        ))}
        <Link href="/dashboard" className={buttonVariants()}>
          Upload Media
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
