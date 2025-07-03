"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, Sparkles, Trash2, Upload, X } from "lucide-react"

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

interface CharacterEditorProps {
  character: Character
  onUpdate: (character: Character) => void
  onDelete: () => void
}

const availableTraits = [
  "Wise",
  "Brave",
  "Cunning",
  "Compassionate",
  "Mysterious",
  "Loyal",
  "Ambitious",
  "Cheerful",
  "Ruthless",
  "Determined",
  "Charismatic",
  "Curious",
  "Protective",
  "Rebellious",
  "Patient",
  "Impulsive",
  "Scholarly",
  "Artistic",
  "Diplomatic",
  "Fierce",
  "Gentle",
  "Proud",
  "Humble",
  "Witty",
  "Serious",
  "Optimistic",
  "Pessimistic",
  "Adventurous",
  "Cautious",
  "Noble",
]

export function CharacterEditor({ character, onUpdate, onDelete }: CharacterEditorProps) {
  const [editedCharacter, setEditedCharacter] = useState(character)
  const [newTrait, setNewTrait] = useState("")

  const handleInputChange = (field: keyof Character, value: string) => {
    setEditedCharacter((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddTrait = (trait: string) => {
    if (!editedCharacter.personalityTraits.includes(trait)) {
      setEditedCharacter((prev) => ({
        ...prev,
        personalityTraits: [...prev.personalityTraits, trait],
      }))
    }
    setNewTrait("")
  }

  const handleRemoveTrait = (trait: string) => {
    setEditedCharacter((prev) => ({
      ...prev,
      personalityTraits: prev.personalityTraits.filter((t) => t !== trait),
    }))
  }

  const handleSave = () => {
    onUpdate(editedCharacter)
  }

  const handleGeneratePortrait = () => {
    // Simulate AI portrait generation
    console.log("Generating AI portrait for", editedCharacter.name)
  }

  return (
    <Card className="h-full bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          Character Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-6 space-y-6">
            {/* Portrait Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src={editedCharacter.portrait || "/placeholder.svg"} alt={editedCharacter.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl">
                    {editedCharacter.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  onClick={handleGeneratePortrait}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Character Name
                </Label>
                <Input
                  id="name"
                  value={editedCharacter.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter character name..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white/80">
                  Role in Story
                </Label>
                <Select value={editedCharacter.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="Protagonist">Protagonist</SelectItem>
                    <SelectItem value="Antagonist">Antagonist</SelectItem>
                    <SelectItem value="Supporting">Supporting Character</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-white/80">
                  Age
                </Label>
                <Input
                  id="age"
                  value={editedCharacter.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Character age..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white/80">
                  Gender
                </Label>
                <Input
                  id="gender"
                  value={editedCharacter.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Character gender..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="race" className="text-white/80">
                  Race/Species
                </Label>
                <Input
                  id="race"
                  value={editedCharacter.race}
                  onChange={(e) => handleInputChange("race", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Human, Elf, Dragon, etc..."
                />
              </div>
            </div>

            {/* Personality Traits */}
            <div className="space-y-4">
              <Label className="text-white/80">Personality Traits</Label>

              {/* Current Traits */}
              <div className="flex flex-wrap gap-2">
                {editedCharacter.personalityTraits.map((trait) => (
                  <Badge
                    key={trait}
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 cursor-pointer"
                    onClick={() => handleRemoveTrait(trait)}
                  >
                    {trait}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>

              {/* Add New Traits */}
              <div className="space-y-2">
                <Select value={newTrait} onValueChange={handleAddTrait}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Add personality trait..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20 max-h-48">
                    {availableTraits
                      .filter((trait) => !editedCharacter.personalityTraits.includes(trait))
                      .map((trait) => (
                        <SelectItem key={trait} value={trait}>
                          {trait}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Backstory */}
            <div className="space-y-2">
              <Label htmlFor="backstory" className="text-white/80">
                Backstory
              </Label>
              <Textarea
                id="backstory"
                value={editedCharacter.backstory}
                onChange={(e) => handleInputChange("backstory", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] resize-none"
                placeholder="Tell the character's story, their origins, motivations, and secrets..."
              />
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <Button
              onClick={onDelete}
              variant="outline"
              className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Character
            </Button>

            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Character
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
