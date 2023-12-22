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
    <div className="lg:grid lg:grid-cols-5 min-h-screen relative">
      <div className="w-full lg:col-span-3 relative">
        <Image
          src="/midnight-landing.jpg"
          alt=""
          className="min-h-screen object-cover"
          fill
        />
      </div>
      <div className="bg-zinc-50 lg:col-span-2 flex flex-col justify-center lg:mx-auto max-w-prose mx-3 px-3 pb-3 pt-5 lg:px-12 absolute top-1/2 -translate-y-1/2">
        <h1 className="text-7xl font-serif pb-1 text-zinc-900">
          Walking After Midnight
        </h1>
        <div aria-hidden="true" className="border-t pb-4"></div>
        <p className="text-zinc-700 font-serif text-2xl pb-8">
          &quot;Family is the heart of life&apos;s journey; it&apos;s where we
          learn to love, laugh, and embrace the beauty of being perfectly
          imperfect together.&quot;
        </p>
        <LoginBtnWrapper />
      </div>
    </div>
  );
}
