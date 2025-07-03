"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, FileText, Clock } from "lucide-react"

interface ProjectData {
  title: string
  genre: string
  tags: string[]
  members: Array<{ name: string; role: string; avatar: string }>
  stats: { chapters: number; wordCount: number; lastUpdate: string }
  summary: string
}

interface OverviewTabProps {
  projectData: ProjectData
}

export function OverviewTab({ projectData }: OverviewTabProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Overview</h1>
        <p className="text-gray-600">Manage and track your story's progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Story Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">{projectData.summary}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium text-gray-900">Genre:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {projectData.genre}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{projectData.stats.chapters}</div>
                <div className="text-sm text-gray-600">Chapters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{projectData.stats.wordCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Words</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{projectData.stats.lastUpdate}</div>
                <div className="text-sm text-gray-600">Last Update</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Project Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
