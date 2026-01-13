import CharacterView from "@/features/characters/CharacterView";

type PageProps = {
  params: {
    id: string
  }
}

export default async function CharactersPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <CharacterView characterId={id}/>
  )
}
