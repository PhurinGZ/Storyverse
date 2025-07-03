"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

const mockEvents = [
  {
    id: "1",
    title: "The Academy Awakening",
    type: "Major Event",
    icon: "⭐",
    summary: "Lyra discovers her unique connection to the ley lines during a routine magic lesson.",
    chapter: "Chapter 1",
  },
  {
    id: "2",
    title: "Council Summons",
    type: "Plot Point",
    icon: "📜",
    summary: "Master Aldric reveals the approaching Convergence and Lyra's crucial role.",
    chapter: "Chapter 2",
  },
  {
    id: "3",
    title: "First Confrontation",
    type: "Conflict",
    icon: "⚔️",
    summary: "Kael Shadowbane makes his first move against the Academy.",
    chapter: "Chapter 4",
  },
  {
    id: "4",
    title: "The Ancient Prophecy",
    type: "Revelation",
    icon: "📖",
    summary: "Discovery of the prophecy that foretells the Convergence outcome.",
    chapter: "Chapter 6",
  },
  {
    id: "5",
    title: "Zara's Sacrifice",
    type: "Emotional Beat",
    icon: "💔",
    summary: "Lyra's best friend makes a difficult choice to protect the Academy.",
    chapter: "Chapter 8",
  },
]

export function TimelineTab() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Major Event":
        return "bg-blue-100 text-blue-800"
      case "Conflict":
        return "bg-red-100 text-red-800"
      case "Revelation":
        return "bg-purple-100 text-purple-800"
      case "Emotional Beat":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Story Timeline</h1>
            <p className="text-gray-600">Track major events and plot points in your story</p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

          {/* Events */}
          <div className="space-y-8">
            {mockEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start gap-6">
                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-2xl">
                    {event.icon}
                  </div>
                </div>

                {/* Event Card */}
                <Card className="flex-1 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          <Badge variant="outline">{event.chapter}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.summary}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <Button className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
