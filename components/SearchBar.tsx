"use client";

import SearchIcon from "../icons/SearchIcon";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { useCharacters } from "../context/CharactersContext";
import { useFavoriteCharacters } from "@/context/FavoriteCharactersContext";

export default function SearchBar() {
  const { characters, loading } = useCharacters();
  const { favoriteCharacters, showOnlyFavorites } = useFavoriteCharacters();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState<string>('');

  const handleSearch = useDebouncedCallback((queryString: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (queryString) {
      params.set('query', queryString);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 350);

  useEffect(() => {
    let isMounted = true;

    const getQueryParameters = () => {
      if(isMounted) {
        setQuery(searchParams.get('query') || '');
      }
    };

    getQueryParameters();

    return () => { isMounted = false };
  }, [searchParams]);

  const resultsCount = showOnlyFavorites
    ? favoriteCharacters.filter((char) => char.name.toLowerCase().includes(query.toLowerCase())).length
    : characters?.length || 0;

  return (
    <div className="w-full py-3">
      <div className="relative border-b border-primary pb-2">
        <SearchIcon className="absolute left-0 top-1.5 pointer-events-none" />
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Search a character..."
          className="w-full focus:outline-none px-6 uppercase cursor-pointer placeholder:color-[#AAAAAA]"
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
            handleSearch(ev.target.value);
          }}
        />
      </div>

      <div className="mt-3 text-[12px]">
        {!loading && `${resultsCount} RESULTS`}
      </div>
    </div>
  );
}
