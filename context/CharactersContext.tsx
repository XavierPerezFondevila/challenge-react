"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { Character } from "../services/types";

interface CharactersContextType {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
}

export const CharactersContext = createContext<CharactersContextType | null>(null);

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[] >([]);
  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
}

export const useCharacters = () => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error(
      "useCharacters must be used within a FavoriteCharactersProvider"
    );
  }
  return context;
};
