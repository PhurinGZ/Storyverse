"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bot, ChevronDown } from "lucide-react"
import type { AIMode } from "@/components/writing-interface"

interface AIModeToggleProps {
  mode: AIMode
  onModeChange: (mode: AIMode) => void
}

const modeConfig = {
  suggestive: {
    label: "Suggestive",
    description: "AI provides creative suggestions and ideas",
    color: "bg-green-100 text-green-800",
  },
  autocomplete: {
    label: "Autocomplete",
    description: "AI helps complete sentences and paragraphs",
    color: "bg-blue-100 text-blue-800",
  },
  passive: {
    label: "Passive",
    description: "AI waits for your direct requests",
    color: "bg-gray-100 text-gray-800",
  },
}

export function AIModeToggle({ mode, onModeChange }: AIModeToggleProps) {
  const currentMode = modeConfig[mode]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white hover:bg-stone-50">
          <Bot className="h-4 w-4" />
          <span className="text-sm font-medium">AI Mode:</span>
          <Badge className={currentMode.color}>{currentMode.label}</Badge>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {Object.entries(modeConfig).map(([modeKey, config]) => (
          <DropdownMenuItem
            key={modeKey}
            onClick={() => onModeChange(modeKey as AIMode)}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <Badge className={config.color}>{config.label}</Badge>
              {mode === modeKey && <span className="text-xs text-green-600">✓ Active</span>}
            </div>
            <p className="text-xs text-gray-600">{config.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
