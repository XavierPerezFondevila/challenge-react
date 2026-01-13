"use client";

import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchBar";
import CharactersGrid from "@/features/characters/CharactersGrid";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-6 bg-white px-4 md:px-12 pb-8">
        <div className="w-full mt-6 md:mt-12 flex flex-col gap-6">
          <PageTitle />
          <SearchBar />
        </div>
        <CharactersGrid />
      </main>
    </div>
  );
}
