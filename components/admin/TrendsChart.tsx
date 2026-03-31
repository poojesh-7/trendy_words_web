import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function TrendsChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Trending Words</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="trendy_word" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}