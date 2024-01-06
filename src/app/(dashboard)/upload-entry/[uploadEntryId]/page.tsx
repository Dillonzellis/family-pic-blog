// @ts-nocheck

import BreadCrumbs from "@/components/BreadCrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
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

  const [uploadEntry] = uploadEntrys;

  return (
    <MaxWidthWrapper>
      <BreadCrumbs
        userName={uploadEntry.user.name}
        userNameUrl={`/profile/${uploadEntry.user.id}`}
        uploadTitle={uploadEntry.title}
      />
      <div className="py-6 lg:py-12">
        <Image
          src={uploadEntry.url}
          width={uploadEntry.width}
          height={uploadEntry.height}
          alt=""
          className="pb-4"
        />
        {uploadEntry.title && (
          <div className="text-3xl font-medium">{uploadEntry.title}</div>
        )}
        {uploadEntry.description && (
          <div className="text-muted-foreground">{uploadEntry.description}</div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default UploadEntryPage;
