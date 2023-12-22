import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";
import Image from "next/image";

// TODO: customize admin panel
// TODO: stop new signups

// TODO: add handwriting fonts(sacremento)
// TODO: add beach picture
// TODO: add walking after midnight song to landing page
// TODO: change home page to all albums link
// TODO: center align landing page
// TODO: mobile friendly
// TODO: great vibes serif font

// NOTE: add video uploads
// NOTE: add random upload entry button(maybe home page)
// NOTE: move upload hosting to s3 bucket

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
      <div className="absolute top-1/2 mx-3 flex max-w-prose -translate-y-1/2 flex-col justify-center bg-zinc-50 px-3 pb-3 pt-5 lg:col-span-2 lg:mx-auto lg:px-12">
        <h1 className="pb-1 font-serif text-7xl text-zinc-900">
          Walking After Midnight
        </h1>
        <div aria-hidden="true" className="border-t pb-4"></div>
        <p className="pb-8 font-serif text-2xl text-zinc-700">
          &quot;Family is the heart of life&apos;s journey; it&apos;s where we
          learn to love, laugh, and embrace the beauty of being perfectly
          imperfect together.&quot;
        </p>
        <LoginBtnWrapper />
      </div>
    </div>
  );
}
