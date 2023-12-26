// @ts-nocheck

import BreadCrumbs from "@/components/BreadCrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { uploadThumbnailRouter } from "@/trpc/upload-thumbnail-router";
import Image from "next/image";

interface UploadEntryPageProps {
  params: {
    uploadEntryId: string;
  };
}

const UploadEntryPage = async ({ params }: UploadEntryPageProps) => {
  const { uploadEntryId } = params;

  const payload = await getPayloadClient();

  const { docs: uploadEntrys } = await payload.find({
    collection: "upload_entries",
    where: {
      id: {
        equals: uploadEntryId,
      },
    },
  });

  // use uploadThumbnailRouter instead this query
  // const { docs: albums } = await payload.find({
  //   collection: "albums",
  //   where: {
  //     images: {
  //       id: {
  //         equals: uploadEntryId,
  //       },
  //     },
  //   },
  // });

  const [uploadEntry] = uploadEntrys;

  // console.log(uploadEntry);

  return (
    <MaxWidthWrapper>
      <BreadCrumbs
        userName={uploadEntry.user.name}
        userNameUrl={`/profile/${uploadEntry.user.id}`}
        uploadTitle={uploadEntry.title}
      />
      <div className="pb-4 pt-8">
        <Image
          src={uploadEntry.url}
          width={uploadEntry.width}
          height={uploadEntry.height}
          alt=""
        />
      </div>
      {uploadEntry.title && (
        <div className="text-2xl font-medium">{uploadEntry.title}</div>
      )}
      {uploadEntry.description && (
        <div className="pb-4 text-muted-foreground">
          {uploadEntry.description}
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default UploadEntryPage;
