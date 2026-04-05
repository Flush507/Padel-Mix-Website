export type Player = {
  id: string;
  name: string;
  photo: string; // path relativo a /public
  melhorParceiro: string; // nome exato como está no mixes.ts
};
 
export const players: Player[] = [
  { id: "diogo-silva",       name: "Diogo Silva",       photo: "/players/diogosilva.png",       melhorParceiro: "Duarte Caseiro" },
  { id: "tomas-vultos",      name: "Tomás Vultos",       photo: "/players/tomasvultos.png",      melhorParceiro: "Simão Ferreira" },
  { id: "diogo-gomes",       name: "Diogo Gomes",        photo: "/players/diogogomes.png",       melhorParceiro: "André Oliveira" },
  { id: "andre-oliveira",    name: "André Oliveira",     photo: "/players/andreoliveira.png",    melhorParceiro: "Diogo Gomes" },
  { id: "tiago-pimpao",      name: "Tiago Pimpão",       photo: "/players/tiagopimpao.png",      melhorParceiro: "Duarte Caseiro" },
  { id: "david-figuinha",    name: "David Figuinha",     photo: "/players/davidfiguinha.png",    melhorParceiro: "Pedro Machado" },
  { id: "pedro-machado",     name: "Pedro Machado",      photo: "/players/pedromachado.png",     melhorParceiro: "Diogo Silva" },
  { id: "duarte-caseiro",    name: "Duarte Caseiro",     photo: "/players/duartecaseiro.png",    melhorParceiro: "Diogo Silva" },
  { id: "simao-ferreira",    name: "Simão Ferreira",     photo: "/players/simaoferreira.png",    melhorParceiro: "Tomás Vultos" },
  { id: "adn",               name: "ADN",                photo: "/players/adn.png",               melhorParceiro: "Diogo Gomes" },
  { id: "gudji",             name: "Gudji",              photo: "/assets/nopic.png",             melhorParceiro: "André Oliveira" },
];
 