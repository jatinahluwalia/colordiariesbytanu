interface Props {
  label: string;
  value: string;
}

const Detail = ({ label, value }: Props) => {
  return (
    <div className="flex gap-5 rounded-lg bg-white p-5 shadow-lg">
      <p className="font-bold">{label}: </p>
      <p className="text-zinc-500">{value}</p>
    </div>
  );
};

export default Detail;
