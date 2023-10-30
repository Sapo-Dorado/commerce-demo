import { ReactElement } from "react";

interface IProps {
  errors: string[];
  errorContent?: ReactElement;
}

// Assumes no duplicate error messages
export default function ErrorDisplay({ errors, errorContent }: IProps) {
  return (
    <div className="flex flex-col items-center">
      {errors.map((error) => (
        <p className="text-sm text-red-500 pt-2" key={error}>
          {error}
        </p>
      ))}
      {errors.length > 0 && errorContent}
    </div>
  );
}
