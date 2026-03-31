// components/ToxicChart.jsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ToxicChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Toxic Words</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="trendy_word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="toxic_score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}