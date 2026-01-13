export interface Character {
  id: number;
  name: string;
  description?: string;
  image?: {
    small_url: string;
  };
  issues?: Issue[]
}

export interface Issue {
  id: number,
  coverDate: string,
  issueNumber?: string,
  volumeName?: string,
  name: string,
  image?: {
    small_url: string
  }
}