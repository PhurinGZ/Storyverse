"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Users } from "lucide-react"

interface Character {
  id: string
  name: string
  role: string
  portrait: string
  age: string
  gender: string
  race: string
  personalityTraits: string[]
  backstory: string
}

interface CharacterSidebarProps {
  characters: Character[]
  selectedCharacter: Character | null
  onCharacterSelect: (character: Character) => void
  onAddCharacter: () => void
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Protagonist":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    case "Antagonist":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "Supporting":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }
}

export function CharacterSidebar({
  characters,
  selectedCharacter,
  onCharacterSelect,
  onAddCharacter,
}: CharacterSidebarProps) {
  return (
    <Card className="h-full bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-400" />
          Characters
        </CardTitle>
        <Button
          onClick={onAddCharacter}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Character
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-4 space-y-3">
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => onCharacterSelect(character)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                  selectedCharacter?.id === character.id
                    ? "bg-white/20 border-purple-400/50 shadow-lg shadow-purple-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={character.portrait || "/placeholder.svg"} alt={character.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                      {character.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{character.name}</h3>
                    <p className="text-sm text-white/60 truncate">
                      {character.race} • {character.age ? `${character.age} years` : "Age unknown"}
                    </p>
                  </div>
                </div>

                <Badge className={`text-xs ${getRoleColor(character.role)}`}>{character.role}</Badge>

                {character.personalityTraits.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {character.personalityTraits.slice(0, 2).map((trait) => (
                      <span key={trait} className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded-full">
                        {trait}
                      </span>
                    ))}
                    {character.personalityTraits.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded-full">
                        +{character.personalityTraits.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
