import { NewUserEmailTemplate } from "../components/emails/NewUserEmail";
import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return NewUserEmailTemplate({
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
          userFirstname: user.name,
        });
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["name"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "albums",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "albums",
      hasMany: true,
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,

      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "name",
      label: "Name",
      type: "text",
    },
  ],
};
