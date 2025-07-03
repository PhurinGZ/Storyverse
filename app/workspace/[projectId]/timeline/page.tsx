"use client"

import { useState } from "react"
import { TimelineHeader } from "@/components/timeline-header"
import { TimelineFilters } from "@/components/timeline-filters"
import { StoryTimeline } from "@/components/story-timeline"
import { AddEventButton } from "@/components/add-event-button"

// Mock timeline data
const mockEvents = [
  {
    id: "1",
    title: "The Mysterious Letter Arrives",
    type: "Major Event",
    storyTime: "Day 1, Morning",
    summary: "Sarah receives a cryptic letter from her deceased grandmother, setting the adventure in motion.",
    characters: ["Sarah", "Grandmother (mentioned)"],
    chapter: "Chapter 1",
    position: 1,
  },
  {
    id: "2",
    title: "First Encounter with the Shadow",
    type: "Conflict",
    storyTime: "Day 1, Evening",
    summary: "Sarah faces her first supernatural encounter in the old lighthouse.",
    characters: ["Sarah"],
    chapter: "Chapter 2",
    position: 2,
  },
  {
    id: "3",
    title: "Meeting the Lighthouse Keeper",
    type: "Major Event",
    storyTime: "Day 2, Dawn",
    summary: "Thomas reveals he's been guarding secrets for thirty years.",
    characters: ["Sarah", "Thomas"],
    chapter: "Chapter 3",
    position: 3,
  },
  {
    id: "4",
    title: "The Captain's Daughter",
    type: "Flashback",
    storyTime: "30 Years Ago",
    summary: "Thomas remembers the night he made his terrible choice between two ships.",
    characters: ["Thomas", "Captain Morrison"],
    chapter: "Chapter 4",
    position: 4,
  },
  {
    id: "5",
    title: "The Storm Returns",
    type: "Conflict",
    storyTime: "Day 3, Night",
    summary: "Another supernatural storm threatens the coast, forcing Sarah and Thomas to act.",
    characters: ["Sarah", "Thomas"],
    chapter: "Chapter 5",
    position: 5,
  },
  {
    id: "6",
    title: "The Truth Revealed",
    type: "Resolution",
    storyTime: "Day 4, Morning",
    summary: "The lighthouse keeper's secret is finally exposed, bringing closure to decades of guilt.",
    characters: ["Sarah", "Thomas", "Morrison's Daughter"],
    chapter: "Chapter 6",
    position: 6,
  },
]

const allCharacters = ["Sarah", "Thomas", "Grandmother", "Captain Morrison", "Morrison's Daughter"]

export default function TimelinePage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  const handleFilterChange = (types: string[], characters: string[]) => {
    setSelectedTypes(types)
    setSelectedCharacters(characters)

    let filtered = events

    if (types.length > 0) {
      filtered = filtered.filter((event) => types.includes(event.type))
    }

    if (characters.length > 0) {
      filtered = filtered.filter((event) => event.characters.some((char) => characters.includes(char)))
    }

    setFilteredEvents(filtered)
  }

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      title: "New Event",
      type: "Major Event",
      storyTime: "",
      summary: "Add your event description here...",
      characters: [],
      chapter: `Chapter ${events.length + 1}`,
      position: events.length + 1,
    }
    setEvents([...events, newEvent])
    setFilteredEvents([...filteredEvents, newEvent])
  }

  return (
    <div className="h-screen bg-slate-900 text-white overflow-hidden">
      <TimelineHeader projectTitle="The Lighthouse Keeper's Secret" />

      <div className="flex h-[calc(100vh-64px)]">
        <TimelineFilters
          allCharacters={allCharacters}
          selectedTypes={selectedTypes}
          selectedCharacters={selectedCharacters}
          onFilterChange={handleFilterChange}
        />

        <div className="flex-1 relative">
          <StoryTimeline events={filteredEvents} />
          <AddEventButton onClick={handleAddEvent} />
        </div>
      </div>
    </div>
  )
}
