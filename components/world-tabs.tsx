"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Users, Clock, Sparkles, Edit, Eye } from "lucide-react"

interface WorldTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  locations: any[]
  factions: any[]
  history: any[]
  magicSystem: any[]
}

export function WorldTabs({ activeTab, onTabChange, locations, factions, history, magicSystem }: WorldTabsProps) {
  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case "Neutral Good":
        return "bg-green-100 text-green-800"
      case "Chaotic Evil":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "World-changing":
        return "bg-purple-100 text-purple-800"
      case "Major":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>World Encyclopedia</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="factions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Factions
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="magic" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Magic System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="locations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Locations ({locations.length})</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Location
              </Button>
            </div>
            <div className="grid gap-4">
              {locations.map((location) => (
                <Card key={location.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{location.name}</h4>
                        <Badge variant="secondary" className="mt-1">
                          {location.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{location.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Population: {location.population}</span>
                      <span>Ruler: {location.ruler}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="factions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Factions ({factions.length})</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Faction
              </Button>
            </div>
            <div className="grid gap-4">
              {factions.map((faction) => (
                <Card key={faction.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{faction.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">{faction.type}</Badge>
                          <Badge className={getAlignmentColor(faction.alignment)}>{faction.alignment}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{faction.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Leader: {faction.leader}</span>
                      <span>Members: {faction.members}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Historical Events ({history.length})</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Event
              </Button>
            </div>
            <div className="grid gap-4">
              {history.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{event.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">{event.era}</Badge>
                          <Badge className={getSignificanceColor(event.significance)}>{event.significance}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="text-sm text-gray-500">
                      <span>Date: {event.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="magic" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Magic Systems ({magicSystem.length})</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Magic System
              </Button>
            </div>
            <div className="grid gap-4">
              {magicSystem.map((magic) => (
                <Card key={magic.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{magic.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">{magic.type}</Badge>
                          <Badge className={getDifficultyColor(magic.difficulty)}>{magic.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{magic.description}</p>
                    <div className="text-sm text-gray-500">
                      <span>Practitioners: {magic.practitioners}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
