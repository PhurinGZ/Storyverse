import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";

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

interface ProjectCardProps {
  project: Project;
  genreColors: Record<string, string>;
}

export function ProjectCard({ project, genreColors }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <Badge
            className={`${
              genreColors[project.genre] ||
              "bg-gray-100 text-gray-800"
            } font-medium shrink-0 ml-2`}
          >
            {project.genre}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{project.wordCount.toLocaleString()} words</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="h-4 w-4" />
            <span>{project.chapters} chapters</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>
              {project.collaborators} collaborator
              {project.collaborators !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{project.lastUpdated}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-200"
        >
          <Link
            href={`/workspace/${project.id}`}
            className="flex items-center justify-center gap-2"
          >
            Open in Workspace
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}