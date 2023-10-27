interface IProps {
  total: string;
}

export default function CheckoutTotal({ total }: IProps) {
  return (
    <div className="px-5 py-2">
      <p className="font-semibold text-2xl">Total Due: {total}</p>
    </div>
  );
}
