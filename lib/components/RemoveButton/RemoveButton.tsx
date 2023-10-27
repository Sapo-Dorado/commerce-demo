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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
