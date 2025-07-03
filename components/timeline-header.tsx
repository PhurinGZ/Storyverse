"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Save } from "lucide-react"
import Link from "next/link"

interface TimelineHeaderProps {
  projectTitle: string
}

export function TimelineHeader({ projectTitle }: TimelineHeaderProps) {
  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white hover:bg-slate-700">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="h-6 w-px bg-slate-600" />
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          <h1 className="text-xl font-semibold">{projectTitle}</h1>
          <span className="text-slate-400">• Timeline View</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600">
          <Save className="h-4 w-4 mr-2" />
          Save Timeline
        </Button>
      </div>
    </header>
  )
}
