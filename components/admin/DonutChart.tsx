import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface ToxicData {
  trendy_word: string;
  toxic_score: number;
}

export default function DonutChart({ data }: { data: ToxicData[] }) {
  const safe = data.filter(d => d.toxic_score <= 0.09).length;
  const toxic = data.length - safe;

  const chartData = [
    { name: "Safe", value: safe },
    { name: "Toxic", value: toxic },
  ];

  return (
    <div className="bg-gray-900 p-5 rounded-xl flex flex-col items-center">
      <h2 className="mb-4">Risk Distribution</h2>

      <PieChart width={200} height={200}>
        <Pie data={chartData} dataKey="value" outerRadius={80}>
          <Cell fill="#22c55e" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}