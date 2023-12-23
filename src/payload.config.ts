import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Media } from "./collections/Media";
import { UploadEntries } from "./collections/UploadEntries";
import { Albums } from "./collections/Albums";
import { Logo } from "./components/Logo";
import { Icon } from "./components/Icon";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, UploadEntries, Albums, Media],
  routes: {
    admin: "/dashboard",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Walking After Midnight",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
