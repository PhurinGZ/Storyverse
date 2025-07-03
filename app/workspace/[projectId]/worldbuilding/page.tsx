"use client"

import { useState } from "react"
import { WorldbuildingHeader } from "@/components/worldbuilding-header"
import { WorldMap } from "@/components/world-map"
import { WorldTabs } from "@/components/world-tabs"
import { WorldSidebar } from "@/components/world-sidebar"

// Mock world data
const worldData = {
  name: "The Realm of Aethermoor",
  description:
    "A mystical realm where magic flows through crystalline ley lines and ancient civilizations rise from floating islands.",
  mapImage: "/placeholder.svg?height=400&width=600",
  locations: [
    {
      id: "1",
      name: "Crystal Spire City",
      type: "Capital",
      description:
        "The floating capital city built around a massive crystal that channels magical energy throughout the realm.",
      population: "250,000",
      ruler: "High Mage Celestine",
    },
    {
      id: "2",
      name: "Shadowmere Forest",
      type: "Wilderness",
      description: "An ancient forest where the trees whisper secrets and shadows move independently of their casters.",
      population: "Unknown",
      ruler: "The Forest Spirits",
    },
    {
      id: "3",
      name: "Ironhold Fortress",
      type: "Military Outpost",
      description:
        "A massive fortress carved into a mountain, serving as the last line of defense against the northern barbarian tribes.",
      population: "15,000",
      ruler: "General Marcus Ironbeard",
    },
  ],
  factions: [
    {
      id: "1",
      name: "The Crystal Order",
      type: "Magical Guild",
      description:
        "An ancient order of mages dedicated to maintaining the balance of magical energy throughout the realm.",
      leader: "Archmage Lyralei",
      members: "500+",
      alignment: "Neutral Good",
    },
    {
      id: "2",
      name: "Shadowbane Cult",
      type: "Religious Sect",
      description:
        "A secretive cult that believes darkness will consume all light, working to accelerate this prophecy.",
      leader: "The Void Speaker",
      members: "Unknown",
      alignment: "Chaotic Evil",
    },
  ],
  history: [
    {
      id: "1",
      name: "The Great Sundering",
      era: "Age of Chaos",
      description:
        "The cataclysmic event that shattered the original continent into floating islands, creating the current realm.",
      date: "2,847 years ago",
      significance: "World-changing",
    },
    {
      id: "2",
      name: "The Crystal Wars",
      era: "Second Age",
      description: "A century-long conflict over control of the great crystals that power the floating cities.",
      date: "1,200-1,100 years ago",
      significance: "Major",
    },
  ],
  magicSystem: [
    {
      id: "1",
      name: "Crystal Channeling",
      type: "Elemental Magic",
      description: "Magic drawn from crystalline formations that amplify and focus natural magical energy.",
      practitioners: "Crystal Mages",
      difficulty: "Moderate",
    },
    {
      id: "2",
      name: "Shadow Weaving",
      type: "Dark Magic",
      description: "The manipulation of shadows and darkness, often requiring personal sacrifice or corruption.",
      practitioners: "Shadow Weavers",
      difficulty: "High",
    },
  ],
}

const linkedContent = {
  characters: [
    { id: "1", name: "Elara Moonwhisper", role: "Protagonist", location: "Crystal Spire City" },
    { id: "2", name: "Thorne Blackheart", role: "Antagonist", location: "Shadowmere Forest" },
    { id: "3", name: "General Marcus", role: "Supporting", location: "Ironhold Fortress" },
  ],
  scenes: [
    { id: "1", title: "The Crystal Awakening", location: "Crystal Spire City", chapter: "Chapter 3" },
    { id: "2", title: "Forest of Whispers", location: "Shadowmere Forest", chapter: "Chapter 7" },
    { id: "3", title: "Siege of Ironhold", location: "Ironhold Fortress", chapter: "Chapter 12" },
  ],
}

export default function WorldbuildingPage() {
  const [activeTab, setActiveTab] = useState("locations")

  return (
    <div className="min-h-screen bg-gray-50">
      <WorldbuildingHeader worldName={worldData.name} description={worldData.description} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <WorldMap mapImage={worldData.mapImage} />
            <WorldTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              locations={worldData.locations}
              factions={worldData.factions}
              history={worldData.history}
              magicSystem={worldData.magicSystem}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <WorldSidebar characters={linkedContent.characters} scenes={linkedContent.scenes} />
          </div>
        </div>
      </div>
    </div>
  )
}
