export default function TodoHeader({
  Judul,
  Deskripsi,
}: {
  Judul: string;
  Deskripsi: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {Judul}
      </h1>
      <p className="text-sm text-gray-500 mt-1">{Deskripsi}</p>
    </div>
  );
}
