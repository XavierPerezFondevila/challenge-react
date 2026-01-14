'use client';
import useSWR from 'swr';
import CharacterCard from './CharacterCard';
import { useSearchParams } from 'next/navigation';
import { useFavoriteCharacters } from '@/context/FavoriteCharactersContext';
import { useCharacters } from '@/context/CharactersContext';
import { Character } from '@/services/types';
import { useEffect } from 'react';
import { fetcher } from '@/services/api';
import LoadingBar from '@/components/ui/LoadingBar';

export default function CharactersGrid() {
  const { setCharacters, setLoading } = useCharacters();
  const { favoriteCharacters, showOnlyFavorites } = useFavoriteCharacters();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const { data: characters, error, isLoading } = useSWR<Character[]>(
    showOnlyFavorites ? null : `/api/characters?query=${encodeURIComponent(query)}`,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setLoading(isLoading);
    if (characters) {
      setTimeout(() => {
        setCharacters(characters);
      }, 400);
    } 
  }, [characters, isLoading, setCharacters, setLoading]);

  if (error) return <div>Error: {(error as Error).message}</div>;

  const displayedCharacters = showOnlyFavorites
    ? favoriteCharacters.filter((char) =>char.name.toLowerCase().includes(query.toLowerCase()))
    : characters || [];

  return (
    <>
      <LoadingBar loading={isLoading}/>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {displayedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}
