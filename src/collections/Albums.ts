import { Access, CollectionConfig } from "payload/types";
import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Album, User } from "../payload-types";

const addUser: BeforeChangeHook<Album> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Album> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  });

  if (fullUser && typeof fullUser === "object") {
    const userAlbums = fullUser.albums || [];
    // Using filter to ensure unique IDs without using Set
    const updatedAlbums = userAlbums.includes(doc.id)
      ? userAlbums
      : [...userAlbums, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        albums: updatedAlbums,
      },
    });
  }
};

const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const Albums: CollectionConfig = {
  slug: "albums",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "description", "user"],
    hidden: ({ user }) => user.role !== "admin" && user.role !== "editor",
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user || !referer?.includes("dashboard")) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  hooks: {
    beforeChange: [addUser],
    afterChange: [syncUser],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "thumbnail",
      label: "Album Thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "images",
      type: "array",
      label: "Album Images",
      minRows: 1,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          label: "Upload Photos",
          relationTo: "upload_entries",
          required: true,
        },
      ],
    },
  ],
};
