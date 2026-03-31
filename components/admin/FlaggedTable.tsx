export default function FlaggedTable({ data, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Flagged Words</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No toxic words found 🎉</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Word</th>
              <th className="text-left p-2">Score</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.trendy_word}</td>
                <td className="p-2">{item.toxic_score}</td>
                <td className="p-2">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}