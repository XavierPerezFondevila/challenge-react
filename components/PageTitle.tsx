"use client";

import { useFavoriteCharacters } from "@/context/FavoriteCharactersContext";

export default function PageTitle() {
  const { showOnlyFavorites } = useFavoriteCharacters();

  if (!showOnlyFavorites) return null;

  return (
    <h1 className="w-full text-3xl font-bold">
      FAVORITES
    </h1>
  );
}