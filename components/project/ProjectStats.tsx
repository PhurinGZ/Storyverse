import { Card, CardContent } from "@/components/ui/card";

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

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalWords = projects.reduce((sum, p) => sum + p.wordCount, 0);
  const totalChapters = projects.reduce((sum, p) => sum + p.chapters, 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-700 mb-1">
            {projects.length}
          </div>
          <div className="text-sm text-blue-600">Total Projects</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-purple-700 mb-1">
            {totalWords.toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">Total Words</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-green-700 mb-1">
            {totalChapters}
          </div>
          <div className="text-sm text-green-600">Total Chapters</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-orange-700 mb-1">
            {activeProjects}
          </div>
          <div className="text-sm text-orange-600">Active Projects</div>
        </CardContent>
      </Card>
    </div>
  );
}