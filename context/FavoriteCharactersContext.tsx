"use client";

import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { Character } from "../services/types";

interface FavoriteCharactersContextType {
  favoriteCharacters: Character[];
  showOnlyFavorites: boolean;
  setShowOnlyFavoritesMode: (showOnlyFavorites: boolean) => void;
  isFavoriteCharacter: (characterId: number) => boolean;
  toggleFavorite: (character: Character) => void;
}

const LOCAL_STORAGE_KEY = "favoriteCharacters";

const FavoriteCharactersContext = createContext<FavoriteCharactersContextType | undefined>(undefined);

export const FavoriteCharactersProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedFavorites) {
        try {
          const parsed: Character[] = JSON.parse(storedFavorites);
          setFavoriteCharacters(parsed);
        } catch (err) {
          console.error("Error parsing favorite characters from localStorage", err);
        }
      }
    })();
  }, []);

  const isFavoriteCharacter = (characterId: number) => {
    return favoriteCharacters.some(char => char.id === characterId);
  };

  const toggleFavorite = (character: Character) => {
    setFavoriteCharacters(prevFavorites => {
      const updatedFavorites = prevFavorites.some(c => c.id === character.id)
        ? prevFavorites.filter(c => c.id !== character.id)
        : [...prevFavorites, character];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const setShowOnlyFavoritesMode = (showOnlyFavorites: boolean) => {
    setShowOnlyFavorites(() => {
      if (!favoriteCharacters.length) {
        return false;
      }

      return showOnlyFavorites;
    });
  };
    
  return (
    <FavoriteCharactersContext.Provider
      value={{
        favoriteCharacters,
        showOnlyFavorites,
        setShowOnlyFavoritesMode,
        toggleFavorite,
        isFavoriteCharacter
      }}
    >
      {children}
    </FavoriteCharactersContext.Provider>
  );
};

export const useFavoriteCharacters = () => {
  const context = useContext(FavoriteCharactersContext);
  if (!context) {
    throw new Error(
      "useFavoriteCharacters must be used within a FavoriteCharactersProvider"
    );
  }
  return context;
};
