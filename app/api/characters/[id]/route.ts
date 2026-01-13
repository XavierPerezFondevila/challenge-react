import { getCharacterById, getCharacterIssues } from '@/services/api';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  _request: Request,
  { params }: Params
) {
  try {
    
    const { id } = await params;
    
    const character = await getCharacterById(id);
    if (!character) {
      return NextResponse.json(
        { error: 'Personaje no encontrado' },
        { status: 404 }
      );
    }
  
    const issues = await getCharacterIssues(id);
    character["issues"] = issues;

    return NextResponse.json(character);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
