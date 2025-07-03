"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit3, Calendar, FileText } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "The Midnight Chronicles",
    genre: "Fantasy",
    chapters: 12,
    lastUpdated: "2 days ago",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    title: "Silicon Dreams",
    genre: "Sci-Fi",
    chapters: 8,
    lastUpdated: "1 week ago",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Love in Paris",
    genre: "Romance",
    chapters: 15,
    lastUpdated: "3 days ago",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 4,
    title: "The Detective's Dilemma",
    genre: "Mystery",
    chapters: 6,
    lastUpdated: "5 days ago",
    color: "bg-gray-100 text-gray-800",
  },
  {
    id: 5,
    title: "Mountain Escape",
    genre: "Adventure",
    chapters: 9,
    lastUpdated: "1 day ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: 6,
    title: "Corporate Shadows",
    genre: "Thriller",
    chapters: 11,
    lastUpdated: "4 days ago",
    color: "bg-red-100 text-red-800",
  },
]

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jane!</h1>
              <p className="text-gray-600 mt-1">Ready to continue your writing journey?</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 h-auto">
              <Plus className="mr-2 h-5 w-5" />
              Create New Project
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Your Stories</h2>
            <p className="text-gray-600">{projects.length} projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</CardTitle>
                    <Badge className={`${project.color} border-0 font-medium`}>{project.genre}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{project.chapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Open Editor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
