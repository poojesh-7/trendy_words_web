import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ToxicData {
  trendy_word: string;
  toxic_score: number;
}

export default function ScatterCluster({ data }: { data: ToxicData[] }) {
  const formatted = data.map((d, i) => ({
    index: i,
    toxic_score: d.toxic_score,
  }));

  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="mb-4 font-semibold">Toxicity Clustering</h2>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="index" />
          <YAxis dataKey="toxic_score" />
          <Tooltip />
          <Scatter data={formatted} fill="#60a5fa" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}