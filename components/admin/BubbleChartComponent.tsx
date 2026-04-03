"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

export default function BubbleChartComponent({ data }) {
  const formatted = data.map((d) => ({
    x: Number(d.usage_count),
    y: Number(d.toxic_score),
    z: Number(d.unique_users),
    name: d.trendy_word,
  }));

  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="mb-4 font-semibold">Word Risk Intelligence</h2>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart>
          <XAxis dataKey="x" name="Usage" />
          <YAxis dataKey="y" name="Toxicity" />
          <ZAxis dataKey="z" range={[50, 400]} />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.name}`,
              "Word",
            ]}
          />
          <Scatter data={formatted} fill="#60a5fa" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}