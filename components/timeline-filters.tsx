"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Filter, Users, Zap } from "lucide-react"

interface TimelineFiltersProps {
  allCharacters: string[]
  selectedTypes: string[]
  selectedCharacters: string[]
  onFilterChange: (types: string[], characters: string[]) => void
}

const eventTypes = [
  { name: "Major Event", color: "bg-blue-500", count: 2 },
  { name: "Conflict", color: "bg-red-500", count: 2 },
  { name: "Resolution", color: "bg-green-500", count: 1 },
  { name: "Flashback", color: "bg-purple-500", count: 1 },
]

export function TimelineFilters({
  allCharacters,
  selectedTypes,
  selectedCharacters,
  onFilterChange,
}: TimelineFiltersProps) {
  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked ? [...selectedTypes, type] : selectedTypes.filter((t) => t !== type)
    onFilterChange(newTypes, selectedCharacters)
  }

  const handleCharacterChange = (character: string, checked: boolean) => {
    const newCharacters = checked
      ? [...selectedCharacters, character]
      : selectedCharacters.filter((c) => c !== character)
    onFilterChange(selectedTypes, newCharacters)
  }

  const clearAllFilters = () => {
    onFilterChange([], [])
  }

  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            Filters
          </h2>
          {(selectedTypes.length > 0 || selectedCharacters.length > 0) && (
            <button onClick={clearAllFilters} className="text-sm text-blue-400 hover:text-blue-300 underline">
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters */}
        {(selectedTypes.length > 0 || selectedCharacters.length > 0) && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-slate-400">Active Filters:</p>
            <div className="flex flex-wrap gap-1">
              {selectedTypes.map((type) => (
                <Badge key={type} variant="secondary" className="bg-slate-700 text-slate-200">
                  {type}
                </Badge>
              ))}
              {selectedCharacters.map((character) => (
                <Badge key={character} variant="secondary" className="bg-slate-700 text-slate-200">
                  {character}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Event Types */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Event Types
            </h3>
            <div className="space-y-3">
              {eventTypes.map((type) => (
                <div key={type.name} className="flex items-center space-x-3">
                  <Checkbox
                    id={type.name}
                    checked={selectedTypes.includes(type.name)}
                    onCheckedChange={(checked) => handleTypeChange(type.name, checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <label htmlFor={type.name} className="text-sm text-slate-200 cursor-pointer flex-1">
                      {type.name}
                    </label>
                    <span className="text-xs text-slate-400">({type.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Characters */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Characters
            </h3>
            <div className="space-y-3">
              {allCharacters.map((character) => (
                <div key={character} className="flex items-center space-x-3">
                  <Checkbox
                    id={character}
                    checked={selectedCharacters.includes(character)}
                    onCheckedChange={(checked) => handleCharacterChange(character, checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor={character} className="text-sm text-slate-200 cursor-pointer flex-1">
                    {character}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
