'use client';

import FavoriteButton from '@/components/ui/FavoriteButton';
import { Character } from '@/services/types';
import React from 'react';


interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {

  return (
    <div className="flex flex-col items-center w-47.25 bg-primary group overflow-hidden">
      <div className="relative w-full h-47.25">
        <img
          src={character.image.small_url}
          alt={character.name}
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute bottom-0 left-0 w-full h-1.25 bg-secondary"></div>
      </div>

      <div className="relative w-full min-h-13 p-4 pb-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-secondary transition-all duration-375 group-hover:h-full z-10"></div>
        <div className="flex justify-between items-center relative gap-4 z-20">
          <h3 className="text-white h-6 truncate">{character.name}</h3>
          <div>
            <FavoriteButton width={12} height={10} character={character} />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-0 h-0 inline-block w-0 h-0 border-solid border-t-0 border-r-0 border-l-12 border-b-12 border-l-transparent border-r-transparent border-t-transparent border-white z-30"></div>
      </div>
    </div>
  );
};

export default React.memo(CharacterCard);
