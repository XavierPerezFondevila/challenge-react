"use client";

import { useFavoriteCharacters } from "@/context/FavoriteCharactersContext";
import HeartIcon from "@/icons/HeartIcon";
import HeartIconFilled from "@/icons/HeartIconFilled";
import { Character } from "@/services/types";

interface FavoriteButtonProps {
  character: Character;
  width?: number;
  height?: number;
}

export default function FavoriteButton({ character, width, height }: FavoriteButtonProps) {
  const { isFavoriteCharacter, toggleFavorite } = useFavoriteCharacters(); 
  
  return (
    <button type="button" className="cursor-pointer relative after:" onClick={() => toggleFavorite(character)} title={isFavoriteCharacter(character.id) ? "Remove from favorites" : "Add to favorites"}>
      { isFavoriteCharacter(character.id) ? (
        <HeartIconFilled width={width} height={height} className="w-full h-full transition-colors duration-375  fill-secondary group-hover:fill-white" />
      ) : (
        <HeartIcon width={width} height={height} className="w-full h-full"/>
      )}
    </button>
  );
}