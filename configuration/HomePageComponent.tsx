import { shopUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function HomePageComponent() {
  // Redirects to shop unless this is implemented
  redirect(shopUrl());

  return (
    <p>Homepage</p>
  );
}
