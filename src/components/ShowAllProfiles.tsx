import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getPayloadClient } from "@/get-payload";

const ShowAllProfiles = async () => {
  const payload = await getPayloadClient();

  const { docs: users } = await payload.find({
    collection: "users",
  });

  console.log(users);

  return (
    <Link
      href="/profile/"
      className={buttonVariants({
        variant: "link",
        className: "pl-0",
      })}
    >
      Brittany
    </Link>
  );
};

export default ShowAllProfiles;
