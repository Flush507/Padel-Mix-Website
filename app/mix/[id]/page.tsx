import { mixes, type Jogo, type Campo } from "./mixes";
import { notFound } from "next/navigation";
import Link from "next/link";

// ─── Avatar helpers ───────────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  { bg: "#1a3a5c", text: "#7eb8f7" },
  { bg: "#1c3a2a", text: "#6ecfa0" },
  { bg: "#3a1c2a", text: "#f09bc0" },
  { bg: "#2e2010", text: "#f0b860" },
  { bg: "#1e1a3c", text: "#a89ef0" },
  { bg: "#2a1010", text: "#f07070" },
  { bg: "#0f2e2e", text: "#60d0d0" },
];

function buildColorMap(campos: { jogos: Jogo[] }[]) {
  const map: Record<string, { bg: string; text: string }> = {};
  let idx = 0;
  for (const campo of campos) {
    for (const jogo of campo.jogos) {
      for (const player of [...jogo.equipa1, ...jogo.equipa2]) {
        if (!map[player]) {
          map[player] = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
          idx++;
        }
      }
    }
  }
  return map;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type PlayerImages = Record<string, string>;

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlayerAvatar({
  name,
  image,
  colorMap,
}: {
  name: string;
  image?: string;            // optional URL or base64
  colorMap: Record<string, { bg: string; text: string }>;
}) {
  const { bg, text } = colorMap[name] ?? { bg: "#1a3a5c", text: "#7eb8f7" };
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      background: image ? "transparent" : bg,
      color: text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
      flexShrink: 0, overflow: "hidden",
      border: `1.5px solid ${text}33`,
    }}>
      {image
        ? <img src={image} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : getInitials(name)
      }
    </div>
  );
}

function TeamColumn({
  players,
  won,
  align,
  colorMap,
  playerImages,
}: {
  players: string[];
  won: boolean;
  align: "left" | "right";
  colorMap: Record<string, { bg: string; text: string }>;
  playerImages?: PlayerImages;
}) {
  const isRight = align === "right";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flex: 1,
        alignItems: isRight ? "flex-end" : "flex-start",
      }}
    >
      {players.map((player, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexDirection: isRight ? "row-reverse" : "row",
          }}
        >
          <PlayerAvatar name={player} image={playerImages?.[player]} colorMap={colorMap} />
          <span
            style={{
              fontSize: 12,
              fontWeight: won ? 600 : 400,
              color: won ? "#e8f4ff" : "#8ca8c0",
              whiteSpace: "nowrap",
              textAlign: isRight ? "right" : "left",
            }}
          >
            {player}
          </span>
        </div>
      ))}
    </div>
  );
}

