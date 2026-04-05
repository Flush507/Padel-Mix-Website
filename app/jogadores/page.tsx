"use client";

import Image from "next/image";
import { players } from "./data";
import { mixes, type Jogo } from "../mix/[id]/mixes";

// ─── Stats calculator ─────────────────────────────────────────────────────────

type PlayerStats = {
  jogos: number;
  vitorias: number;
  pontos: number;
};

function calcStats(name: string): PlayerStats {
  let jogos = 0, vitorias = 0, pontos = 0;

  for (const mix of mixes) {
    for (const campo of mix.campos) {
      for (const jogo of campo.jogos) {
        const inE1 = jogo.equipa1.includes(name);
        const inE2 = jogo.equipa2.includes(name);
        if (!inE1 && !inE2) continue;

        jogos += 1;
        const [s1, s2] = jogo.score;
        if (inE1) {
          pontos += s1;
          if (s1 > s2) vitorias += 1;
        } else {
          pontos += s2;
          if (s2 > s1) vitorias += 1;
        }
      }
    }
  }

  return { jogos, vitorias, pontos };
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatPill({ label, value, accent = false }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      flex: 1,
    }}>
      <span style={{
        fontSize: 18,
        fontWeight: 700,
        color: accent ? "var(--score-win)" : "var(--text-primary)",
        lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{
        fontSize: 9,
        fontWeight: 600,
        color: "var(--text-muted)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

function PlayerCard({ player }: { player: typeof players[0] }) {
  const stats = calcStats(player.name);
  const winRate = stats.jogos > 0 ? Math.round((stats.vitorias / stats.jogos) * 100) : 0;

  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 18,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "border-color 0.2s, transform 0.2s",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-hover)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
    }}
    >
      {/* Photo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", background: "var(--bg-card)", overflow: "hidden" }}>
        <Image
          src={player.photo}
          alt={player.name}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          onError={() => {}}
        />
        {/* Gradient overlay bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, #0a1929 0%, #0a192900 50%)",
        }} />

        {/* Win rate badge top right */}
        {stats.jogos > 0 && (
          <div style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: winRate >= 50 ? "#0d2e1a" : "#2a0f0f",
            border: `1px solid ${winRate >= 50 ? "#2aad7855" : "#e2454555"}`,
            color: winRate >= 50 ? "var(--accent-green)" : "#e24545",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 20,
            letterSpacing: "0.04em",
          }}>
            {winRate}%
          </div>
        )}

        {/* Name over photo */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 14px 10px",
        }}>
          <div style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.2,
          }}>
            {player.name}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        borderBottom: "1px solid var(--border-subtle)",
        gap: 8,
      }}>
        <StatPill label="Jogos" value={stats.jogos} />
        <div style={{ width: 1, height: 28, background: "var(--border-subtle)" }} />
        <StatPill label="Vitórias" value={stats.vitorias} accent />
        <div style={{ width: 1, height: 28, background: "var(--border-subtle)" }} />
        <StatPill label="Pontos" value={stats.pontos} />
      </div>

      {/* Best partner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="7" r="4" stroke="var(--accent-blue)" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>
          Parceiro
        </span>
        <span style={{ fontSize: 12, color: "var(--accent-blue)", fontWeight: 600, marginLeft: "auto", textAlign: "right" }}>
          {player.melhorParceiro}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JogadoresPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 0 48px" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--accent-blue-bright)" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="var(--accent-blue-bright)" strokeWidth="1.8"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--accent-blue-bright)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>
            Jogadores
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", paddingLeft: 30 }}>
          {players.length} jogadores · stats calculados a partir de todos os mixes
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
      }}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}