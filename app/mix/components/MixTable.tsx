"use client";

import { useRouter } from "next/navigation";

type Mix = {
  id: number;
  name: string;
  date: string;
};

const mixes: Mix[] = [
  { id: 1, name: "VFX1", date: "03-03-2026" },
  { id: 2, name: "VFX2", date: "10-03-2026" },
  { id: 3, name: "VFX3", date: "23-03-2026" },
];

export default function MixTable() {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">🎾 Mix</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Nome</th>
            <th className="py-2">Data</th>
          </tr>
        </thead>

        <tbody>
          {mixes.map((mix) => (
            <tr
              key={mix.id}
              onClick={() => router.push(`/mix/${mix.id}`)}
              className="border-b last:border-none hover:bg-gray-50 cursor-pointer"
            >
              <td className="py-3 font-medium">{mix.name}</td>
              <td className="py-3 text-gray-600">{mix.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}