import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";

// TODO: customize admin panel
// TODO: stop new signups

// TODO: add handwriting fonts(sacremento)
// TODO: add beach picture
// TODO: add walking after midnight song to landing page
// TODO: add random upload entry button(maybe home page)
// TODO: change home page to all albums link
// TODO: center align landing page
// TODO: add video uploads

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-y-6 justify-center max-w-3xl items-center- min-h-screen px-8">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
        Walking After Midnight
      </h1>
      <p className="text-gray-700 text-2xl">Enjoy your stay!</p>
      <LoginBtnWrapper />
    </div>
  );
}
