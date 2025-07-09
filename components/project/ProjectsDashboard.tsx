"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { RecentActivityCard } from "@/components/project/RecentActivityCard";
import { NavigationHeader } from "@/components/project/NavigationHeader";
import { ProjectFilters } from "@/components/project/project-filters";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectStats } from "@/components/project/ProjectStats";
import { EmptyState } from "@/components/project/EmptyState";
import { CreateProjectModal } from "./CreateProjectModal";

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
];

export function ProjectsDashboard() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState(mockProjects);
  const [genreFilter, setGenreFilter] = useState("All");
  const [updateFilter, setUpdateFilter] = useState("All");
  const [collabFilter, setCollabFilter] = useState("All");

  function parseTimeAgo(timeStr: string): number {
    if (timeStr.includes("hour")) return 1 / 24;
    if (timeStr.includes("day")) return parseInt(timeStr) || 1;
    if (timeStr.includes("week")) return (parseInt(timeStr) || 1) * 7;
    return 0; // fallback
  }

  const filteredProjects = projects.filter((project) => {
    // Search filter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = genreFilter === "All" || project.genre === genreFilter;

    const matchesUpdate = (() => {
      if (updateFilter === "All") return true;
      const updateMap = {
        "24h": 1,
        "7d": 7,
        "30d": 30,
      };
      const updatedAgo = parseTimeAgo(project.lastUpdated);
      return updatedAgo <= updateMap[updateFilter as keyof typeof updateMap];
    })();

    const matchesCollab = (() => {
      if (collabFilter === "All") return true;
      if (collabFilter === "1") return project.collaborators === 1;
      if (collabFilter === "2") return project.collaborators >= 2;
      if (collabFilter === "3") return project.collaborators >= 3;
      return true;
    })();

    return matchesSearch && matchesGenre && matchesUpdate && matchesCollab;
  });

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to continue
          </h1>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const user = session?.user || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <NavigationHeader user={user} />

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
          <CreateProjectModal />
        </div>

        {/* Main Layout: Left Content + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content - Projects */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <ProjectFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
              updateFilter={updateFilter}
              setUpdateFilter={setUpdateFilter}
              collabFilter={collabFilter}
              setCollabFilter={setCollabFilter}
              projects={projects}
            />

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  genreColors={genreColors}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <EmptyState searchQuery={searchQuery} />
            )}

            {/* Stats Summary */}
            <ProjectStats projects={projects} />
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