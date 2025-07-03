"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Clock, Users } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  type: string
  storyTime: string
  summary: string
  characters: string[]
  chapter: string
  position: number
}

interface StoryTimelineProps {
  events: TimelineEvent[]
}

const getEventIcon = (type: string) => {
  switch (type) {
    case "Major Event":
      return "⭐"
    case "Conflict":
      return "⚔️"
    case "Resolution":
      return "✅"
    case "Flashback":
      return "⏪"
    default:
      return "📝"
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case "Major Event":
      return "border-blue-500 bg-blue-500/10"
    case "Conflict":
      return "border-red-500 bg-red-500/10"
    case "Resolution":
      return "border-green-500 bg-green-500/10"
    case "Flashback":
      return "border-purple-500 bg-purple-500/10"
    default:
      return "border-slate-500 bg-slate-500/10"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Major Event":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "Conflict":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "Resolution":
      return "bg-green-500/20 text-green-300 border-green-500/30"
    case "Flashback":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/30"
  }
}

export function StoryTimeline({ events }: StoryTimelineProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Timeline Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Story Timeline</h2>
          <div className="text-sm text-slate-400">{events.length} events</div>
        </div>
      </div>

      {/* Timeline Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-600" />

            {/* Events */}
            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-6">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full border-2 ${getEventColor(
                        event.type,
                      )} flex items-center justify-center text-2xl bg-slate-800`}
                    >
                      {getEventIcon(event.type)}
                    </div>
                    {/* Chapter Label */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <Badge variant="outline" className="bg-slate-800 border-slate-600 text-slate-300 text-xs">
                        {event.chapter}
                      </Badge>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`p-6 rounded-lg border-2 ${getEventColor(
                        event.type,
                      )} bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                            {event.storyTime && (
                              <div className="flex items-center gap-1 text-sm text-slate-400">
                                <Clock className="h-4 w-4" />
                                {event.storyTime}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">{event.summary}</p>

                      {event.characters.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400" />
                          <div className="flex flex-wrap gap-1">
                            {event.characters.map((character) => (
                              <Badge
                                key={character}
                                variant="secondary"
                                className="bg-slate-700 text-slate-200 text-xs"
                              >
                                {character}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
