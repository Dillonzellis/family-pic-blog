import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Image
        src="/midnight-landing.jpg"
        alt="sandy dunes at a beach"
        className="h-full min-h-screen w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute top-1/2 mx-8 flex max-w-[430px] -translate-y-1/2 flex-col justify-center lg:left-1/2 lg:mx-0 lg:-translate-x-1/2 lg:rounded-2xl lg:bg-zinc-50/60 lg:px-6 lg:pb-5 lg:pt-7 lg:backdrop-blur-sm">
        <h1 className="text-shadow pb-1 font-serif text-5xl text-zinc-900 lg:text-6xl">
          Walking After Midnight
        </h1>
        <div
          aria-hidden="true"
          className="hidden max-w-sm border-t border-zinc-500 pb-4 lg:block"
        ></div>
        <p className="text-shadow pb-6 font-serif text-2xl text-zinc-900">
          &quot;Our Life&quot;
        </p>
        <LoginBtnWrapper />
      </div>
    </div>
  );
}
