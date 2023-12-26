import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";

export const uploadThumbnailRouter = router({
  useUploadWithThumbnail: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .query(async ({ input }) => {
      const { imageId } = input;
      const payload = await getPayloadClient();

      // Perform the nested query to find albums containing the image with imageId
      const albumsThumbnails = await payload.find({
        collection: "albums",
        where: {
          "images.id": {
            equals: imageId,
          },
        },
        // ... other query parameters if needed
      });

      return albumsThumbnails;
    }),
});
