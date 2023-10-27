interface IProps {
  errors: string[];
}
export default function ErrorDisplay({ errors }: IProps) {
  return (
    <>
      {errors.map((error, idx) => (
        <p className="text-sm text-red-500 pt-2" key={idx}>
          {error}
        </p>
      ))}
    </>
  );
}
