type Player = {
    name: string;
    elo: number;
    mixes: number;
};

const players: Player[] = [
    { name: "André Oliveira", elo: 27.0, mixes: 3 },
    { name: "David Figuinha", elo: 28.0, mixes: 1 },
    { name: "Pedro Machado", elo: 25.0, mixes: 1 },
    { name: "Diogo Silva", elo: 26.7, mixes: 3 },
    { name: "Diogo Gomes", elo: 28.3, mixes: 3 },
    { name: "Tomás Vultos", elo: 19.7, mixes: 3 },
    { name: "Tiago Pimpão", elo: 17.7, mixes: 3 },
    { name: "ADN", elo: 20.0, mixes: 3 },
    { name: "Duarte Caseiro", elo: 30.5, mixes: 2 },
    { name: "Gudji", elo: 22.0, mixes: 1 },
    { name: "Simão Ferreira", elo: 26.0, mixes: 1 }
];

// ordenar automaticamente por elo
const sortedPlayers = [...players].sort((a, b) => b.elo - a.elo);
const formatElo = (elo: number) => elo.toFixed(1);

export default function Scoreboard() {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ width: 3, height: 18, borderRadius: 4, background: "var(--accent-blue)", flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>🏆 Classificação</span>
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 60px 60px", padding: "8px 20px", borderBottom: "1px solid var(--border-subtle)", gap: 12 }}>
        {["#", "Nome", "Mixes", "Elo"].map((h, i) => (
          <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, textAlign: i >= 2 ? "center" as const : i === 0 ? "center" as const : "left" as const }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
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
            {/* Rank */}
            <span style={{ fontSize: isTop3 ? 14 : 12, textAlign: "center" as const }}>
              {isTop3 ? medals[i] : <span style={{ color: "var(--text-muted)" }}>{i + 1}</span>}
            </span>

            {/* Nome */}
            <span style={{ fontSize: 13, fontWeight: isTop3 ? 600 : 400, color: isTop3 ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {player.name}
            </span>

            {/* Mixes */}
            <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" as const }}>
              {player.mixes}
            </span>

            {/* Elo */}
            <span style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "var(--score-win)" : "var(--text-secondary)", textAlign: "center" as const }}>
              {formatElo(player.elo)}
            </span>
          </div>
        );
      })}
    </div>
  );
}