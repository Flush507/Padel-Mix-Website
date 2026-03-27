type Player = {
  name: string;
  elo: number;
};

const players: Player[] = [
  { name: "André Oliveira", elo: 2000 },
  { name: "David Figuinha", elo: 1950 },
  { name: "Pedro Machado", elo: 1900 },
  { name: "Diogo Silva", elo: 1850 },
  { name: "Diogo Gomes", elo: 1800 },
  { name: "Tomás Vultos", elo: 1750 },
  { name: "Tiago Pimpão", elo: 1700 },
  { name: "ADN", elo: 1650 },
  { name: "Duarte Caseiro", elo: 1600 },
  { name: "Gudji", elo: 1550 },
  { name: "Simão Ferreira", elo: 1500 }
];

// ordenar automaticamente por elo
const sortedPlayers = [...players].sort((a, b) => b.elo - a.elo);

export default function Scoreboard() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">🏆 Classificação</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Rank</th>
            <th className="py-2">Nome</th>
            <th className="py-2 text-right">Elo</th>
          </tr>
        </thead>

        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr
              key={player.name}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="py-2 font-medium">#{index + 1}</td>
              <td className="py-2">{player.name}</td>
              <td className="py-2 text-right font-semibold">
                {player.elo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}