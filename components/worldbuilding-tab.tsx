"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MapPin, Sparkles, Users } from "lucide-react"

const mockLocations = [
  {
    id: "1",
    name: "Thalara Academy",
    type: "Institution",
    description: "The premier magical academy built on floating crystal spires",
  },
  {
    id: "2",
    name: "The Convergence Point",
    type: "Mystical Location",
    description: "Where all ley lines intersect, creating a nexus of magical energy",
  },
  {
    id: "3",
    name: "Shadowbane Fortress",
    type: "Stronghold",
    description: "Kael's dark citadel hidden in the void between dimensions",
  },
]

const mockMagicSystems = [
  {
    id: "1",
    name: "Ley Line Manipulation",
    type: "Elemental Magic",
    description: "Drawing power from crystalline energy conduits that span the realm",
  },
  {
    id: "2",
    name: "Void Sorcery",
    type: "Dark Magic",
    description: "Forbidden magic that draws power from the spaces between worlds",
  },
]

const mockFactions = [
  {
    id: "1",
    name: "The Mage Council",
    type: "Governing Body",
    description: "Ancient order that maintains magical law and protects the realm",
  },
  {
    id: "2",
    name: "Shadowbane Cult",
    type: "Antagonist Faction",
    description: "Dark sorcerers seeking to control the Convergence for their own ends",
  },
]

export function WorldbuildingTab() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Worldbuilding</h1>
          <p className="text-gray-600">Build and organize the world of your story</p>
        </div>

        <Tabs defaultValue="locations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="magic" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Magic Systems
            </TabsTrigger>
            <TabsTrigger value="factions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Factions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="locations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Locations ({mockLocations.length})</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Location
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLocations.map((location) => (
                <Card key={location.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <div className="text-sm text-gray-600">{location.type}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{location.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="magic" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Magic Systems ({mockMagicSystems.length})</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Magic System
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMagicSystems.map((system) => (
                <Card key={system.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{system.name}</CardTitle>
                    <div className="text-sm text-gray-600">{system.type}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{system.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="factions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Factions ({mockFactions.length})</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Faction
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFactions.map((faction) => (
                <Card key={faction.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{faction.name}</CardTitle>
                    <div className="text-sm text-gray-600">{faction.type}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faction.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
