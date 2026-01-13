"use client";

import { Character } from "@/services/types";
import { useEffect, useState } from "react";
import IssuesSlider from "@/features/issues/IssuesSlider";

interface CharacterViewProps {
  characterId: string;
}

export default function CharacterView({ characterId }: CharacterViewProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      if (!characterId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/characters/${characterId}`);
        if (!res.ok) throw new Error("Error al obtener personaje");

        const data: Character = await res.json();        
        setCharacter(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error desconocido";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [characterId]);

  if (!character) return <p>Personaje no encontrado</p>;

  return (<>
    <div className="bg-primary border-t border-[#333333] relative">
      <div className="w-full sm:max-w-240 sm:mx-auto sm:flex  sm:items-center">
        {character.image && (
          <div className="w-full flex-1">
            <img className="object-cover object-top aspect-square w-full" src={character.image?.small_url} />
          </div>
        )}
        <div className="text-white py-6 px-4 sm:py-12 sm:pl-12 w-full sm:max-w-[calc(100%-320px)] flex flex-col gap-6">
          <h1 className="text-[32px]/[32px] sm:text-[40px]/[40px] font-bold">{character.name}</h1>
          <p>{character.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-0 h-0 inline-block w-0 h-0 border-solid border-t-0 border-r-0 border-l-24 border-b-24 border-l-transparent border-r-transparent border-t-transparent border-white z-30"></div>
    </div>
    <div className="mt-12 mb-12 px-4">
      <div className="max-w-240  mx-auto flex-col items-center">
        { character?.issues &&  <IssuesSlider issues={character.issues}/> }
      </div>
    </div>
  </>
  );
}
