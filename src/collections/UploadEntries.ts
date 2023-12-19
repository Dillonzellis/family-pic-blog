import { Access, CollectionConfig } from "payload/types";

export const UploadEntries: CollectionConfig = {
  slug: "upload_entries",
  admin: {
    useAsTitle: "uploads",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
      label: "Caption",
    },
  ],
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
};
