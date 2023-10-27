interface IProps {
  text: string;
}

export default function Title({ text }: IProps) {
  return (
    <div className="h-1/6 max-w-[90%]">
      <p className="p-5 text-5xl text-left">{text}</p>
    </div>
  );
}
