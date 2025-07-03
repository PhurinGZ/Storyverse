"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Users } from "lucide-react"

const mockCharacters = [
  {
    id: "1",
    name: "Lyra Stormweaver",
    role: "Protagonist",
    portrait: "/placeholder.svg?height=80&width=80",
    description: "A young mage with the power to control ley lines",
    traits: ["Determined", "Curious", "Powerful"],
  },
  {
    id: "2",
    name: "Master Aldric",
    role: "Mentor",
    portrait: "/placeholder.svg?height=80&width=80",
    description: "Ancient wizard and head of the Mage Council",
    traits: ["Wise", "Mysterious", "Protective"],
  },
  {
    id: "3",
    name: "Kael Shadowbane",
    role: "Antagonist",
    portrait: "/placeholder.svg?height=80&width=80",
    description: "Dark sorcerer seeking to control the Convergence",
    traits: ["Cunning", "Ruthless", "Ambitious"],
  },
  {
    id: "4",
    name: "Zara Brightforge",
    role: "Supporting",
    portrait: "/placeholder.svg?height=80&width=80",
    description: "Lyra's best friend and fellow academy student",
    traits: ["Loyal", "Brave", "Optimistic"],
  },
]

export function CharactersTab() {
  const [characters] = useState(mockCharacters)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Protagonist":
        return "bg-green-100 text-green-800"
      case "Antagonist":
        return "bg-red-100 text-red-800"
      case "Mentor":
        return "bg-purple-100 text-purple-800"
      case "Supporting":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Characters</h1>
            <p className="text-gray-600">Manage your story's characters and their development</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Character
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Card key={character.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={character.portrait || "/placeholder.svg"} alt={character.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                      {character.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{character.name}</h3>
                  <Badge className={getRoleColor(character.role)}>{character.role}</Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 text-center">{character.description}</p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {character.traits.map((trait) => (
                    <Badge key={trait} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Character Card */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[280px]">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Add New Character</h3>
              <p className="text-gray-500 text-sm text-center">Create a new character for your story</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
