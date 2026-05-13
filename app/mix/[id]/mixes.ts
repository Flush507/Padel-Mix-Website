export type Jogo = {
  equipa1: string[];
  equipa2: string[];
  score: [number, number];
};

export type Campo = {
  titulo: string;
  jogos: Jogo[];
};

export type Mix = {
  id: number;
  season: number;
  name: string;
  date: string;
  playerImages?: Record<string, string>;
  campos: Campo[];
};

function avatarUrl(name: string) {
  return `/players/${name
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;
}

const ALL_PLAYERS = [
  "Diogo Silva",
  "Pedro Machado",
  "Tomás Vultos",
  "Tiago Pimpão",
  "André Oliveira",
  "Diogo Gomes",
  "ADN",
  "David Figuinha",
  "Duarte Caseiro",
  "Simão Ferreira",
];

const playerImages: Record<string, string> = Object.fromEntries(
  ALL_PLAYERS.map((name) => [name, avatarUrl(name)])
);

export const mixes: Mix[] = [
  {
    id: 1,
    season: 1,
    name: "VFX1",
    date: "03-03-2026",
    playerImages,
    campos: [
      {
        titulo: "Campo 1",
        jogos: [
          { equipa1: ["Diogo Silva", "Pedro Machado"], equipa2: ["Tomás Vultos", "Tiago Pimpão"], score: [3, 2] },
          { equipa1: ["Diogo Silva", "André Oliveira"], equipa2: ["Diogo Gomes", "Pedro Machado"], score: [2, 3] },
          { equipa1: ["Diogo Gomes", "ADN"], equipa2: ["Tomás Vultos", "Pedro Machado"], score: [2, 3] },
          { equipa1: ["Tomás Vultos", "André Oliveira"], equipa2: ["David Figuinha", "Pedro Machado"], score: [2, 3] },
          { equipa1: ["David Figuinha", "ADN"], equipa2: ["Diogo Silva", "Pedro Machado"], score: [2, 3] },
          { equipa1: ["Diogo Silva", "André Oliveira"], equipa2: ["Diogo Gomes", "Pedro Machado"], score: [3, 2] },
          { equipa1: ["Diogo Silva", "Tiago Pimpão"], equipa2: ["David Figuinha", "André Oliveira"], score: [2, 3] },
        ],
      },
      {
        titulo: "Campo 2",
        jogos: [
          { equipa1: ["Diogo Gomes", "André Oliveira"], equipa2: ["David Figuinha", "ADN"], score: [4, 1] },
          { equipa1: ["Tomás Vultos", "ADN"], equipa2: ["David Figuinha", "Tiago Pimpão"], score: [3, 2] },
          { equipa1: ["Diogo Silva", "Tiago Pimpão"], equipa2: ["David Figuinha", "André Oliveira"], score: [0, 5] },
          { equipa1: ["Diogo Gomes", "Tiago Pimpão"], equipa2: ["Diogo Silva", "ADN"], score: [2, 3] },
          { equipa1: ["Tomás Vultos", "Tiago Pimpão"], equipa2: ["Diogo Gomes", "André Oliveira"], score: [1, 4] },
          { equipa1: ["David Figuinha", "Tiago Pimpão"], equipa2: ["Tomás Vultos", "ADN"], score: [4, 1] },
          { equipa1: ["Diogo Gomes", "ADN"], equipa2: ["Tomás Vultos", "Pedro Machado"], score: [1, 4] },
        ],
      },
    ],
  },
  {
    id: 2,
    season: 1,
    name: "VFX2",
    date: "10-03-2026",
    playerImages,
    campos: [{
        titulo: "Campo 1",
        jogos: [
          { equipa1: ["Diogo Silva", "Tomás Vultos"],    equipa2: ["André Oliveira", "Diogo Gomes"],   score: [3, 2] },
          { equipa1: ["Diogo Silva", "Duarte Caseiro"],  equipa2: ["Tomás Vultos", "ADN"],             score: [4, 1] },
          { equipa1: ["Diogo Silva", "Gudji"],           equipa2: ["André Oliveira", "Duarte Caseiro"],score: [3, 2] },
          { equipa1: ["Diogo Silva", "Diogo Gomes"],     equipa2: ["ADN", "Gudji"],                    score: [5, 0] },
          { equipa1: ["Tiago Pimpão", "Diogo Gomes"],   equipa2: ["Diogo Silva", "Duarte Caseiro"],   score: [3, 2] },
          { equipa1: ["André Oliveira", "Diogo Gomes"],  equipa2: ["Tiago Pimpão", "Gudji"],           score: [5, 0] },
          { equipa1: ["ADN", "Diogo Gomes"],             equipa2: ["André Oliveira", "Duarte Caseiro"],score: [3, 2] },
          { equipa1: ["Diogo Silva", "Diogo Gomes"],     equipa2: ["ADN", "Gudji"],                    score: [3, 2] },
        ],
      },
      {
        titulo: "Campo 2",
        jogos: [
          { equipa1: ["Tiago Pimpão", "Gudji"],          equipa2: ["ADN", "Duarte Caseiro"],           score: [1, 4] },
          { equipa1: ["André Oliveira", "Gudji"],        equipa2: ["Diogo Gomes", "Tiago Pimpão"],     score: [4, 1] },
          { equipa1: ["Diogo Gomes", "ADN"],             equipa2: ["Tomás Vultos", "Tiago Pimpão"],    score: [5, 0] },
          { equipa1: ["Tiago Pimpão", "Duarte Caseiro"], equipa2: ["André Oliveira", "Tomás Vultos"],  score: [5, 0] },
          { equipa1: ["André Oliveira", "Gudji"],        equipa2: ["ADN", "Tomás Vultos"],             score: [3, 2] },
          { equipa1: ["ADN", "Duarte Caseiro"],          equipa2: ["Diogo Silva", "Tomás Vultos"],     score: [3, 2] },
          { equipa1: ["Diogo Silva", "Gudji"],           equipa2: ["Tiago Pimpão", "Tomás Vultos"],    score: [3, 2] },
          { equipa1: ["André Oliveira", "Tomás Vultos"], equipa2: ["Tiago Pimpão", "Duarte Caseiro"],  score: [4, 1] },
        ],
      },
    ],
  },
  {
    id: 3,
    season: 1,
    name: "VFX3",
    date: "23-03-2026",
    playerImages,
    campos: [
      {
        titulo: "Campo 1",
        jogos: [
          { equipa1: ["Diogo Silva", "Duarte Caseiro"],   equipa2: ["André Oliveira", "Diogo Gomes"],    score: [3, 2] },
          { equipa1: ["Tomás Vultos", "Duarte Caseiro"],  equipa2: ["Diogo Silva", "Simão Ferreira"],    score: [5, 0] },
          { equipa1: ["Diogo Gomes", "Duarte Caseiro"],   equipa2: ["Tomás Vultos", "Tiago Pimpão"],     score: [4, 1] },
          { equipa1: ["André Oliveira", "Duarte Caseiro"],equipa2: ["Diogo Gomes", "Simão Ferreira"],    score: [4, 1] },
          { equipa1: ["Diogo Silva", "Duarte Caseiro"],   equipa2: ["André Oliveira", "Tiago Pimpão"],   score: [4, 1] },
          { equipa1: ["Diogo Silva", "Simão Ferreira"],   equipa2: ["Tomás Vultos", "Duarte Caseiro"],   score: [4, 1] },
          { equipa1: ["Diogo Gomes", "Simão Ferreira"],   equipa2: ["Diogo Silva", "Tiago Pimpão"],      score: [3, 2] },
          { equipa1: ["Diogo Gomes", "Duarte Caseiro"],   equipa2: ["André Oliveira", "Simão Ferreira"], score: [4, 1] },
        ],
      },
      {
        titulo: "Campo 2",
        jogos: [
          { equipa1: ["Tomás Vultos", "Simão Ferreira"],  equipa2: ["ADN", "Tiago Pimpão"],              score: [3, 2] },
          { equipa1: ["Diogo Gomes", "Tiago Pimpão"],    equipa2: ["André Oliveira", "ADN"],             score: [3, 2] },
          { equipa1: ["André Oliveira", "Simão Ferreira"],equipa2: ["Diogo Silva", "ADN"],               score: [4, 1] },
          { equipa1: ["Diogo Silva", "Tiago Pimpão"],    equipa2: ["Tomás Vultos", "ADN"],               score: [3, 2] },
          { equipa1: ["Tomás Vultos", "Simão Ferreira"],  equipa2: ["Diogo Gomes", "ADN"],               score: [4, 1] },
          { equipa1: ["Diogo Gomes", "Tiago Pimpão"],    equipa2: ["André Oliveira", "ADN"],             score: [4, 1] },
          { equipa1: ["André Oliveira", "Duarte Caseiro"],equipa2: ["Tomás Vultos", "ADN"],              score: [3, 2] },
          { equipa1: ["Diogo Silva", "ADN"],              equipa2: ["Tiago Pimpão", "Tomás Vultos"],     score: [4, 1] },
        ],
      },
    ],
  },
  {
    id: 4,
    season: 1,
    name: "VFX4",
    date: "14-04-2026",
    playerImages,
    campos: [
      {
        titulo: "Campo 1",
        jogos: [
          { equipa1: ["Gudji", "Duarte Caseiro"],    equipa2: ["André Oliveira", "Diogo Gomes"],   score: [3, 2] },
          { equipa1: ["Gudji", "ADN"],               equipa2: ["Tomás Vultos", "Duarte Caseiro"],  score: [3, 2] },
          { equipa1: ["Diogo Gomes", "ADN"],         equipa2: ["Gudji", "Pedro Machado"],          score: [4, 1] },
          { equipa1: ["Diogo Gomes", "Duarte Caseiro"], equipa2: ["Tiago Pimpão", "ADN"],          score: [5, 0] },
          { equipa1: ["Tomás Vultos", "Duarte Caseiro"], equipa2: ["Diogo Gomes", "Pedro Machado"], score: [4, 1] },
          { equipa1: ["ADN", "Duarte Caseiro"],      equipa2: ["Tomás Vultos", "André Oliveira"],  score: [3, 2] },
        ],
      },
      {
        titulo: "Campo 2",
        jogos: [
          { equipa1: ["Tomás Vultos", "ADN"],        equipa2: ["Pedro Machado", "Tiago Pimpão"],   score: [3, 2] },
          { equipa1: ["Diogo Gomes", "Pedro Machado"], equipa2: ["André Oliveira", "Tiago Pimpão"], score: [5, 0] },
          { equipa1: ["Tiago Pimpão", "Duarte Caseiro"], equipa2: ["Tomás Vultos", "André Oliveira"], score: [5, 0] },
          { equipa1: ["Tomás Vultos", "Pedro Machado"], equipa2: ["André Oliveira", "Gudji"],       score: [3, 2] },
          { equipa1: ["ADN", "André Oliveira"],      equipa2: ["Gudji", "Tiago Pimpão"],           score: [3, 2] },
          { equipa1: ["Tiago Pimpão", "Pedro Machado"], equipa2: ["Diogo Gomes", "Gudji"],          score: [3, 2] },
        ],
      },
    ],
  },
  {
    id: 5,
    season: 2,
    name: "VFX5",
    date: "05-05-2026",
    playerImages,
    campos: [
      {
        titulo: "Campo 1",
        jogos: [
          { equipa1: ["Diogo Silva", "Temoteo"], equipa2: ["Dinis Capitão", "Eira"], score: [4, 1] },
          { equipa1: ["Diogo Silva", "Tomás Vultos"], equipa2: ["Pedro Machado", "Temoteo"], score: [3, 2] },
          { equipa1: ["Diogo Silva", "Duarte Caseiro"], equipa2: ["Dinis Capitão", "Tomás Vultos"], score: [4, 1] },
          { equipa1: ["Pedro Machado", "Duarte Caseiro"], equipa2: ["Diogo Silva", "Eira"], score: [4, 1] },
          { equipa1: ["Duarte Caseiro", "Dinis Capitão"], equipa2: ["Pedro Machado", "Temoteo"], score: [4, 1] },
          { equipa1: ["Duarte Caseiro", "Diogo Silva"], equipa2: ["Dinis Capitão", "Tomás Vultos"], score: [5, 0] },
          { equipa1: ["Pedro Machado", "Duarte Caseiro"], equipa2: ["Diogo Silva", "Eira"], score: [4, 1] },
          { equipa1: ["Duarte Caseiro", "Dinis Capitão"], equipa2: ["Pedro Machado", "Temoteo"], score: [4, 1] },
        ],
      },
      {
        titulo: "Campo 2",
        jogos: [
          { equipa1: ["Tomás Vultos", "Pedro Machado"], equipa2: ["Duarte Caseiro", "David Figuinha"], score: [3, 2] },
          { equipa1: ["Duarte Caseiro", "Dinis Capitão"], equipa2: ["David Figuinha", "Eira"], score: [4, 1] },
          { equipa1: ["Pedro Machado", "Eira"], equipa2: ["David Figuinha", "Temoteo"], score: [3, 2] },
          { equipa1: ["Dinis Capitão", "Temoteo"], equipa2: ["David Figuinha", "Tomás Vultos"], score: [4, 1] },
          { equipa1: ["Diogo Silva", "Tomás Vultos"], equipa2: ["David Figuinha", "Eira"], score: [4, 1] },
          { equipa1: ["Pedro Machado", "Eira"], equipa2: ["David Figuinha", "Temoteo"], score: [3, 2] },
          { equipa1: ["Dinis Capitão", "Temoteo"], equipa2: ["Tomás Vultos", "David Figuinha"], score: [5, 0] },
          { equipa1: ["Tomás Vultos", "Diogo Silva"], equipa2: ["David Figuinha", "Eira"], score: [2, 3] },
        ],
      },
    ],
  },
];
