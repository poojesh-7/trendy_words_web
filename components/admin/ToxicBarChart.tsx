import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ToxicData {
  trendy_word: string;
  toxic_score: number;
}

export default function ToxicBarChart({ data }: { data: ToxicData[] }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="mb-4 font-semibold">Toxicity Heatmap</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="trendy_word" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="toxic_score"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              const color =
                payload.toxic_score > 0.09 ? "#ef4444" :
                payload.toxic_score > 0.05 ? "#f59e0b" :
                "#22c55e";

              return <rect x={x} y={y} width={width} height={height} fill={color} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}