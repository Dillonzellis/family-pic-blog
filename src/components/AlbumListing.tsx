// @ts-nocheck

"use client";

import { Album } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AlbumListingProps {
  album: Album | null;
  index: number;
}

const AlbumListing = ({ album, index }: AlbumListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!album || !isVisible) return <AlbumPlaceholder />;

  // const validUrls = album.thumbnail
  //   .map(({ thumbnail }) => (typeof image === "string" ? image : image.url))
  //   .filter(Boolean) as string[];

  let thumbnailUrl: string | undefined;

  if (typeof album.thumbnail !== "string") {
    if (album.thumbnail.url) {
      thumbnailUrl = album.thumbnail.url;
    }
  }

  if (isVisible && album) {
    return (
      <Link
        className={cn("group/main invisible h-full w-full cursor-pointer", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/album/${album.id}`}
      >
        <div className="flex w-full flex-col">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            {thumbnailUrl && <Image src={thumbnailUrl} alt="" fill />}
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-700">
            {album.title}
          </h3>
          <div>{album.description}</div>
        </div>
      </Link>
    );
  }
};

const AlbumPlaceholder = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
    </div>
  );
};

export default AlbumListing;
