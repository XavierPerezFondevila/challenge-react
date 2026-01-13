'use client';

import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import { useSearchParams } from 'next/navigation';
import { useFavoriteCharacters } from '@/context/FavoriteCharactersContext';
import { useCharacters } from '@/context/CharactersContext';
import { Character } from '@/services/types';

export default function CharactersGrid() {
  const { characters, setCharacters, setLoading } = useCharacters();
  const [error, setError] = useState<string | null>(null);

  const { favoriteCharacters, showOnlyFavorites } = useFavoriteCharacters();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      if(showOnlyFavorites) {
        return;
      }

      setLoading(true);
      setCharacters([]);
      setError(null);

      try {
        const res = await fetch(`/api/characters?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Error al obtener personajes');
        const data: Character[] = await res.json();

        if (isMounted) {
          setCharacters(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
          setCharacters([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, [query, setCharacters, setLoading, showOnlyFavorites]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedCharacters = showOnlyFavorites
    ? favoriteCharacters.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    )
    : characters || [];

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {displayedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
  );
}
