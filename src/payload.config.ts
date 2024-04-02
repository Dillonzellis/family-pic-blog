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
import { BackToRootButton } from "./components/BackToRootBtn";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  },
  bucket: process.env.S3_BUCKET_NAME!,
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
      afterNavLinks: [BackToRootButton],
    },
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
        },
        upload_entries: {
          adapter: storageAdapter,
        },
      },
    }),
  ],
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
