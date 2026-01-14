import { getCharacterById, getCharacterIssues } from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    
    const { id } = await context.params;
    
    const character = await getCharacterById(id);
    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
  
    const issues = await getCharacterIssues(id);
    character["issues"] = issues;

    return NextResponse.json(character);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
