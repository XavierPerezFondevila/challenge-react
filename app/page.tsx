import SearchBar from "@/components/SearchBar";
import { CharactersProvider } from "@/context/CharactersContext";
import CharactersGrid from "@/features/characters/CharactersGrid";

export default function Home() {
  return (
    <CharactersProvider>
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex min-h-screen w-full max-w-3xl flex-col bg-white px-12 pb-8">
          <div className="w-full mt-12">
            <SearchBar />
          </div>
          <CharactersGrid />
        </main>
      </div>
    </CharactersProvider>
  );
}
