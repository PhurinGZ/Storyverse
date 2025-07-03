"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, FileText, MapPin } from "lucide-react"

interface WorldSidebarProps {
  characters: Array<{
    id: string
    name: string
    role: string
    location: string
  }>
  scenes: Array<{
    id: string
    title: string
    location: string
    chapter: string
  }>
}

export function WorldSidebar({ characters, scenes }: WorldSidebarProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Protagonist":
        return "bg-green-100 text-green-800"
      case "Antagonist":
        return "bg-red-100 text-red-800"
      case "Supporting":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Linked Characters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Linked Characters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="p-4 space-y-3">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={character.name} />
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                      {character.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{character.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getRoleColor(character.role)}`}>{character.role}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {character.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Separator />

      {/* Linked Scenes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Linked Scenes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="p-4 space-y-3">
              {scenes.map((scene) => (
                <div key={scene.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">{scene.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {scene.location}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {scene.chapter}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
