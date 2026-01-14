"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Character } from "@/services/types";
import IssuesSlider from "@/features/issues/IssuesSlider";
import FavoriteButton from "@/components/ui/FavoriteButton";
import LoadingBar from "@/components/ui/LoadingBar";
import { fetcher } from "@/services/api";

interface CharacterViewProps {
  characterId: string;
}

export default function CharacterView({ characterId }: CharacterViewProps) {
  const { data: character, error, isLoading } = useSWR<Character>(
    characterId ? `/api/characters/${characterId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const [characterIsVisible, setCharacterIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (character) {
        setCharacterIsVisible(true);
      } else {
        setCharacterIsVisible(false);
      }  
    }, 400);
  }, [character]);

  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!character && !isLoading) return <p>Character not found</p>;

  return (
    <>
      <LoadingBar loading={isLoading} />
      <div>
        {character && (
          <div
            className={`
              transition-all duration-300 ease-out
              ${characterIsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"}
            `}
          >
            <>
              <div className="bg-primary border-t border-[#333333] relative">
                <div className="w-full sm:max-w-240 sm:mx-auto sm:flex sm:items-center">
                  {character.image && (
                    <div className="w-full flex-1">
                      <img
                        className="object-cover object-top aspect-square w-full"
                        src={character.image.small_url}
                        alt={character.name}
                      />
                    </div>
                  )}
                  <div className="text-white py-6 px-4 sm:py-12 sm:pl-12 w-full sm:max-w-[calc(100%-320px)] flex flex-col gap-6">
                    <div className="flex gap-4 justify-between">
                      <h1 className="text-[32px]/[32px] sm:text-[40px]/[40px] font-bold">
                        {character.name}
                      </h1>
                      <FavoriteButton
                        character={character}
                        width={24}
                        height={22}
                      />
                    </div>
                    <p>{character.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-0 border-r-0 border-l-24 border-b-24 border-l-transparent border-r-transparent border-t-transparent border-white z-30" />
              </div>

              <div className="mt-12 mb-12 px-4">
                <div className="max-w-240 mx-auto flex-col items-center">
                  {character.issues && (
                    <IssuesSlider issues={character.issues} />
                  )}
                </div>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}
