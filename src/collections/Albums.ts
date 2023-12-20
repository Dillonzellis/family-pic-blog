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

export const Albums: CollectionConfig = {
  slug: "albums",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "description", "user"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [addUser],
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
