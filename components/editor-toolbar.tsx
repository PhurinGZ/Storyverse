"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Download, FileText } from "lucide-react"

interface EditorToolbarProps {
  wordCount: number
  autoSave: boolean
  onAutoSaveToggle: (enabled: boolean) => void
}

export function EditorToolbar({ wordCount, autoSave, onAutoSaveToggle }: EditorToolbarProps) {
  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting document...")
  }

  return (
    <div className="h-12 border-t border-gray-200 bg-gray-50 px-6 flex items-center justify-between text-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{wordCount.toLocaleString()} words</span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-2">
          <Switch id="autosave" checked={autoSave} onCheckedChange={onAutoSaveToggle} />
          <Label htmlFor="autosave" className="text-gray-600 cursor-pointer">
            Auto-save
          </Label>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="text-gray-600 hover:text-gray-900 bg-transparent"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  )
}
