import { XIcon } from "@/lib/utils";

interface IProps {
  callback: () => void;
}
export default function RemoveButton({ callback }: IProps) {
  return (
    <button
      type="button"
      className="absolute h-6 w-6 -right-3 -top-3 inline-flex items-center justify-center bg-rose-600 rounded-full text-gray-300 hover:text-gray-500 hover:bg-rose-400"
      onClick={callback}
    >
      <div className="container h-4 w-4">
        <XIcon />
      </div>
    </button>
  );
}
