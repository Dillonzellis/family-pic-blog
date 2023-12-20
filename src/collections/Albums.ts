import { Access, CollectionConfig } from "payload/types";
import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Album } from "../payload-types";

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

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Albums: CollectionConfig = {
  slug: "albums",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "description", "user"],
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
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
      required: true,
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
          relationTo: "upload_entries",
          required: true,
        },
      ],
    },
  ],
};
