export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

export type CharactersResponse ={
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
}

export type Episode ={
  id: number;
  name: string;
}