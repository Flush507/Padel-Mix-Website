export type PlayerSeason1 = {
    name: string;
    elo: number;
    mixes: number;
};

export type PlayerSeason2 = {
    name: string;
    elo: number;
    mixes: number;
};

export const players: PlayerSeason1[] = [
    { name: "André Oliveira", elo: 25.6, mixes: 4 },
    { name: "David Figuinha", elo: 30.9, mixes: 1 },
    { name: "Pedro Machado", elo: 26.0, mixes: 2 },
    { name: "Diogo Silva", elo: 27.4, mixes: 4 },
    { name: "Diogo Gomes", elo: 28.4, mixes: 4 },
    { name: "Tomás Vultos", elo: 21.5, mixes: 4 },
    { name: "Tiago Pimpão", elo: 19.8, mixes: 4 },
    { name: "ADN", elo: 22.8, mixes: 4 },
    { name: "Duarte Caseiro", elo: 32.8, mixes: 3 },
    { name: "Gudji", elo: 20.7, mixes: 2 },
    { name: "Simão Ferreira", elo: 26.0, mixes: 1 }
];

export const players2: PlayerSeason2[] = [
    { name: "Duarte Caseiro", elo: 39.0, mixes: 1 },
    { name: "Dinis Capitão", elo: 31.0, mixes: 1 },
    { name: "Pedro Machado", elo: 27.0, mixes: 1 },
    { name: "Temoteo", elo: 27.0, mixes: 1 },
    { name: "Diogo Silva", elo: 26.0, mixes: 1 },
    { name: "Eira", elo: 18.0, mixes: 1 },
    { name: "Tomás Vultos", elo: 16.0, mixes: 1 },
    { name: "David Figuinha", elo: 16.0, mixes: 1 }
];