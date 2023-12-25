import AudioPlayer from "@/components/AudioPlayer";
import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";

import Image from "next/image";

// TODO: double password validation
// TODO: rework profile section in sheet menu
// TODO: make song autoplay and add controls
// TODO: make image full width on landing page
// TODO: move images to s3 bucket

// NOTE: remove ts ignore cases
// NOTE: make individual photo page and way to go back ie breadcrumbs
// NOTE: footer?
// NOTE: make editor role for Users
// NOTE: add video uploads
// NOTE: add random upload entry button(maybe home page)
// NOTE: move upload hosting to s3 bucket
// NOTE: custom component for bulk upload
// NOTE: use TRPC and React Query more

export default function Home() {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-5">
      <div className="relative w-full lg:col-span-3">
        <Image
          src="/midnight-landing.jpg"
          alt=""
          className="min-h-screen object-cover"
          fill
        />
      </div>
      <div className="absolute top-1/2 mx-3 flex max-w-prose -translate-y-1/2 flex-col justify-center rounded-md bg-zinc-50 px-6 pb-5 pt-7 lg:static lg:col-span-2 lg:mx-auto lg:translate-y-0 lg:bg-transparent lg:px-12 lg:py-0">
        <h1 className="pb-1 font-serif text-7xl text-zinc-900">
          Walking After Midnight
        </h1>
        <div aria-hidden="true" className="border-t pb-4"></div>
        <p className="pb-8 font-serif text-2xl text-zinc-700">
          &quot;Our Life&quot;
        </p>
        <LoginBtnWrapper />
        <div className="pt-8 lg:pt-12">
          <AudioPlayer />
        </div>
      </div>
    </div>
  );
}
