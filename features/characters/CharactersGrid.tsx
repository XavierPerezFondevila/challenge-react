'use client';

import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import { useSearchParams } from 'next/navigation';
import { useFavoriteCharacters } from '@/context/FavoriteCharactersContext';
import { useCharacters } from '@/context/CharactersContext';
import { Character } from '@/services/types';

export default function CharactersGrid() {
  const { characters, setCharacters } = useCharacters();
  const [error, setError] = useState<string | null>(null);

  const { favoriteCharacters, showOnlyFavorites, setShowOnlyFavoritesMode } = useFavoriteCharacters();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        setCharacters([]);
        setError(null);
        
        if (query) {
          setShowOnlyFavoritesMode(false);  
        }
        const res = await fetch(`/api/characters?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Error al obtener personajes');
        const data: Character[] = await res.json();
        if (isMounted) {
          setCharacters(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchCharacters();

    return () => { isMounted = false };
  }, [query, setShowOnlyFavoritesMode, setCharacters]);

  const loading = !characters.length;

  if (loading) return <div>Cargando personajes...</div>;
  if (error) return <div>Error: {error}</div>;
  if ((!characters || characters.length === 0) && !showOnlyFavorites)
    return <div>No hay personajes disponibles</div>;
  if (showOnlyFavorites && favoriteCharacters.length === 0)
    return <div>No tienes personajes favoritos</div>;

  const displayedCharacters = showOnlyFavorites
    ? favoriteCharacters
    : characters;

  return (
    <div className="w-full mt-8 grid grid-cols-7 gap-4">
      {displayedCharacters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
