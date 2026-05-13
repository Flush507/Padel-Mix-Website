"use client";

import { useRouter } from "next/navigation";

type Mix = {
  id: number;
  season: number;
  name: string;
  date: string;
};

const mixes: Mix[] = [
  { id: 1, season: 1, name: "VFX1", date: "03-03-2026" },
  { id: 2, season: 1, name: "VFX2", date: "10-03-2026" },
  { id: 3, season: 1, name: "VFX3", date: "23-03-2026" },
  { id: 4, season: 1, name: "VFX4", date: "14-04-2026" },
  { id: 5, season: 2, name: "VFX5", date: "05-05-2026" },
];

export default function MixTable() {
  const router = useRouter();

  const parseDate = (d: string) => {
    const [day, month, year] = d.split("-");
    return new Date(`${year}-${month}-${day}`).getTime();
  };

  // Group by season
  const grouped = mixes.reduce<Record<number, Mix[]>>((acc, mix) => {
    if (!acc[mix.season]) acc[mix.season] = [];
    acc[mix.season].push(mix);
    return acc;
  }, {});

  // Sort seasons descending, rows within each season descending by date
  const seasons = Object.keys(grouped).map(Number).sort((a, b) => b - a);
  seasons.forEach((s) => {
    grouped[s].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  });

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ width: 3, height: 18, borderRadius: 4, background: "var(--accent-blue)", flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>🎾 Mix</span>
      </div>

      {seasons.map((season, si) => {
        const rows = grouped[season];
        return (
          <div key={season}>
            {/* Season header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "rgba(79,142,247,0.06)",
              borderTop: si > 0 ? "1px solid var(--border-subtle)" : "none",
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--accent-blue)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                Season {season}
              </span>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>
                · {rows.length} mix{rows.length !== 1 ? "es" : ""}
              </span>
            </div>

            {/* Column headers */}
            {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", padding: "8px 20px", borderBottom: "1px solid var(--border-subtle)", gap: 12 }}>
              {["Nome", "Data"].map((h, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                  {h}
                </span>
              ))}
            </div> */}

            {/* Rows */}
            {rows.map((mix, i) => (
              <div
                key={mix.id}
                onClick={() => router.push(`/mix/${mix.id}`)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
                  padding: "10px 20px",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover, rgba(255,255,255,0.03))")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 13, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {mix.name}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {mix.date}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}