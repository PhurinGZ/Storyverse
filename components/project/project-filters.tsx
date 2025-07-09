import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Project {
  id: string;
  title: string;
  genre: string;
  wordCount: number;
  chapters: number;
  lastUpdated: string;
  collaborators: number;
  status: string;
  description: string;
}

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
  updateFilter: string;
  setUpdateFilter: (filter: string) => void;
  collabFilter: string;
  setCollabFilter: (filter: string) => void;
  projects: Project[];
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  genreFilter,
  setGenreFilter,
  updateFilter,
  setUpdateFilter,
  collabFilter,
  setCollabFilter,
  projects,
}: ProjectFiltersProps) {
  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="text-sm text-gray-700">Filter by Genre</label>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="w-full border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
          >
            <option value="All">All Genres</option>
            {Array.from(new Set(projects.map((p) => p.genre))).map(
              (genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
        </div>

        {/* Updated Time Filter */}
        <div>
          <label className="text-sm text-gray-700">Updated</label>
          <select
            value={updateFilter}
            onChange={(e) => setUpdateFilter(e.target.value)}
            className="w-full border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
          >
            <option value="All">Any Time</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>

        {/* Collaborator Filter */}
        <div>
          <label className="text-sm text-gray-700">Collaborators</label>
          <select
            value={collabFilter}
            onChange={(e) => setCollabFilter(e.target.value)}
            className="w-full border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
          >
            <option value="All">All</option>
            <option value="1">Only 1</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>
    </div>
  );
}