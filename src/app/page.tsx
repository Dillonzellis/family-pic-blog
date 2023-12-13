import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-y-6 justify-center text-center max-w-3xl items-center min-h-screen px-20">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
        Welcome to <span className="text-blue-600">Walking After Midnight</span>
      </h1>
      <p className="text-gray-700 text-2xl">Enjoy your stay!</p>
      <Link href="/" className={buttonVariants()}>
        Sign In
      </Link>
    </div>
  );
}
