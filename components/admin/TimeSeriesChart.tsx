"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TimeSeriesChart({ data }) {
  const formatted = data.map((d) => ({
    date: d.date,
    count: Number(d.count),
  }));

  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="mb-4 font-semibold">Usage Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}