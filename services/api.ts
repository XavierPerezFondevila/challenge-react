import { Character, Issue } from "./types";

const API_KEY = process.env.COMIC_VINE_API_KEY!;
const API_URL = process.env.COMIC_VINE_API_URL!;

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Error fetching data");
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}

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

    const res = await fetch(
      `${API_URL}/characters/?${searchParams.toString()}`,
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

export const getCharacterById = async (characterId: string): Promise<Character | undefined> => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    format: 'json'
  });
  
  const res = await fetch(
    `${API_URL}/character/4005-${characterId}?${searchParams.toString()}`,
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
  
  if (!data.results) {
    return undefined;
  }
    
  const character = data.results;
  return {
    id: character?.id,
    name: character?.name,
    description: character?.deck,
    image: {
      small_url: character.image?.small_url || '',
    },
  };
};

export const getCharacterIssues = async (characterId: string): Promise<Issue[]> => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    format: 'json',
    filter: `character:4005-${characterId}`,
    sort: 'cover_date:asc',
    limit: '20',
    offset: '20',
  });


  const res = await fetch(
    `${API_URL}/issues?${searchParams.toString()}`,
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

  const issues = data.results.map((issue: any) => ({
    id: issue?.id,
    name: issue?.name,
    coverDate: issue?.date_added ? new Date(issue.date_added).getFullYear() : null,
    issueNumber: issue?.issue_number,
    volumeName: issue?.volume?.name,
    image: {
      small_url: issue?.image?.small_url
    },
  }));

  return issues;
};


