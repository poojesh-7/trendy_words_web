export default function TopToxicWords({ data }) {
  const top = [...data]
    .sort((a, b) => b.toxic_score - a.toxic_score)
    .slice(0, 5);

  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="mb-4">Top Risk Words</h2>

      {top.map((w, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{w.trendy_word}</span>
          <span className="text-red-400">{w.toxic_score.toFixed(3)}</span>
        </div>
      ))}
    </div>
  );
}