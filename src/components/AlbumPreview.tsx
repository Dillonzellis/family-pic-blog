import Link from "next/link";
import Image from "next/image";

interface AlbumPreviewProps {
  albumId: string;
  albumTitle?: string;
  albumUrl: string;
  userId: string;
  userName: string;
  albumDesc?: string;
  index: string;
}

const AlbumPreview = ({
  albumId,
  albumTitle,
  userId,
  albumDesc,
  userName,
  albumUrl,
  index,
}: AlbumPreviewProps) => {
  return (
    <div key={index} className="mx-auto lg:mx-0">
      <Link href={`/album/${albumId}`}>
        <Image
          src={albumUrl}
          alt={`Thumbnail for ${albumTitle}`}
          height={279}
          width={325}
          className="mx-auto h-[279px] w-[325px] rounded-lg object-cover lg:mx-0"
        />
      </Link>
      <Link
        href={`/profile/${userId}`}
        className="inline-block pt-1 font-serif text-2xl"
      >
        {userName}
      </Link>
      <p className="text-base">{albumTitle}</p>
      <p className="text-sm text-muted-foreground">{albumDesc}</p>
    </div>
  );
};

export default AlbumPreview;
