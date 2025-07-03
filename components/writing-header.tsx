"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, PenTool, Bot, Save } from "lucide-react"
import Link from "next/link"

interface WritingHeaderProps {
  projectName: string
  writingMode: "solo" | "ai"
  onModeChange: (mode: "solo" | "ai") => void
  autoContinue: boolean
  onAutoContinueChange: (enabled: boolean) => void
}

export function WritingHeader({
  projectName,
  writingMode,
  onModeChange,
  autoContinue,
  onAutoContinueChange,
}: WritingHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="text-stone-600 hover:text-stone-900">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="h-6 w-px bg-stone-300" />
        <h1 className="text-lg font-semibold text-stone-900">{projectName}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Writing Mode Toggle */}
        <div className="flex items-center gap-3">
          <Label htmlFor="writing-mode" className="text-sm font-medium text-stone-700">
            Writing Mode:
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant={writingMode === "solo" ? "default" : "outline"}
              size="sm"
              onClick={() => onModeChange("solo")}
              className={`gap-2 ${
                writingMode === "solo"
                  ? "bg-stone-800 hover:bg-stone-900"
                  : "border-stone-300 text-stone-600 hover:bg-stone-100"
              }`}
            >
              <PenTool className="h-4 w-4" />
              Solo
            </Button>
            <Button
              variant={writingMode === "ai" ? "default" : "outline"}
              size="sm"
              onClick={() => onModeChange("ai")}
              className={`gap-2 ${
                writingMode === "ai"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-stone-300 text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Bot className="h-4 w-4" />
              With AI
            </Button>
          </div>
        </div>

        {/* Auto-continue Toggle */}
        {writingMode === "ai" && (
          <>
            <div className="h-6 w-px bg-stone-300" />
            <div className="flex items-center gap-2">
              <Switch
                id="auto-continue"
                checked={autoContinue}
                onCheckedChange={onAutoContinueChange}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="auto-continue" className="text-sm text-stone-700 cursor-pointer">
                Auto-continue writing
              </Label>
            </div>
          </>
        )}

        <div className="h-6 w-px bg-stone-300" />

        <Button variant="outline" size="sm" className="gap-2 bg-transparent border-stone-300 text-stone-600">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </header>
  )
}
