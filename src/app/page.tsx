import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";

// TODO: customize admin panel
// TODO: stop new signups
// TODO: add proper nav bar and mobile menu

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-y-6 justify-center max-w-3xl items-center- min-h-screen px-8">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
        Welcome to <span className="text-blue-600">Walking After Midnight</span>
      </h1>
      <p className="text-gray-700 text-2xl">Enjoy your stay!</p>
      <LoginBtnWrapper />
    </div>
  );
}