function PadelCourtCard({
  jogo,
  index,
  colorMap,
  isFinal,
  playerImages,
}: {
  jogo: Jogo;
  index: number;
  colorMap: Record<string, { bg: string; text: string }>;
  isFinal?: boolean;
  playerImages?: PlayerImages;
}) {
  const e1Won = jogo.score[0] > jogo.score[1];
  const e2Won = jogo.score[1] > jogo.score[0];

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        background: "#0a1929",
        border: "1px solid #162840",
        transition: "border-color 0.2s",
      }}
      className="mix-card"
    >
      {/* Court SVG background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
          pointerEvents: "none",
        }}
        viewBox="0 0 320 110"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect x="10" y="8" width="300" height="94" fill="none" stroke="#4a9fff" strokeWidth="1.5" />
        <line x1="160" y1="8" x2="160" y2="102" stroke="#ffffff" strokeWidth="2.5" />
        <line x1="10" y1="52" x2="310" y2="52" stroke="#4a9fff" strokeWidth="1" strokeDasharray="4 3" />
        <rect x="2" y="2" width="316" height="106" fill="none" stroke="#2a6fbf" strokeWidth="0.8" rx="4" />
      </svg>

      {/* Jogo number badge */}
      <div
        style={{
          position: "absolute",
          top: 7,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0d2137",
          color: "#4a7090",
          fontSize: 9,
          fontWeight: 700,
          padding: "2px 9px",
          borderRadius: 20,
          letterSpacing: "0.1em",
          zIndex: 2,
          border: "1px solid #1e3a58",
          whiteSpace: "nowrap",
        }}
      >
        {isFinal ? "FINAL" : `JOGO ${index + 1}`}
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          padding: "28px 14px 14px",
          gap: 0,
        }}
      >
        <TeamColumn players={jogo.equipa1} won={e1Won} align="left" colorMap={colorMap} playerImages={playerImages} />

        {/* Score */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            minWidth: 72,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: e1Won ? "#7eb8f7" : "#4a7090",
                lineHeight: 1,
                minWidth: 24,
                textAlign: "center",
              }}
            >
              {jogo.score[0]}
            </span>
            <span style={{ fontSize: 13, color: "#1e3a58", fontWeight: 400 }}>–</span>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: e2Won ? "#7eb8f7" : "#4a7090",
                lineHeight: 1,
                minWidth: 24,
                textAlign: "center",
              }}
            >
              {jogo.score[1]}
            </span>
          </div>
          <span
            style={{
              fontSize: 8,
              color: "#1e3a58",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            resultado
          </span>
        </div>

        <TeamColumn players={jogo.equipa2} won={e2Won} align="right" colorMap={colorMap} playerImages={playerImages} />
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: 2,
          background: "linear-gradient(90deg, transparent, #1e4a7a 50%, transparent)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function CampoSection({
  titulo,
  jogos,
  accentColor,
  colorMap,
  playerImages,
}: {
  titulo: string;
  jogos: Jogo[];
  accentColor: string;
  colorMap: Record<string, { bg: string; text: string }>;
  playerImages?: PlayerImages;
}) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Campo header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 3, height: 26, borderRadius: 4, background: accentColor, flexShrink: 0 }} />
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "#d0e8ff",
              letterSpacing: "0.02em",
            }}
          >
            {titulo}
          </h2>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
            {jogos.length} jogos
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {jogos.map((jogo, i) => (
          <PadelCourtCard key={i} jogo={jogo} index={i} colorMap={colorMap} playerImages={playerImages} />
        ))}
      </div>
    </div>
  );
}

// ─── Points table helpers ─────────────────────────────────────────────────────

type PlayerStats = {
  name: string;
  pontos: number;
  jogos: number;
  vitorias: number;
};

function buildPointsTable(campos: Campo[]): PlayerStats[] {
  const map: Record<string, PlayerStats> = {};
  const ensure = (name: string) => {
    if (!map[name]) map[name] = { name, pontos: 0, jogos: 0, vitorias: 0 };
  };

  campos.forEach((campo, campoIndex) => {
    const isCampo1 = campoIndex === 0;
    const bonusWin = isCampo1 ? 8 : 4;
    const bonusLose = isCampo1 ? 6 : 2;
    const lastIndex = campo.jogos.length - 1;

    campo.jogos.forEach((jogo, jogoIndex) => {
      const [s1, s2] = jogo.score;
      const isFinal = jogoIndex === lastIndex;
      const e1Won = s1 > s2;

      for (const p of jogo.equipa1) {
        ensure(p);
        map[p].pontos += s1;
        map[p].jogos += 1;
        if (e1Won) map[p].vitorias += 1;
        if (isFinal) map[p].pontos += e1Won ? bonusWin : bonusLose;
      }
      for (const p of jogo.equipa2) {
        ensure(p);
        map[p].pontos += s2;
        map[p].jogos += 1;
        if (!e1Won) map[p].vitorias += 1;
        if (isFinal) map[p].pontos += e1Won ? bonusLose : bonusWin;
      }
    });
  });

  return Object.values(map).sort((a, b) => b.pontos - a.pontos);
}

