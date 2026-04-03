"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

const BAR_COLORS = [
  "#FF6B6B", "#FF9F43", "#FECA57", "#48DBFB", "#54A0FF",
  "#5F27CD", "#FF9FF3", "#00D2D3", "#1DD1A1", "#F368E0",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        border: "2.5px solid #111",
        borderRadius: "10px",
        padding: "10px 18px",
        boxShadow: "4px 4px 0px #111",
        fontFamily: "'Syne', sans-serif",
      }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#111" }}>"{label}"</p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>
          <span style={{ fontWeight: 700, color: payload[0].fill }}>{payload[0].value}</span> mentions
        </p>
      </div>
    );
  }
  return null;
};

export default function GlobalPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/global/trends`)
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(d => {
        if (!Array.isArray(d)) {
          console.error("Invalid data:", d);
          return;
        }
        setData(
          d.map(x => ({
            ...x,
            frequency: Number(x.frequency),
          }))
        );
      })
      .catch(err => console.error("Global fetch error:", err));
  }, []);

  return (
    <>
      <style>{`

        .global-page {
          margin:60px 0 -80px 0;
          min-height: 100vh;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .global-page::before {
          content: '';
          position: fixed;
          top: -120px; right: -120px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, #FF6B6B55, transparent 70%);
          pointer-events: none;
        }

        .global-page::after {
          content: '';
          position: fixed;
          bottom: -100px; left: -80px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, #54A0FF44, transparent 70%);
          pointer-events: none;
        }

        .page-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          text-align: center;
        }

        .header-badge {
          background: #111;
          color: #FECA57;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 999px;
          margin-top: 6px;
          display: inline-block;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: #111;
          line-height: 1.05;
          margin: 0;
        }

        .page-title span {
          -webkit-text-stroke: 2px #111;
          color: transparent;
        }

        .subtitle {
          font-size: 14px;
          color: #777;
          margin: 8px 0 0;
          font-weight: 500;
        }

        .chart-card {
          background: #fff;
          border: 2.5px solid #111;
          border-radius: 20px;
          padding: 32px 28px 24px;
          box-shadow: 6px 6px 0px #111;
          max-width: 780px;
          position: relative;
        }

        .chart-label {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }

        .word-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }

        .pill {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 999px;
          border: 2px solid #111;
          color: #111;
          letter-spacing: 0.04em;
        }

        .deco-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;
        }
      `}</style>

      <div className="global-page">
        <div className="page-header">
          <div>
            <div className="header-badge">🌍 Live Trends</div>
            <h1 className="page-title">
              Top <span>Words</span>
            </h1>
            <p className="subtitle">Most-used words across all user posts</p>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-label">📊 Frequency breakdown</div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barCategoryGap="28%">
              <XAxis
                dataKey="trendy_word"
                tick={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, fill: "#333" }}
                axisLine={{ stroke: "#eee" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="frequency" radius={[8, 8, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="word-pills">
            {data.map((item: any, index) => (
              <div
                key={index}
                className="pill"
                style={{ background: BAR_COLORS[index % BAR_COLORS.length] + "33" }}
              >
                <span
                  className="deco-dot"
                  style={{ background: BAR_COLORS[index % BAR_COLORS.length] }}
                />
                {item.trendy_word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}