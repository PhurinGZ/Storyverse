"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"

interface ProjectSettingsHeaderProps {
  projectTitle: string
  hasChanges: boolean
}

export function ProjectSettingsHeader({ projectTitle, hasChanges }: ProjectSettingsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/editor">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Link>
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900">Project Settings</h1>
            </div>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              Unsaved changes
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-2">Configure settings for "{projectTitle}"</p>
      </div>
    </div>
  )
}
