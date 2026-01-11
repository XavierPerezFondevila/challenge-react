"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { Character } from "../services/types";

interface CharactersContextType {
  characters: Character[] | null;
  setCharacters: (chars: Character[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const CharactersContext = createContext<CharactersContextType | null>(null);

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters, loading, setLoading }}>
      {children}
    </CharactersContext.Provider>
  );
}

export const useCharacters = () => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error(
      "useCharacters must be used within a CharactersProvider"
    );
  }
  return context;
};
