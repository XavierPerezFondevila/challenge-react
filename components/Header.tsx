"use client";

import Image from "next/image";
import HeartIconFilled from "../icons/HeartIconFilled";
import Link from "next/link";
import { useFavoriteCharacters } from "@/context/FavoriteCharactersContext";

export default function Header() {
  const { favoriteCharacters, setShowOnlyFavoritesMode } = useFavoriteCharacters();

  const handleLogoClick = () => {
    setShowOnlyFavoritesMode(false);
  };

  return (
    <header className="w-full bg-primary flex items-center justify-between py-4 px-4 md:px-12">
      <div className="relative w-32.5 h-13">
        <Link href="/" onClick={handleLogoClick}>
          <Image
            src="/logo.svg"
            alt="marvel-logo"
            fill
            className="object-contain"
          />
        </Link>
      </div>
      <div>
        <button className="text-white flex items-center gap-2 p-4 cursor-pointer" onClick={() => setShowOnlyFavoritesMode(true)}>
          <HeartIconFilled className="fill-secondary"/>
          <span>{favoriteCharacters.length}</span>
        </button>        
      </div>
    </header>
  );
}