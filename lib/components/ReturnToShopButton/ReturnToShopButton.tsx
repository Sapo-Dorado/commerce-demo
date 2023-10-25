import { shopUrl } from "@/lib/utils";

export default function ReturnToShopButton() {
  return (
    <a
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
      href={shopUrl()}
    >
      Return to Shop
    </a>
  );
}