function PontosTable({ stats, colorMap, playerImages }: { stats: PlayerStats[]; colorMap: Record<string, { bg: string; text: string }>, playerImages?: PlayerImages }) {
  const max = stats[0]?.pontos ?? 1;
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ width: 3, height: 18, borderRadius: 4, background: "var(--accent-blue)", flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Pontos Marcados</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>sets acumulados</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 90px 50px 50px", padding: "8px 20px", borderBottom: "1px solid var(--border-subtle)", gap: 12 }}>
        {["#", "Jogador", "", "J", "V"].map((h, i) => (
          <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" as const, textAlign: i >= 3 ? "center" as const : "left" as const }}>{h}</span>
        ))}
      </div>
      {stats.map((s, i) => {
        const { bg, text } = colorMap[s.name] ?? { bg: "#1a3a5c", text: "#7eb8f7" };
        const barPct = Math.round((s.pontos / max) * 100);
        const isTop3 = i < 3;
        return (
          <div key={s.name} style={{ display: "grid", gridTemplateColumns: "24px 1fr 90px 50px 50px", padding: "10px 20px", borderBottom: i < stats.length - 1 ? "1px solid var(--border-subtle)" : "none", alignItems: "center", gap: 12, background: i === 0 ? "#0d2137" : "transparent" }}>
            <span style={{ fontSize: isTop3 ? 14 : 12, textAlign: "center" as const }}>
              {isTop3 ? medals[i] : <span style={{ color: "var(--text-muted)" }}>{i + 1}</span>}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: playerImages?.[s.name] ? "transparent" : bg, color: text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, border: `1.5px solid ${text}33`, overflow: "hidden" }}>
                {playerImages?.[s.name]
                  ? <img src={playerImages[s.name]} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
                }
              </div>
              <span style={{ fontSize: 13, fontWeight: isTop3 ? 600 : 400, color: isTop3 ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {s.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--border-subtle)", overflow: "hidden" }}>
                <div style={{ width: `${barPct}%`, height: "100%", borderRadius: 2, background: i === 0 ? "var(--accent-blue-bright)" : "var(--accent-blue)", opacity: i === 0 ? 1 : 0.5 + (1 - i / stats.length) * 0.5 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "var(--score-win)" : "var(--text-secondary)", minWidth: 22, textAlign: "right" as const }}>{s.pontos}</span>
            </div>
            <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" as const }}>{s.jogos}</span>
            <span style={{ fontSize: 12, color: s.vitorias > 0 ? "var(--accent-green)" : "var(--text-muted)", textAlign: "center" as const, fontWeight: s.vitorias > 0 ? 600 : 400 }}>{s.vitorias}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MixDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mix = mixes.find((m) => m.id === Number(id));
  if (!mix) notFound();

  const colorMap = buildColorMap(mix.campos);
  const pointsStats = buildPointsTable(mix.campos);

  const playerImages: PlayerImages = mix.playerImages ?? {};

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 0 48px" }}>

      {/* Back + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <Link
          href="/mix"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            flexShrink: 0,
            transition: "border-color 0.15s",
          }}
        >
          ←
        </Link>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>
              {mix.name}
            </h1>
            <span
              style={{
                fontSize: 12,
                color: "var(--accent-blue)",
                background: "#0f2d4a",
                border: "1px solid var(--border-default)",
                padding: "2px 10px",
                borderRadius: 20,
                fontWeight: 500,
              }}
            >
              {mix.date}
            </span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--text-muted)" }}>
            {mix.campos.reduce((acc, c) => acc + c.jogos.length, 0)} jogos · {mix.campos.length} campos
          </p>
        </div>
      </div>

      {/* Pontos table */}
      {pointsStats.length > 0 && (
        <PontosTable stats={pointsStats} colorMap={colorMap} playerImages={playerImages} />
      )}

      {/* Campos */}
      {mix.campos.length === 0 ? (
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 16,
            padding: "48px 24px",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: 14,
          }}
        >
          Sem dados para este mix ainda.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          {mix.campos.map((campo, i) => (
            <CampoSection
              key={i}
              titulo={campo.titulo}
              jogos={campo.jogos}
              accentColor={i === 0 ? "#3a7fd4" : "#2aad78"}
              colorMap={colorMap}
              playerImages={playerImages}
            />
          ))}
        </div>
      )}
    </div>
  );
}