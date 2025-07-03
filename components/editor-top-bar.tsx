"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Check } from "lucide-react"
import Link from "next/link"

interface EditorTopBarProps {
  projectTitle: string
  saveStatus: "saved" | "saving" | "unsaved"
}

export function EditorTopBar({ projectTitle, saveStatus }: EditorTopBarProps) {
  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saved":
        return <Check className="h-4 w-4 text-green-600" />
      case "saving":
        return <Save className="h-4 w-4 text-blue-600 animate-pulse" />
      case "unsaved":
        return <Save className="h-4 w-4 text-orange-600" />
    }
  }

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saved":
        return "Saved"
      case "saving":
        return "Saving..."
      case "unsaved":
        return "Unsaved changes"
    }
  }

  return (
    <header className="h-14 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <h1 className="text-lg font-semibold text-gray-900">{projectTitle}</h1>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {getSaveStatusIcon()}
        <span
          className={`font-medium ${
            saveStatus === "saved" ? "text-green-600" : saveStatus === "saving" ? "text-blue-600" : "text-orange-600"
          }`}
        >
          {getSaveStatusText()}
        </span>
      </div>
    </header>
  )
}
