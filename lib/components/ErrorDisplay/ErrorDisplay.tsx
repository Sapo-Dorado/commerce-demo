interface IProps {
  errors: string[];
}

// Assumes no duplicate error messages
export default function ErrorDisplay({ errors }: IProps) {
  return (
    <>
      {errors.map((error) => (
        <p className="text-sm text-red-500 pt-2" key={error}>
          {error}
        </p>
      ))}
    </>
  );
}
