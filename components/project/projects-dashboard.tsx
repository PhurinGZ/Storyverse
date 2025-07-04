// componets/project/projects-dashboard

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  FileText,
  Users,
  Settings,
  LogOut,
  User,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { RecentActivityCard } from "@/components/project/RecentActivityCard"

// Mock project data
const mockProjects = [
  {
    id: "1",
    title: "Chronicles of Thalara",
    genre: "Epic Fantasy",
    wordCount: 45780,
    chapters: 12,
    lastUpdated: "2 hours ago",
    collaborators: 3,
    status: "active",
    description:
      "A mystical realm where ancient magic flows through crystalline ley lines...",
  },
  {
    id: "2",
    title: "The Lighthouse Keeper's Secret",
    genre: "Mystery",
    wordCount: 23450,
    chapters: 8,
    lastUpdated: "1 day ago",
    collaborators: 1,
    status: "active",
    description:
      "Thomas has guarded his secret for thirty years, but tonight everything changes...",
  },
  {
    id: "3",
    title: "Neon Dreams",
    genre: "Cyberpunk",
    wordCount: 67200,
    chapters: 15,
    lastUpdated: "3 days ago",
    collaborators: 2,
    status: "active",
    description:
      "In Neo-Tokyo 2087, a hacker discovers a conspiracy that threatens reality itself...",
  },
  {
    id: "4",
    title: "The Last Garden",
    genre: "Post-Apocalyptic",
    wordCount: 12300,
    chapters: 4,
    lastUpdated: "1 week ago",
    collaborators: 1,
    status: "draft",
    description:
      "After the great collapse, Maya tends to humanity's final sanctuary...",
  },
  {
    id: "5",
    title: "Love in the Time of Algorithms",
    genre: "Romance",
    wordCount: 34560,
    chapters: 10,
    lastUpdated: "2 weeks ago",
    collaborators: 2,
    status: "active",
    description:
      "When an AI matchmaker falls for a human programmer, chaos ensues...",
  },
  {
    id: "6",
    title: "The Quantum Detective",
    genre: "Sci-Fi Mystery",
    wordCount: 8900,
    chapters: 3,
    lastUpdated: "3 weeks ago",
    collaborators: 1,
    status: "draft",
    description:
      "Detective Sarah Chen can see multiple timelines, but which one is real?",
  },
];

const genreColors = {
  "Epic Fantasy": "bg-purple-100 text-purple-800 border-purple-200",
  Mystery: "bg-orange-100 text-orange-800 border-orange-200",
  Cyberpunk: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Post-Apocalyptic": "bg-red-100 text-red-800 border-red-200",
  Romance: "bg-pink-100 text-pink-800 border-pink-200",
  "Sci-Fi Mystery": "bg-blue-100 text-blue-800 border-blue-200",
};

const activityFeed = [
  {
    id: 1,
    type: "update",
    message: "คุณเพิ่งอัปเดตโปรเจกต์",
    project: "The Last Garden",
    time: "2 ชม.ที่แล้ว",
    icon: "📝",
  },
  {
    id: 2,
    type: "ai",
    message: "AI ช่วย generate ตอนใหม่ใน",
    project: "Neon Dreams",
    time: "เมื่อวานนี้",
    icon: "🤖",
  },
  {
    id: 3,
    type: "collab",
    message: "คุณเพิ่มผู้ร่วมเขียนใน",
    project: "Love in the Time of Algorithms",
    time: "3 วันก่อน",
    icon: "👥",
  },
]


export function ProjectsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState(mockProjects);
  const [genreFilter, setGenreFilter] = useState("All");
  const [updateFilter, setUpdateFilter] = useState("All");
  const [collabFilter, setCollabFilter] = useState("All");

  const now = new Date();

  function parseTimeAgo(timeStr: string): number {
  if (timeStr.includes("hour")) return 1 / 24
  if (timeStr.includes("day")) return parseInt(timeStr) || 1
  if (timeStr.includes("week")) return (parseInt(timeStr) || 1) * 7
  return 0 // fallback
}


  const filteredProjects = projects.filter((project) => {
    const matchesGenre = genreFilter === "All" || project.genre === genreFilter;

    const matchesUpdate = (() => {
      if (updateFilter === "All") return true;
      const updateMap = {
        "24h": 1,
        "7d": 7,
        "30d": 30,
      };
      const updatedAgo = parseTimeAgo(project.lastUpdated); // 👇ดูฟังก์ชันด้านล่าง
      return updatedAgo <= updateMap[updateFilter as keyof typeof updateMap];
    })();

    const matchesCollab = (() => {
      if (collabFilter === "All") return true;
      if (collabFilter === "1") return project.collaborators === 1;
      if (collabFilter === "2") return project.collaborators >= 2;
      if (collabFilter === "3") return project.collaborators >= 3;
    })();

    return matchesGenre && matchesUpdate && matchesCollab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Storyverse
              </h1>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 border-2 border-gray-200">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Sarah Chen
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      sarah.chen@storyverse.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              My Projects
            </h2>
            <p className="text-gray-600">
              Manage your collaborative writing projects with AI assistance
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="mr-2 h-5 w-5" />
            Create New Project
          </Button>
        </div>

        {/* Main Layout: Left Content + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content - Projects */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <Badge
                        className={`${
                          genreColors[project.genre as keyof typeof genreColors] ||
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
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or create a new project.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </div>
            )}

            {/* Stats Summary */}
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
                    {projects
                      .reduce((sum, p) => sum + p.wordCount, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-600">Total Words</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {projects.reduce((sum, p) => sum + p.chapters, 0)}
                  </div>
                  <div className="text-sm text-green-600">Total Chapters</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-700 mb-1">
                    {projects.filter((p) => p.status === "active").length}
                  </div>
                  <div className="text-sm text-orange-600">Active Projects</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RecentActivityCard activities={activityFeed} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}