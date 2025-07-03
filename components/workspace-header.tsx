// components/workspace-header.tsx (Updated to use context)
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Save, Check, Dot } from "lucide-react"
import { useWorkspace } from "@/app/workspace/workspace-context"

export function WorkspaceHeader() {
  const { projectData, saveStatus } = useWorkspace()

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saved":
        return <Check className="h-4 w-4 text-emerald-500" />
      case "saving":
        return <Save className="h-4 w-4 text-blue-500 animate-pulse" />
      case "unsaved":
        return <Dot className="h-5 w-5 text-amber-500 animate-pulse" />
    }
  }

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saved":
        return "All changes saved"
      case "saving":
        return "Saving changes..."
      case "unsaved":
        return "Unsaved changes"
    }
  }

  const getSaveStatusBg = () => {
    switch (saveStatus) {
      case "saved":
        return "bg-emerald-50 border-emerald-200 text-emerald-700"
      case "saving":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "unsaved":
        return "bg-amber-50 border-amber-200 text-amber-700"
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900 leading-tight">
            {projectData.title}
          </h1>
          <span className="text-xs text-gray-500 hidden sm:block">
            {projectData.genre} • {projectData.wordCount.toLocaleString()} words
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Save Status Indicator */}
        <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium
          transition-all duration-200 ${getSaveStatusBg()}
        `}>
          {getSaveStatusIcon()}
          <span className="hidden sm:inline">
            {getSaveStatusText()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            <Save className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save Now</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
