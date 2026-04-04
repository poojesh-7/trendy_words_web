interface Stats {
  users: number;
  words: number;
  toxic: number;
}

export default function KPICards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Users", value: stats.users },
        { label: "Words", value: stats.words },
        { label: "Toxic Words", value: stats.toxic },
      ].map((item) => (
        <div key={item.label} className="bg-gray-900 p-5 rounded-xl shadow">
          <p className="text-gray-400">{item.label}</p>
          <h2 className="text-2xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}