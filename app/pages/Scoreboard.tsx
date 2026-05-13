import { players, players2 } from "./playerSeasons";

const formatElo = (elo: number) => elo.toFixed(1);

function RankingTable({
  title,
  data,
}: {
  title: string;
  data: { name: string; elo: number; mixes: number }[];
}) {
  const medals = ["🥇", "🥈", "🥉"];
  const sortedPlayers = [...data].sort((a, b) => b.elo - a.elo);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ width: 3, height: 18, borderRadius: 4, background: "var(--accent-blue)", flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
          🏆 {title}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 60px 60px", padding: "8px 20px", borderBottom: "1px solid var(--border-subtle)", gap: 12 }}>
        {["#", "Nome", "Mixes", "Elo"].map((h, i) => (
          <span key={h} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: i >= 2 || i === 0 ? "center" : "left" }}>
            {h}
          </span>
        ))}
      </div>

      {sortedPlayers.map((player, i) => {
        const isTop3 = i < 3;

        return (
          <div
            key={player.name}
            style={{
              display: "grid",
              gridTemplateColumns: "24px 1fr 60px 60px",
              padding: "10px 20px",
              borderBottom: i < sortedPlayers.length - 1 ? "1px solid var(--border-subtle)" : "none",
              alignItems: "center",
              gap: 12,
              background: i === 0 ? "#0d2137" : "transparent",
            }}
          >
            <span style={{ fontSize: isTop3 ? 14 : 12, textAlign: "center" }}>
              {isTop3 ? medals[i] : <span style={{ color: "var(--text-muted)" }}>{i + 1}</span>}
            </span>

            <span style={{ fontSize: 13, fontWeight: isTop3 ? 600 : 400, color: isTop3 ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {player.name}
            </span>

            <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
              {player.mixes}
            </span>

            <span style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "var(--score-win)" : "var(--text-secondary)", textAlign: "center" }}>
              {formatElo(player.elo)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Scoreboard() {
  return (
    <div>
      <RankingTable title="Season 2" data={players2} />
      <RankingTable title="Season 1" data={players} />
    </div>
  );
}