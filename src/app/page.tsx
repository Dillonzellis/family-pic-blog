import { LoginBtnWrapper } from "@/components/LoginBtnWrapper";

// TODO: customize admin panel
// TODO: stop new signups

// TODO: personal profile with user uploads
// TODO: button to all uploads page
// TODO: sort uploads by user
// TODO: add logout path

// TODO: show all albums

//TODO: make Album thumbnail
//TODO: update collections to hide other users albums and uploads from admin panel
//
//TODO: hide upload entries from users

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
