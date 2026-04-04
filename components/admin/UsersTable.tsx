interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Users</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b text-black">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  u.role === "admin" ? "bg-green-100 text-green-600" : "bg-gray-100"
                }`}>
                  {u.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}