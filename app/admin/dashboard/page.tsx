"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/AdminSidebar";
import KPICards from "@/components/admin/KPICards";
import ToxicBarChart from "@/components/admin/ToxicBarChart";
import ScatterCluster from "@/components/admin/ScatterCluster";
import DonutChart from "@/components/admin/DonutChart";
import TopToxicWords from "@/components/admin/TopToxicWords";
import UsersTable from "@/components/admin/UsersTable";
import BubbleChartComponent from "@/components/admin/BubbleChartComponent";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [words, setWords] = useState([]);
  const [users, setUsers] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token || !BASE_URL) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        // 🔥 Fetch all in parallel
        const [statsRes, wordsRes, usersRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/stats`, { headers }),
          fetch(`${BASE_URL}/api/admin/words`, { headers }),
          fetch(`${BASE_URL}/api/admin/users`, { headers }),
        ]);

        const [bubbleRes, timeRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/word-insights`, { headers }),
          fetch(`${BASE_URL}/api/admin/trends-over-time`, { headers }),
        ]);

        const bubble = await bubbleRes.json();
        const time = await timeRes.json();

        setBubbleData(Array.isArray(bubble) ? bubble : []);
        setTimeData(Array.isArray(time) ? time : []);

        // ❌ handle bad responses
        if (!statsRes.ok || !wordsRes.ok || !usersRes.ok) {
          throw new Error("API request failed");
        }

        const statsData = await statsRes.json();
        const wordsData = await wordsRes.json();
        const usersData = await usersRes.json();

        // ✅ Validate arrays
        const safeWords = Array.isArray(wordsData)
          ? wordsData.map((w) => ({
              ...w,
              toxic_score: Number(w.toxic_score) || 0,
            }))
          : [];

        setStats({
          users: Number(statsData.users) || 0,
          words: Number(statsData.words) || 0,
          toxic: Number(statsData.toxicWords) || 0,
        });

        setWords(safeWords);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error("Dashboard error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!BASE_URL) {
    return <p className="text-red-500 p-5">Backend URL not configured</p>;
  }

  if (!token) {
    return <p className="text-red-500 p-5">Unauthorized</p>;
  }

  if (loading) {
    return <p className="text-gray-400 p-5">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen bg-white-950 text-white mb-[-80px] mt-[60px]">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        {/* KPI */}
        {stats && <KPICards stats={stats} />}

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ToxicBarChart data={words} />
          </div>
          <DonutChart data={words} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BubbleChartComponent data={bubbleData} />
          <TimeSeriesChart data={timeData} />
        </div>

        {/* Scatter */}
        <ScatterCluster data={words} />

        {/* Bottom section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopToxicWords data={words} />
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
}