import { Character } from "./types";

const API_KEY = process.env.COMIC_VINE_API_KEY!;
const API_URL = process.env.COMIC_VINE_API_URL!;

export const getCharacters = async (query?: string): Promise<Character[]> => {
  try {
    const limit = 50;

    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      format: 'json',
      limit: limit.toString(),
    });

    if(query) {
      searchParams.append('filter', `name:${query}`);
    }

    console.log(searchParams.toString());
    

    const res = await fetch(
      `${API_URL}characters/?${searchParams.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    const characters: Character[] = data.results.map((character: any) => ({
      id: character?.id,
      name: character?.name,
      image: {
        small_url: character.image?.small_url || '',
      },
    }));

    return characters;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido al obtener personajes';
    console.error(message);
    return [];
  }
};

