"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCards from "@/components/admin/StatsCards";
import TrendsChart from "@/components/admin/TrendsChart";
import UsersTable from "@/components/admin/UsersTable";
import FlaggedTable from "@/components/admin/FlaggedTable";
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [users, setUsers] = useState([]);
  const [flagged, setFlagged] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/stats`, { headers })
      .then(res => res.json())
      .then(data => {
        setStats({
          users: Number(data.users),
          words: Number(data.words),
          toxicWords: Number(data.toxicWords),
        });
      });

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/trends`, { headers })
      .then(res => res.json())
      .then(data =>
        setTrends(data.map(d => ({
          ...d,
          frequency: Number(d.frequency),
        })))
      );

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`, { headers })
      .then(res => res.json())
      .then(setUsers);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/flagged`, { headers })
      .then(res => res.json())
      .then(setFlagged);
  }, [token]);

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/word/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setFlagged(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="mt-[60px] flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        {stats && <StatsCards stats={stats} />}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TrendsChart data={trends} />
        </div>

        <UsersTable users={users} />

        <FlaggedTable data={flagged} onDelete={handleDelete} />
      </div>
    </div>
  );
}