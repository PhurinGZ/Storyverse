"use client"

import { useState } from "react"
import { CharacterSidebar } from "@/components/character-sidebar"
import { CharacterEditor } from "@/components/character-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock character data
const mockCharacters = [
  {
    id: "1",
    name: "Elara Moonwhisper",
    role: "Protagonist",
    portrait: "/placeholder.svg?height=40&width=40",
    age: "127",
    gender: "Female",
    race: "Elf",
    personalityTraits: ["Wise", "Compassionate", "Determined", "Mysterious"],
    backstory:
      "Born under the light of a blood moon, Elara was destined to become the bridge between the mortal and magical realms...",
  },
  {
    id: "2",
    name: "Thorne Blackheart",
    role: "Antagonist",
    portrait: "/placeholder.svg?height=40&width=40",
    age: "45",
    gender: "Male",
    race: "Human",
    personalityTraits: ["Cunning", "Ruthless", "Charismatic", "Ambitious"],
    backstory:
      "Once a noble knight, Thorne's fall from grace began when he discovered the corruption within the royal court...",
  },
  {
    id: "3",
    name: "Pip Goldenbottom",
    role: "Supporting",
    portrait: "/placeholder.svg?height=40&width=40",
    age: "34",
    gender: "Male",
    race: "Halfling",
    personalityTraits: ["Cheerful", "Loyal", "Brave", "Curious"],
    backstory:
      "A tavern keeper turned unlikely hero, Pip's knowledge of local gossip often proves more valuable than any sword...",
  },
]

export default function CharacterBuilderPage() {
  const [characters, setCharacters] = useState(mockCharacters)
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])

  const handleCharacterSelect = (character: (typeof characters)[0]) => {
    setSelectedCharacter(character)
  }

  const handleCharacterUpdate = (updatedCharacter: (typeof characters)[0]) => {
    setCharacters((prev) => prev.map((char) => (char.id === updatedCharacter.id ? updatedCharacter : char)))
    setSelectedCharacter(updatedCharacter)
  }

  const handleAddCharacter = () => {
    const newCharacter = {
      id: Date.now().toString(),
      name: "New Character",
      role: "Other",
      portrait: "/placeholder.svg?height=40&width=40",
      age: "",
      gender: "",
      race: "",
      personalityTraits: [],
      backstory: "",
    }
    setCharacters((prev) => [...prev, newCharacter])
    setSelectedCharacter(newCharacter)
  }

  const handleDeleteCharacter = (characterId: string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== characterId))
    if (selectedCharacter?.id === characterId) {
      setSelectedCharacter(characters[0] || null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Starry overlay pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">✨</span>
              Character Forge
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          <CharacterSidebar
            characters={characters}
            selectedCharacter={selectedCharacter}
            onCharacterSelect={handleCharacterSelect}
            onAddCharacter={handleAddCharacter}
          />

          <div className="lg:col-span-3">
            {selectedCharacter ? (
              <CharacterEditor
                character={selectedCharacter}
                onUpdate={handleCharacterUpdate}
                onDelete={() => handleDeleteCharacter(selectedCharacter.id)}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-white/60">
                  <span className="text-6xl mb-4 block">🎭</span>
                  <p className="text-xl">Select a character to begin crafting their story</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
