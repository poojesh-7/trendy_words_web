export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Users", value: stats.users },
        { label: "Words", value: stats.words },
        { label: "Toxic Words", value: stats.toxicWords },
      ].map((item) => (
        <div key={item.label} className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{item.label}</p>
          <h2 className="text-2xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}