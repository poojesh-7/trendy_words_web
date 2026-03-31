export default function AdminSidebar() {
  return (
    <div className="hidden md:block w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <ul className="space-y-3">
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Users</li>
      </ul>
    </div>
  );
}