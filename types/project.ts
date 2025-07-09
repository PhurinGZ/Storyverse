export interface Project {
  id: string;
  title: string;
  genre: string;
  wordCount: number;
  chapters: number;
  lastUpdated: string;
  collaborators: number;
  status: 'active' | 'draft' | 'completed';
  description: string;
}

export interface Activity {
  id: number;
  type: 'update' | 'ai' | 'collab';
  message: string;
  project: string;
  time: string;
  icon: string;
}

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const GENRE_COLORS: Record<string, string> = {
  "Epic Fantasy": "bg-purple-100 text-purple-800 border-purple-200",
  Mystery: "bg-orange-100 text-orange-800 border-orange-200",
  Cyberpunk: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Post-Apocalyptic": "bg-red-100 text-red-800 border-red-200",
  Romance: "bg-pink-100 text-pink-800 border-pink-200",
  "Sci-Fi Mystery": "bg-blue-100 text-blue-800 border-blue-200",
};